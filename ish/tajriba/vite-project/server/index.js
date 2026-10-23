import { createServer } from 'node:http'
import { createServer as createHttpsServer } from 'node:https'
import { randomBytes, randomUUID, pbkdf2, timingSafeEqual, createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import {
  closeDatabase,
  databaseKind,
  initializeDatabase,
  many,
  one,
  run,
  transaction,
} from './database.js'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const port = Number(process.env.PORT || 3001)
const localDevelopment = process.env.FUTURE_STEP_LOCAL_DEVELOPMENT === 'true'
const production = !localDevelopment
if (production && !process.env.DATABASE_URL) {
  throw new Error('Production uchun DATABASE_URL PostgreSQL ulanish manzilini sozlang.')
}
const httpsKeyFile = process.env.FUTURE_STEP_HTTPS_KEY_FILE
const httpsCertFile = process.env.FUTURE_STEP_HTTPS_CERT_FILE
const proxySecret = process.env.FUTURE_STEP_TRUSTED_PROXY_SECRET || ''
const renderProxy = process.env.FUTURE_STEP_RENDER_PROXY === 'true'
const directHttps = Boolean(httpsKeyFile && httpsCertFile)
let publicSiteUrl = null
if (process.env.PUBLIC_SITE_URL) {
  publicSiteUrl = new URL(process.env.PUBLIC_SITE_URL)
  if (
    publicSiteUrl.protocol !== 'https:' ||
    publicSiteUrl.username ||
    publicSiteUrl.password ||
    publicSiteUrl.pathname !== '/' ||
    publicSiteUrl.search ||
    publicSiteUrl.hash
  ) {
    throw new Error('PUBLIC_SITE_URL HTTPS saytingizning faqat origin manzili bo‘lishi kerak.')
  }
  publicSiteUrl = publicSiteUrl.origin
}
if (Boolean(httpsKeyFile) !== Boolean(httpsCertFile)) {
  throw new Error('HTTPS uchun FUTURE_STEP_HTTPS_KEY_FILE va FUTURE_STEP_HTTPS_CERT_FILE ikkalasini ham belgilang.')
}
if (production && !directHttps && !proxySecret && !renderProxy) {
  throw new Error('Production rejimida TLS sertifikati yoki FUTURE_STEP_TRUSTED_PROXY_SECRET bilan himoyalangan HTTPS proxy talab qilinadi.')
}
const pbkdf2Async = promisify(pbkdf2)
await initializeDatabase()

const cookieName = 'future_step_session'
const sessionLifetime = 7 * 24 * 60 * 60 * 1000
const passwordIterations = 310_000
let lastLoginAttemptCleanup = 0
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function sendJson(res, status, data, headers = {}) {
  res.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    ...(production ? { 'Strict-Transport-Security': 'max-age=31536000' } : {}),
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  })
  res.end(JSON.stringify(data))
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1_000_000) {
        reject(Object.assign(new Error('So‘rov hajmi juda katta.'), { status: 413 }))
        req.destroy()
      }
    })
    req.on('end', () => {
      try {
        resolveBody(body ? JSON.parse(body) : {})
      } catch {
        reject(Object.assign(new Error('So‘rov ma’lumotlari noto‘g‘ri.'), { status: 400 }))
      }
    })
    req.on('error', reject)
  })
}

function cleanText(value, maxLength = 160) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

async function makePasswordHash(password, salt = randomBytes(16).toString('hex')) {
  const hash = (await pbkdf2Async(password, salt, passwordIterations, 32, 'sha256')).toString('hex')
  return `${salt}:${hash}`
}

