import { DatabaseSync } from 'node:sqlite'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import {
  closeDatabase,
  databaseKind,
  initializeDatabase,
  transaction,
} from './database.js'

if (databaseKind() !== 'postgres') {
  throw new Error('Ma’lumotlarni ko‘chirish uchun DATABASE_URL PostgreSQL manzili bo‘lishi kerak.')
}

const dataDir = resolve(process.env.FUTURE_STEP_DATA_DIR || join(import.meta.dirname, 'data'))
const sqlitePath = join(dataDir, 'future-step.sqlite')
if (!existsSync(sqlitePath)) {
  throw new Error(`SQLite manba bazasi topilmadi: ${sqlitePath}`)
}

const source = new DatabaseSync(sqlitePath, { readOnly: true })

try {
  await initializeDatabase()
  const users = source.prepare(`
    SELECT id, username, name, role, password_hash, phone, group_name, schedule, created_at
    FROM users
  `).all()
  const attendance = source.prepare(`
    SELECT id, user_id, day, check_in, check_out, marked_by
    FROM attendance
  `).all()
  const settings = source.prepare(`
    SELECT center_name, slogan, description, phone, address, telegram, instagram, courses
    FROM center_settings WHERE id = 1
  `).get()

  await transaction(async (connection) => {
    await connection.run('LOCK TABLE sessions, attendance, center_settings, login_attempts IN EXCLUSIVE MODE')
    const populated = await connection.one(`
      SELECT
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM sessions) AS sessions,
        (SELECT COUNT(*) FROM attendance) AS attendance,
        (SELECT COUNT(*) FROM login_attempts) AS login_attempts
    `)
    if (Object.values(populated).some((count) => Number(count) !== 0)) {
      throw new Error('Maqsad PostgreSQL bazasi bo‘sh emas; mavjud ma’lumotlar o‘zgartirilmadi.')
    }

    const currentSettings = await connection.one('SELECT * FROM center_settings WHERE id = 1')
    const defaultValues = {
      center_name: 'FUTURE STEP',
      slogan: 'Bilim bilan kelajak sari.',
      description: '',
      phone: '',
      address: '',
      telegram: '',
      instagram: '',
      courses: '',
    }
    if (Object.entries(defaultValues).some(([key, value]) => currentSettings[key] !== value)) {
      throw new Error('Maqsad bazasidagi markaz sozlamalari boshlang‘ich qiymatda emas; ma’lumotlar o‘zgartirilmadi.')
    }

    for (const user of users) {
      await connection.run(`
        INSERT INTO users (id, username, name, role, password_hash, phone, group_name, schedule, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, user.id, user.username, user.name, user.role, user.password_hash, user.phone, user.group_name, user.schedule, user.created_at)
    }
    for (const row of attendance) {
      await connection.run(`
        INSERT INTO attendance (id, user_id, day, check_in, check_out, marked_by)
        VALUES (?, ?, ?, ?, ?, ?)
      `, row.id, row.user_id, row.day, row.check_in, row.check_out, row.marked_by)
    }
    if (settings) {
      await connection.run(`
        UPDATE center_settings
        SET center_name = ?, slogan = ?, description = ?, phone = ?, address = ?,
          telegram = ?, instagram = ?, courses = ?
        WHERE id = 1
      `, settings.center_name, settings.slogan, settings.description, settings.phone,
      settings.address, settings.telegram, settings.instagram, settings.courses)
    }
  }, { lockUsers: true })

  console.log(`SQLite-ээс PostgreSQL’ga ${users.length} ta hisob, ${attendance.length} ta davomat va markaz sozlamalari ko‘chirildi.`)
  console.log('Faol sessiyalar xavfsizlik sababli ko‘chirilmadi; foydalanuvchilar qayta tizimga kirishi kerak.')
} finally {
  source.close()
  await closeDatabase()
}
