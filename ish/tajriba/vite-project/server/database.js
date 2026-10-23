import { DatabaseSync } from 'node:sqlite'
import { mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Pool } from 'pg'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const databaseUrl = process.env.DATABASE_URL
const isPostgres = Boolean(databaseUrl)
let sqlite
let pool

function postgresSql(sql) {
  return sql
    .replace(/username\s*=\s*\?/gi, 'LOWER(username) = LOWER(?)')
    .replace(/\s+COLLATE NOCASE/gi, '')
    .replace(/\bAS\s+([A-Za-z][A-Za-z0-9_]*)\b/g, (match, alias) =>
      /[A-Z]/.test(alias) ? `AS "${alias}"` : match,
    )
    .replace(/\?/g, (match, offset, source) => {
      const prefix = source.slice(0, offset)
      return `$${(prefix.match(/\?/g) || []).length + 1}`
    })
}

function sqliteSql(sql) {
  return sql
}

function pgError(error) {
  if (error.code === '23505') error.code = 'SQLITE_CONSTRAINT_UNIQUE'
  return error
}

export async function initializeDatabase() {
  if (isPostgres) {
    pool = new Pool({
      connectionString: databaseUrl,
      max: Number(process.env.DATABASE_POOL_MAX || 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      maxLifetimeSeconds: 1_800,
      application_name: 'future-step-center',
    })
    pool.on('error', (error) => {
      console.error('Bo‘sh PostgreSQL ulanishida xatolik:', error)
    })
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
        password_hash TEXT NOT NULL,
        phone TEXT NOT NULL DEFAULT '',
        group_name TEXT NOT NULL DEFAULT '',
        schedule TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP::text
      );
      CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_unique ON users (LOWER(username));
      CREATE INDEX IF NOT EXISTS users_role_name ON users (role, name);
      CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at BIGINT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);
      CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id);
      CREATE TABLE IF NOT EXISTS attendance (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        day TEXT NOT NULL,
        check_in TEXT,
        check_out TEXT,
        marked_by TEXT REFERENCES users(id) ON DELETE SET NULL,
        UNIQUE (user_id, day)
      );
      CREATE INDEX IF NOT EXISTS attendance_day ON attendance(day);
      CREATE TABLE IF NOT EXISTS center_settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        center_name TEXT NOT NULL DEFAULT 'FUTURE STEP',
        slogan TEXT NOT NULL DEFAULT 'Bilim bilan kelajak sari.',
        description TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL DEFAULT '',
        address TEXT NOT NULL DEFAULT '',
        telegram TEXT NOT NULL DEFAULT '',
        instagram TEXT NOT NULL DEFAULT '',
        courses TEXT NOT NULL DEFAULT ''
      );
      INSERT INTO center_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
      CREATE TABLE IF NOT EXISTS login_attempts (
        client_key TEXT PRIMARY KEY,
        attempt_count INTEGER NOT NULL,
        reset_at BIGINT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS login_attempts_expiry ON login_attempts(reset_at);
    `)
    return
  }

  const dataDir = resolve(process.env.FUTURE_STEP_DATA_DIR || join(projectRoot, 'server', 'data'))
  mkdirSync(dataDir, { recursive: true })
  sqlite = new DatabaseSync(join(dataDir, 'future-step.sqlite'))
  sqlite.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    PRAGMA synchronous = NORMAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE COLLATE NOCASE,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
      password_hash TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      group_name TEXT NOT NULL DEFAULT '',
      schedule TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expires_at);
    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      day TEXT NOT NULL,
      check_in TEXT,
      check_out TEXT,
      marked_by TEXT REFERENCES users(id) ON DELETE SET NULL,
      UNIQUE (user_id, day)
    );
    CREATE INDEX IF NOT EXISTS attendance_day ON attendance(day);
    CREATE TABLE IF NOT EXISTS center_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      center_name TEXT NOT NULL DEFAULT 'FUTURE STEP',
      slogan TEXT NOT NULL DEFAULT 'Bilim bilan kelajak sari.',
      description TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      address TEXT NOT NULL DEFAULT '',
      telegram TEXT NOT NULL DEFAULT '',
      instagram TEXT NOT NULL DEFAULT '',
      courses TEXT NOT NULL DEFAULT ''
    );
    INSERT OR IGNORE INTO center_settings (id) VALUES (1);
    CREATE TABLE IF NOT EXISTS login_attempts (
      client_key TEXT PRIMARY KEY,
      attempt_count INTEGER NOT NULL,
      reset_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS login_attempts_expiry ON login_attempts(reset_at);
  `)
}

export async function one(sql, ...params) {
  if (isPostgres) {
    try {
      const result = await pool.query(postgresSql(sql), params)
      return result.rows[0]
    } catch (error) {
      throw pgError(error)
    }
  }
  return sqlite.prepare(sqliteSql(sql)).get(...params)
}

export async function many(sql, ...params) {
  if (isPostgres) {
    try {
      const result = await pool.query(postgresSql(sql), params)
      return result.rows
    } catch (error) {
      throw pgError(error)
    }
  }
  return sqlite.prepare(sqliteSql(sql)).all(...params)
}

export async function run(sql, ...params) {
  if (isPostgres) {
    try {
      const pgSql = postgresSql(sql).replace(
        /^INSERT\s+OR\s+IGNORE\s+INTO\s+attendance/i,
        'INSERT INTO attendance',
      )
      const statement = /^INSERT\s+INTO\s+attendance\b/i.test(pgSql)
        ? `${pgSql} ON CONFLICT (user_id, day) DO NOTHING`
        : pgSql
      const result = await pool.query(statement, params)
      return { changes: result.rowCount, rows: result.rows }
    } catch (error) {
      throw pgError(error)
    }
  }
  return sqlite.prepare(sqliteSql(sql)).run(...params)
}

export async function transaction(callback, { lockUsers = false } = {}) {
  if (isPostgres) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      if (lockUsers) await client.query('LOCK TABLE users IN EXCLUSIVE MODE')
      const result = await callback({
        one: async (sql, ...params) => {
          try {
            return (await client.query(postgresSql(sql), params)).rows[0]
          } catch (error) {
            throw pgError(error)
          }
        },
        run: async (sql, ...params) => {
          try {
            const query = postgresSql(sql)
            const result = await client.query(query, params)
            return { changes: result.rowCount, rows: result.rows }
          } catch (error) {
            throw pgError(error)
          }
        },
      })
      await client.query('COMMIT')
      return result
    } catch (error) {
      try {
        await client.query('ROLLBACK')
      } catch (rollbackError) {
        console.error('PostgreSQL tranzaksiyasini bekor qilib bo‘lmadi:', rollbackError)
      }
      throw error
    } finally {
      client.release()
    }
  }

  sqlite.exec('BEGIN IMMEDIATE')
  try {
    const result = await callback({
      one: async (sql, ...params) => sqlite.prepare(sqliteSql(sql)).get(...params),
      run: async (sql, ...params) => sqlite.prepare(sqliteSql(sql)).run(...params),
    })
    sqlite.exec('COMMIT')
    return result
  } catch (error) {
    sqlite.exec('ROLLBACK')
    throw error
  }
}

export async function closeDatabase() {
  if (pool) await pool.end()
  if (sqlite) sqlite.close()
}

export function databaseKind() {
  return isPostgres ? 'postgres' : 'sqlite'
}