async function verifyPassword(password, encoded) {
  if (typeof password !== 'string' || password.length > 128) return false
  const [salt, expectedHex] = encoded.split(':')
  if (!salt || !expectedHex) return false
  const actual = await pbkdf2Async(password, salt, passwordIterations, 32, 'sha256')
  const expected = Buffer.from(expectedHex, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

function digestToken(token) {
  return createHash('sha256').update(token).digest('hex')
}

function cookieHeader(token, maxAge) {
  const secure = production ? '; Secure' : ''
  return `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`
}

function getCookie(req, name) {
  const cookies = req.headers.cookie || ''
  for (const cookie of cookies.split(';')) {
    const [key, ...value] = cookie.trim().split('=')
    if (key === name) return value.join('=')
  }
  return ''
}

async function getCurrentUser(req) {
  const token = getCookie(req, cookieName)
  if (!token) return null
  const session = await one(`
    SELECT users.id, users.username, users.name, users.role, users.phone,
      users.group_name AS groupName, users.schedule, sessions.expires_at AS expiresAt
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ?
  `, digestToken(token))
  if (!session) return null
  if (Number(session.expiresAt) < Date.now()) {
    await run('DELETE FROM sessions WHERE token_hash = ?', digestToken(token))
    return null
  }
  const user = { ...session }
  delete user.expiresAt
  return user
}

async function startSession(userId) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = Date.now() + sessionLifetime
  await run('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)', digestToken(token), userId, expiresAt)
  await run('DELETE FROM sessions WHERE expires_at < ?', Date.now())
  return { token, expiresAt }
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    phone: user.phone,
    groupName: user.groupName,
    schedule: user.schedule,
    createdAt: user.createdAt,
  }
}

async function readCenterSettings() {
  return one(`
    SELECT center_name AS centerName, slogan, description, phone, address, telegram, instagram, courses
    FROM center_settings WHERE id = 1
  `)
}

function cleanSetting(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function todayInTashkent() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

function localTimestamp() {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).format(new Date()).replace(' ', 'T')
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9._-]{3,32}$/.test(username)
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 12 && password.length <= 128
}

function generatedPassword() {
  return `Fs-${randomBytes(9).toString('base64url')}-9`
}

function usernameBase(name) {
  const normalized = name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  const base = normalized.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '')
  return (base || 'user').slice(0, 24)
}

async function insertAccount({ id = randomUUID(), name, role, phone = '', groupName = '', schedule = '', username, passwordHash }, connection = null) {
  const execute = connection ? connection.run : run
  await execute(`
    INSERT INTO users (id, username, name, role, password_hash, phone, group_name, schedule)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, id, username, name, role, passwordHash, phone, groupName, schedule)
  return id
}

async function createAccount({ name, role, phone = '', groupName = '', schedule = '', username, password }) {
  const id = randomUUID()
  const finalUsername = username || usernameBase(name)
  const finalPassword = password || generatedPassword()
  const passwordHash = await makePasswordHash(finalPassword)
  await insertAccount({ id, username: finalUsername, name, role, phone, groupName, schedule, passwordHash })
  return { id, username: finalUsername, password: finalPassword }
}

function loginClientAddress(req) {
  if (production && !directHttps && typeof req.headers['x-forwarded-for'] === 'string') {
    const forwardedAddress = req.headers['x-forwarded-for'].split(',').at(-1).trim()
    if (forwardedAddress && forwardedAddress.length <= 64) return forwardedAddress
  }
  return req.socket.remoteAddress || 'unknown'
}

async function getAttendanceForUser(userId, days = 30) {
  return many(`
    SELECT day, check_in AS checkIn, check_out AS checkOut
    FROM attendance
    WHERE user_id = ?
    ORDER BY day DESC LIMIT ?
  `, userId, days)
}

function requireRole(user, roles) {
  return user && roles.includes(user.role)
}

const dummyPasswordHash = await makePasswordHash(randomBytes(32).toString('hex'))

async function handleApi(req, res, url) {
  const { pathname } = url
  const method = req.method || 'GET'

  if (pathname === '/api/setup/status' && method === 'GET') {
    const count = Number((await one('SELECT COUNT(*) AS count FROM users WHERE role = ?', 'admin')).count)
    return sendJson(res, 200, {
      needsSetup: count === 0,
      setupAvailable: localDevelopment || Boolean(process.env.FUTURE_STEP_SETUP_KEY),
      setupKeyRequired: production,
    })
  }

  if (pathname === '/api/public/settings' && method === 'GET') {
    return sendJson(res, 200, { settings: await readCenterSettings() })
  }

  if (pathname === '/api/setup' && method === 'POST') {
    const body = await readBody(req)
    if (production) {
      const configuredKey = process.env.FUTURE_STEP_SETUP_KEY || ''
      const providedKey = typeof body.setupKey === 'string' ? body.setupKey : ''
      const configuredBuffer = Buffer.from(configuredKey)
      const providedBuffer = Buffer.from(providedKey)
      if (!configuredKey) {
        return sendJson(res, 503, { error: 'Administrator sozlashi o‘chirilgan. Hostingda FUTURE_STEP_SETUP_KEY sozlang.' })
      }
      if (
        configuredBuffer.length !== providedBuffer.length ||
        !timingSafeEqual(configuredBuffer, providedBuffer)
      ) {
        return sendJson(res, 403, { error: 'Sozlash kaliti noto‘g‘ri.' })
      }
    }
    const name = cleanText(body.name, 100)
    const username = cleanText(body.username, 32)
    const password = body.password
    if (!name || !isValidUsername(username) || !validatePassword(password)) {
      return sendJson(res, 400, { error: 'Ism, login (3–32 belgi) va kamida 12 belgili parol kiriting.' })
    }
    const passwordHash = await makePasswordHash(password)
    try {
      const id = await transaction(async (connection) => {
        const count = Number((await connection.one('SELECT COUNT(*) AS count FROM users WHERE role = ?', 'admin')).count)
        if (count > 0) return null
        return insertAccount({ name, username, passwordHash, role: 'admin' }, connection)
      }, { lockUsers: true })
      if (!id) return sendJson(res, 409, { error: 'Administrator hisobi allaqachon yaratilgan.' })
      const session = await startSession(id)
      return sendJson(res, 201, { user: await getCurrentUser({ headers: { cookie: `${cookieName}=${session.token}` } }) }, {
        'Set-Cookie': cookieHeader(session.token, Math.floor(sessionLifetime / 1000)),
      })
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return sendJson(res, 409, { error: 'Bu login band. Boshqa login tanlang.' })
      }
      throw error
    }
  }

  if (pathname === '/api/login' && method === 'POST') {
    const body = await readBody(req)
    const username = cleanText(body.username, 32)
    const key = `${loginClientAddress(req)}:${username.toLowerCase()}`
    const now = Date.now()
    if (now - lastLoginAttemptCleanup >= 60_000) {
      lastLoginAttemptCleanup = now
      await run('DELETE FROM login_attempts WHERE reset_at <= ?', now)
    }
    const attempt = await one(`
      INSERT INTO login_attempts (client_key, attempt_count, reset_at)
      VALUES (?, 1, ?)
      ON CONFLICT (client_key) DO UPDATE SET
        attempt_count = CASE WHEN login_attempts.reset_at <= ? THEN 1 ELSE login_attempts.attempt_count + 1 END,
        reset_at = CASE WHEN login_attempts.reset_at <= ? THEN ? ELSE login_attempts.reset_at END
      RETURNING attempt_count, reset_at
    `, key, now + 15 * 60 * 1000, now, now, now + 15 * 60 * 1000)
    if (Number(attempt.attempt_count) > 10) {
      return sendJson(res, 429, { error: 'Urinishlar ko‘payib ketdi. 15 daqiqadan so‘ng qayta urinib ko‘ring.' })
    }
    const password = typeof body.password === 'string' ? body.password : ''
    const user = await one('SELECT id, password_hash FROM users WHERE username = ? COLLATE NOCASE', username)
    const passwordMatches = await verifyPassword(password, user?.password_hash || dummyPasswordHash)
    if (!user || !passwordMatches) {
      return sendJson(res, 401, { error: 'Login yoki parol noto‘g‘ri.' })
    }
    await run('DELETE FROM login_attempts WHERE client_key = ?', key)
    const session = await startSession(user.id)
    return sendJson(res, 200, {
      user: await getCurrentUser({ headers: { cookie: `${cookieName}=${session.token}` } }),
    }, { 'Set-Cookie': cookieHeader(session.token, Math.floor(sessionLifetime / 1000)) })
  }

  const currentUser = await getCurrentUser(req)

  if (pathname === '/api/session' && method === 'GET') {
    return sendJson(res, 200, { authenticated: Boolean(currentUser), user: currentUser })
  }

  if (pathname === '/api/admin/settings' && method === 'GET') {
    if (currentUser?.role !== 'admin') {
      return sendJson(res, currentUser ? 403 : 401, { error: 'Administrator ruxsati kerak.' })
    }
    const admin = await one(`
      SELECT id, username, name, role FROM users WHERE id = ?
    `, currentUser.id)
    return sendJson(res, 200, { settings: await readCenterSettings(), admin })
  }

  if (pathname === '/api/admin/settings' && method === 'PATCH') {
    if (currentUser?.role !== 'admin') {
      return sendJson(res, currentUser ? 403 : 401, { error: 'Administrator ruxsati kerak.' })
    }
    const body = await readBody(req)
    const settings = {
      centerName: cleanSetting(body.centerName, 100),
      slogan: cleanSetting(body.slogan, 200),
      description: cleanSetting(body.description, 1000),
      phone: cleanSetting(body.phone, 32),
      address: cleanSetting(body.address, 240),
      telegram: cleanSetting(body.telegram, 120),
      instagram: cleanSetting(body.instagram, 120),
      courses: cleanSetting(body.courses, 1000),
    }
    if (!settings.centerName) {
      return sendJson(res, 400, { error: 'Markaz nomi bo‘sh bo‘lmasligi kerak.' })
    }
    if (
      (settings.telegram && !/^(https:\/\/)?(t\.me\/|telegram\.me\/|@)[a-zA-Z0-9_]{3,64}\/?$/i.test(settings.telegram)) ||
      (settings.instagram && !/^(https:\/\/)?((www\.)?instagram\.com\/)?@?[a-zA-Z0-9._]{1,30}\/?$/i.test(settings.instagram))
    ) {
      return sendJson(res, 400, { error: 'Telegram yoki Instagram havolasi formati noto‘g‘ri.' })
    }
    await run(`
      UPDATE center_settings SET center_name = ?, slogan = ?, description = ?,
        phone = ?, address = ?, telegram = ?, instagram = ?, courses = ?
      WHERE id = 1
    `,
      settings.centerName,
      settings.slogan,
      settings.description,
      settings.phone,
      settings.address,
      settings.telegram,
      settings.instagram,
      settings.courses,
    )
    return sendJson(res, 200, { settings: await readCenterSettings() })
  }

  if (pathname === '/api/admin/profile' && method === 'PATCH') {
    if (currentUser?.role !== 'admin') {
      return sendJson(res, currentUser ? 403 : 401, { error: 'Administrator ruxsati kerak.' })
    }
    const body = await readBody(req)
    const name = cleanText(body.name, 100)
    const username = cleanText(body.username, 32)
    const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : ''
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : ''
    if (!name || !isValidUsername(username)) {
      return sendJson(res, 400, { error: 'Ism va 3–32 belgili login kiriting.' })
    }
    if (!currentPassword || (newPassword && !validatePassword(newPassword))) {
      return sendJson(res, 400, { error: 'Joriy parolni kiriting; yangi parol kamida 12 belgidan iborat bo‘lsin.' })
    }
    const admin = await one('SELECT id, password_hash FROM users WHERE id = ? AND role = ?', currentUser.id, 'admin')
    if (!admin || !await verifyPassword(currentPassword, admin.password_hash)) {
      return sendJson(res, 401, { error: 'Joriy parol noto‘g‘ri.' })
    }
    const passwordHash = newPassword ? await makePasswordHash(newPassword) : admin.password_hash
    try {
      await transaction(async (connection) => {
        await connection.run('UPDATE users SET name = ?, username = ?, password_hash = ? WHERE id = ?', name, username, passwordHash, admin.id)
        await connection.run('DELETE FROM sessions WHERE user_id = ?', admin.id)
      })
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return sendJson(res, 409, { error: 'Bu login band. Boshqa login tanlang.' })
      }
      throw error
    }
    const session = await startSession(admin.id)
    const updatedAdmin = await getCurrentUser({ headers: { cookie: `${cookieName}=${session.token}` } })
    return sendJson(res, 200, { user: updatedAdmin }, {
      'Set-Cookie': cookieHeader(session.token, Math.floor(sessionLifetime / 1000)),
    })
  }

  if (pathname === '/api/logout' && method === 'POST') {
    const token = getCookie(req, cookieName)
    if (token) await run('DELETE FROM sessions WHERE token_hash = ?', digestToken(token))
    return sendJson(res, 200, { ok: true }, { 'Set-Cookie': cookieHeader('', 0) })
  }

  if (pathname === '/api/me' && method === 'GET') {
    if (!currentUser) return sendJson(res, 401, { error: 'Tizimga qayta kiring.' })
    return sendJson(res, 200, {
      user: currentUser,
      attendance: await getAttendanceForUser(currentUser.id),
      today: todayInTashkent(),
    })
  }

  if (!currentUser) return sendJson(res, 401, { error: 'Davom etish uchun tizimga kiring.' })

  if (pathname === '/api/users' && method === 'GET') {
    if (!requireRole(currentUser, ['admin', 'teacher'])) {
      return sendJson(res, 403, { error: 'Bu amal uchun ruxsat yo‘q.' })
    }
    const role = url.searchParams.get('role')
    const rows = role && ['admin', 'teacher', 'student'].includes(role)
      ? await many('SELECT id, username, name, role, phone, group_name AS groupName, schedule, created_at AS createdAt FROM users WHERE role = ? ORDER BY name', role)
      : await many('SELECT id, username, name, role, phone, group_name AS groupName, schedule, created_at AS createdAt FROM users ORDER BY role, name')
    const users = currentUser.role === 'teacher'
      ? rows.filter((person) => person.role === 'student')
      : rows
    return sendJson(res, 200, { users: users.map(publicUser) })
  }

  if (pathname === '/api/users' && method === 'POST') {
    if (currentUser.role !== 'admin') return sendJson(res, 403, { error: 'Faqat administrator hisob qo‘sha oladi.' })
    const body = await readBody(req)
    const name = cleanText(body.name, 100)
    const role = body.role
    const phone = cleanText(body.phone, 32)
    const groupName = cleanText(body.groupName, 80)
    const schedule = cleanText(body.schedule, 2000)
    if (!name || !['teacher', 'student'].includes(role)) {
      return sendJson(res, 400, { error: 'Ism va to‘g‘ri rolni kiriting.' })
    }
    const base = usernameBase(name)
    let username = base
    let suffix = 2
    while (await one('SELECT 1 FROM users WHERE username = ? COLLATE NOCASE', username)) {
      username = `${base.slice(0, 24 - String(suffix).length)}${suffix}`
      suffix += 1
    }
    const password = generatedPassword()
    let created
    try {
      created = await createAccount({ name, role, phone, groupName, schedule, username, password })
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return sendJson(res, 409, { error: 'Bu login allaqachon ishlatilgan. Qayta urinib ko‘ring.' })
      }
      throw error
    }
    return sendJson(res, 201, {
      user: publicUser(await one('SELECT id, username, name, role, phone, group_name AS groupName, schedule, created_at AS createdAt FROM users WHERE id = ?', created.id)),
      credentials: { username: created.username, password: created.password },
    })
  }

  const userMatch = pathname.match(/^\/api\/users\/([0-9a-f-]+)$/i)
  if (userMatch && method === 'PATCH') {
    if (currentUser.role !== 'admin') return sendJson(res, 403, { error: 'Faqat administrator ma’lumotlarni o‘zgartira oladi.' })
    const body = await readBody(req)
    const existing = await one('SELECT id FROM users WHERE id = ?', userMatch[1])
    if (!existing) return sendJson(res, 404, { error: 'Hisob topilmadi.' })
    const fields = {
      name: cleanText(body.name, 100),
      phone: cleanText(body.phone, 32),
      group_name: cleanText(body.groupName, 80),
      schedule: cleanText(body.schedule, 2000),
    }
    if (!fields.name) return sendJson(res, 400, { error: 'Ism bo‘sh bo‘lmasligi kerak.' })
    await run('UPDATE users SET name = ?, phone = ?, group_name = ?, schedule = ? WHERE id = ?', fields.name, fields.phone, fields.group_name, fields.schedule, userMatch[1])
    const updated = await one('SELECT id, username, name, role, phone, group_name AS groupName, schedule, created_at AS createdAt FROM users WHERE id = ?', userMatch[1])
    return sendJson(res, 200, { user: publicUser(updated) })
  }

  const passwordMatch = pathname.match(/^\/api\/users\/([0-9a-f-]+)\/reset-password$/i)
  if (passwordMatch && method === 'POST') {
    if (currentUser.role !== 'admin') return sendJson(res, 403, { error: 'Faqat administrator parolni yangilay oladi.' })
    if (passwordMatch[1] === currentUser.id) {
      return sendJson(res, 400, { error: 'Administrator parolini yangilash uchun qayta sozlash jarayonidan foydalaning.' })
    }
    const target = await one('SELECT id, username FROM users WHERE id = ?', passwordMatch[1])
    if (!target) return sendJson(res, 404, { error: 'Hisob topilmadi.' })
    const password = generatedPassword()
    const passwordHash = await makePasswordHash(password)
    await run('UPDATE users SET password_hash = ? WHERE id = ?', passwordHash, target.id)
    await run('DELETE FROM sessions WHERE user_id = ?', target.id)
    return sendJson(res, 200, { credentials: { username: target.username, password } })
  }

  if (pathname === '/api/attendance' && method === 'GET') {
    if (!requireRole(currentUser, ['admin', 'teacher'])) {
      return sendJson(res, 403, { error: 'Davomat ro‘yxatini ko‘rishga ruxsat yo‘q.' })
    }
    const day = url.searchParams.get('day') || todayInTashkent()
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
      return sendJson(res, 400, { error: 'Sana formati noto‘g‘ri.' })
    }
    const rows = await many(`
      SELECT users.id AS userId, users.name, users.username, users.role,
        users.group_name AS groupName, attendance.day,
        attendance.check_in AS checkIn, attendance.check_out AS checkOut
      FROM users
      LEFT JOIN attendance ON attendance.user_id = users.id AND attendance.day = ?
      WHERE users.role IN ('student', 'teacher')
      ORDER BY users.role, users.name
    `, day)
    const visibleRows = currentUser.role === 'teacher'
      ? rows.filter((person) => person.role === 'student')
      : rows
    return sendJson(res, 200, { day, attendance: visibleRows })
  }

  const selfClockMatch = pathname.match(/^\/api\/attendance\/clock\/(check-in|check-out)$/)
  if (selfClockMatch && method === 'POST') {
    const day = todayInTashkent()
    const now = localTimestamp()
    let result
    if (selfClockMatch[1] === 'check-in') {
      result = await run(`
        INSERT OR IGNORE INTO attendance (id, user_id, day, check_in, marked_by)
        VALUES (?, ?, ?, ?, ?)
      `, randomUUID(), currentUser.id, day, now, currentUser.id)
      if (result.changes === 0) return sendJson(res, 409, { error: 'Bugun kelganingiz avval qayd etilgan.' })
    } else {
      result = await run(`
        UPDATE attendance SET check_out = ?
        WHERE user_id = ? AND day = ? AND check_in IS NOT NULL AND check_out IS NULL
      `, now, currentUser.id, day)
      if (result.changes === 0) return sendJson(res, 409, { error: 'Ketish vaqti qayd etilmadi. Avval kelganingizni belgilang.' })
    }
    return sendJson(res, 200, { attendance: (await getAttendanceForUser(currentUser.id, 1))[0] })
  }

  const markMatch = pathname.match(/^\/api\/attendance\/([0-9a-f-]+)\/(check-in|check-out)$/i)
  if (markMatch && method === 'POST') {
    if (!requireRole(currentUser, ['admin', 'teacher'])) {
      return sendJson(res, 403, { error: 'Davomat belgilashga ruxsat yo‘q.' })
    }
    const target = await one('SELECT id, role FROM users WHERE id = ?', markMatch[1])
    if (!target || (currentUser.role === 'teacher' && target.role !== 'student')) {
      return sendJson(res, 404, { error: 'O‘quvchi topilmadi.' })
    }
    const day = todayInTashkent()
    const now = localTimestamp()
    let result
    if (markMatch[2] === 'check-in') {
      result = await run(`
        INSERT OR IGNORE INTO attendance (id, user_id, day, check_in, marked_by)
        VALUES (?, ?, ?, ?, ?)
      `, randomUUID(), target.id, day, now, currentUser.id)
      if (result.changes === 0) return sendJson(res, 409, { error: 'Bugungi kelish vaqti avval qayd etilgan.' })
    } else {
      result = await run(`
        UPDATE attendance SET check_out = ?
        WHERE user_id = ? AND day = ? AND check_in IS NOT NULL AND check_out IS NULL
      `, now, target.id, day)
      if (result.changes === 0) return sendJson(res, 409, { error: 'Avval kelish vaqti qayd etilishi kerak.' })
    }
    return sendJson(res, 200, { ok: true })
  }

  return sendJson(res, 404, { error: 'API manzili topilmadi.' })
}

function serveStatic(req, res, url) {
  const dist = join(root, 'dist')
  const requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)
  const normalized = normalize(requested).replace(/^(\.\.[/\\])+/, '')
  let filePath = resolve(dist, `.${normalized}`)
  if (filePath !== dist && !filePath.startsWith(`${dist}${sep}`)) {
    res.writeHead(403).end('Forbidden')
    return
  }
  if (!existsSync(filePath)) filePath = join(dist, 'index.html')
  if (!existsSync(filePath)) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Build qilingan sayt topilmadi. Avval npm run build buyrug‘ini bajaring.')
    return
  }
  const content = readFileSync(filePath)
  res.writeHead(200, {
    'Cache-Control': filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
    ...(production ? { 'Strict-Transport-Security': 'max-age=31536000' } : {}),
    'Content-Length': content.length,
    'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  })
  res.end(content)
}

const handleRequest = async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    if (production && !directHttps && !renderProxy) {
      const requestSecret = req.headers['x-future-step-proxy-secret']
      const expectedSecret = Buffer.from(proxySecret)
      const receivedSecret = Buffer.from(typeof requestSecret === 'string' ? requestSecret : '')
      const trustedProxy = (
        expectedSecret.length > 0 &&
        expectedSecret.length === receivedSecret.length &&
        timingSafeEqual(expectedSecret, receivedSecret)
      )
      if (!trustedProxy || req.headers['x-forwarded-proto'] !== 'https') {
        res.writeHead(426, {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/plain; charset=utf-8',
          'Strict-Transport-Security': 'max-age=31536000',
        })
        res.end('Ishonchli HTTPS proxy orqali ulanish talab qilinadi.')
        return
      }
    } else if (production && renderProxy && req.headers['x-forwarded-proto'] !== 'https') {
      res.writeHead(426, {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
        'Strict-Transport-Security': 'max-age=31536000',
      })
      res.end('HTTPS ulanish talab qilinadi.')
      return
    } else if (production && directHttps && !req.socket.encrypted) {
      res.writeHead(426, {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
        'Strict-Transport-Security': 'max-age=31536000',
      })
      res.end('HTTPS ulanish talab qilinadi.')
      return
    }
    if (url.pathname.startsWith('/api/')) {
      await handleApi(req, res, url)
      return
    }
    if (url.pathname === '/robots.txt' && req.method === 'GET') {
      const sitemapLine = publicSiteUrl ? `Sitemap: ${publicSiteUrl}/sitemap.xml\n` : ''
      res.writeHead(200, {
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      })
      res.end(`User-agent: *\nAllow: /\nDisallow: /api/\n${sitemapLine}`)
      return
    }
    if (url.pathname === '/sitemap.xml' && req.method === 'GET') {
      if (!publicSiteUrl) {
        res.writeHead(503, { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('PUBLIC_SITE_URL sozlanmagan.')
        return
      }
      res.writeHead(200, {
        'Cache-Control': 'public, max-age=3600',
        'Content-Type': 'application/xml; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      })
      res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicSiteUrl}/</loc></url></urlset>`)
      return
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      sendJson(res, 405, { error: 'Bu so‘rov usuli qo‘llab-quvvatlanmaydi.' })
      return
    }
    serveStatic(req, res, url)
  } catch (error) {
    console.error('So‘rovni bajarishda xato:', error)
    if (!res.headersSent) sendJson(res, error.status || 500, {
      error: error.status ? error.message : 'Serverda xatolik yuz berdi.',
    })
  }
}

const server = directHttps
  ? createHttpsServer({
    key: readFileSync(resolve(httpsKeyFile)),
    cert: readFileSync(resolve(httpsCertFile)),
  }, handleRequest)
  : createServer(handleRequest)

server.listen(port, localDevelopment ? '127.0.0.1' : '0.0.0.0', () => {
  console.log(`FUTURE STEP serveri ${databaseKind()} bazasi bilan ${directHttps ? 'HTTPS' : localDevelopment ? 'lokal' : 'HTTPS proxy'} rejimida ${port}-portda ishga tushdi.`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => {
      closeDatabase().then(() => process.exit(0), (error) => {
        console.error('Ma’lumotlar bazasini yopishda xatolik:', error)
        process.exit(1)
      })
    })
  })
}
