import { useCallback, useEffect, useState } from 'react'
import './App.css'

async function api(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'So‘rovni bajarib bo‘lmadi.')
  return data
}

const roleNames = {
  admin: 'Administrator',
  teacher: 'O‘qituvchi',
  student: 'O‘quvchi',
}

const weekdays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

function todayLabel() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tashkent',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(new Date())
  const dateParts = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const weekdaysUz = {
    Monday: 'Dushanba',
    Tuesday: 'Seshanba',
    Wednesday: 'Chorshanba',
    Thursday: 'Payshanba',
    Friday: 'Juma',
    Saturday: 'Shanba',
    Sunday: 'Yakshanba',
  }
  const monthsUz = {
    January: 'yanvar',
    February: 'fevral',
    March: 'mart',
    April: 'aprel',
    May: 'may',
    June: 'iyun',
    July: 'iyul',
    August: 'avgust',
    September: 'sentabr',
    October: 'oktabr',
    November: 'noyabr',
    December: 'dekabr',
  }
  return `${weekdaysUz[dateParts.weekday]}, ${dateParts.day}-${monthsUz[dateParts.month]} ${dateParts.year}`
}

function formatTime(value) {
  return value ? value.slice(11, 16) : '—'
}

function Notice({ notice, onClose }) {
  if (!notice) return null
  return (
    <div className={`notice ${notice.type || 'success'}`} role="status">
      <span>{notice.message}</span>
      <button type="button" onClick={onClose} aria-label="Xabarni yopish">×</button>
    </div>
  )
}

function externalUrl(value, kind) {
  if (!value) return ''
  if (value.startsWith('https://')) return value
  if (kind === 'telegram' && value.startsWith('@')) return `https://t.me/${value.slice(1)}`
  return `https://${kind === 'telegram' ? 't.me' : 'instagram.com'}/${value.replace(/^@/, '')}`
}

function Login({ setup, setupAvailable, setupKeyRequired, settings, onLogin, onSetup, busy, error }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [setupKey, setSetupKey] = useState('')
  const visibleError = error || (setup && !setupAvailable
    ? 'Administrator sozlash kaliti hostingda sozlanmagan. Sayt egasiga murojaat qiling.'
    : '')

  async function submit(event) {
    event.preventDefault()
    if (setup) await onSetup({ name, username, password, setupKey })
    else await onLogin({ username, password })
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <a className="brand auth-brand" href="/" aria-label="FUTURE STEP">
          <span className="brand-mark">FS</span>
          <span className="brand-name">{settings.centerName || 'FUTURE STEP'}</span>
        </a>
        <div className="auth-eyebrow"><span /> {settings.slogan || 'O‘quv markaz boshqaruv tizimi'}</div>
        <h1 id="auth-title">{setup ? 'Administratorni sozlang.' : 'Xush kelibsiz.'}</h1>
        <p className="auth-description">
          {setup
            ? 'Boshlash uchun markaz administratorining birinchi hisobini yarating.'
            : 'Shaxsiy kabinetingizga kirish uchun login va parolingizni kiriting.'}
        </p>
        <Notice notice={visibleError ? { type: 'error', message: visibleError } : null} />
        <form className="auth-form" onSubmit={submit}>
          {setup && (
            <label>
              Ism va familiya
              <input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} placeholder="Masalan, Ali Valiyev" />
            </label>
          )}
          {setup && setupKeyRequired && (
            <label>
              Administrator sozlash kaliti
              <input type="password" autoComplete="off" value={setupKey} onChange={(event) => setSetupKey(event.target.value)} required maxLength={256} placeholder="Hosting egasidan oling" />
            </label>
          )}
          <label>
            Login
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              minLength={3}
              maxLength={32}
              placeholder="Masalan, ali.valiyev"
            />
          </label>
          <label>
            Parol
            <input
              type="password"
              autoComplete={setup ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={setup ? 12 : 1}
              maxLength={128}
              placeholder={setup ? 'Kamida 12 ta belgi' : 'Parolingizni kiriting'}
            />
          </label>
          {setup && <p className="password-hint">Parol kamida 12 ta belgidan iborat bo‘lishi kerak.</p>}
          <button className="button button-primary auth-submit" type="submit" disabled={busy || (setup && !setupAvailable)}>
            {busy ? 'Tekshirilmoqda…' : setup ? 'Administrator hisobini yaratish' : 'Tizimga kirish'}
            {!busy && <span aria-hidden="true">→</span>}
          </button>
        </form>
        <div className="auth-security"><span aria-hidden="true">●</span> Himoyalangan shaxsiy kabinet</div>
        <section className="public-center-info" aria-label="O‘quv markazi ma’lumotlari">
          <h2>{settings.centerName || 'FUTURE STEP'}</h2>
          {settings.description
            ? <p>{settings.description}</p>
            : <p>{settings.slogan || 'Bilim bilan kelajak sari.'} O‘quv dasturlari va dars jadvali haqida markaz bilan bog‘laning.</p>}
          {settings.address && <p><strong>Manzil:</strong> {settings.address}</p>}
          {settings.phone && <p><strong>Telefon:</strong> <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a></p>}
          {settings.courses && <p><strong>Yo‘nalishlar:</strong> {settings.courses}</p>}
          {(settings.telegram || settings.instagram) && <div className="public-socials">
            {settings.telegram && <a href={externalUrl(settings.telegram, 'telegram')} target="_blank" rel="noreferrer">Telegram</a>}
            {settings.instagram && <a href={externalUrl(settings.instagram, 'instagram')} target="_blank" rel="noreferrer">Instagram</a>}
          </div>}
        </section>
      </section>
    </main>
  )
}

function Sidebar({ user, page, setPage, onLogout }) {
  const links = user.role === 'admin'
    ? [['overview', 'Umumiy ko‘rinish', '⌂'], ['attendance', 'Davomat', '◷'], ['users', 'Hisoblar', '♙'], ['settings', 'Markaz sozlamalari', '⚙'], ['admin-settings', 'Admin sozlamalari', '♧']]
    : user.role === 'teacher'
      ? [['overview', 'O‘quvchilarim', '♙'], ['attendance', 'Davomat', '◷']]
      : [['overview', 'Bosh sahifa', '⌂'], ['schedule', 'Dars jadvalim', '▦'], ['attendance', 'Davomatim', '◷']]

  return (
    <aside className="sidebar">
      <a className="brand sidebar-brand" href="/" aria-label="FUTURE STEP">
        <span className="brand-mark">FS</span>
        <span className="brand-name">FUTURE <b>STEP</b></span>
      </a>
      <div className="sidebar-label">MENYU</div>
      <nav className="sidebar-nav" aria-label="Boshqaruv paneli">
        {links.map(([id, title, icon]) => (
          <button
            className={page === id ? 'sidebar-link active' : 'sidebar-link'}
            key={id}
            type="button"
            onClick={() => setPage(id)}
          >
            <span className="sidebar-icon" aria-hidden="true">{icon}</span>{title}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="side-user">
          <span className="avatar">{user.name.slice(0, 1).toUpperCase()}</span>
          <span className="side-user-info"><strong>{user.name}</strong><small>{roleNames[user.role]}</small></span>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}><span aria-hidden="true">↪</span> Chiqish</button>
      </div>
    </aside>
  )
}

function CenterSettingsForm({ settings, onSave, busy }) {
  const [form, setForm] = useState(settings)

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    const savedSettings = await onSave(form)
    if (savedSettings) setForm(savedSettings)
  }

  return (
    <form className="account-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Markaz nomi<input value={form.centerName} onChange={(event) => update('centerName', event.target.value)} maxLength={100} required /></label>
        <label>Shior<input value={form.slogan} onChange={(event) => update('slogan', event.target.value)} maxLength={200} placeholder="Bilim bilan kelajak sari." /></label>
        <label>Telefon<input type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} maxLength={32} placeholder="+998 90 123 45 67" /></label>
        <label>Manzil<input value={form.address} onChange={(event) => update('address', event.target.value)} maxLength={240} placeholder="Shahar, ko‘cha, bino" /></label>
        <label>Telegram username yoki havola<input value={form.telegram} onChange={(event) => update('telegram', event.target.value)} maxLength={120} placeholder="@futurestep yoki https://t.me/..." /></label>
        <label>Instagram username yoki havola<input value={form.instagram} onChange={(event) => update('instagram', event.target.value)} maxLength={120} placeholder="futurestep yoki instagram.com/..." /></label>
        <label className="form-wide">Markaz haqida<textarea value={form.description} onChange={(event) => update('description', event.target.value)} rows={3} maxLength={1000} placeholder="Saytda o‘quvchilar ko‘radigan qisqa ma’lumot" /></label>
        <label className="form-wide">Kurslar va yo‘nalishlar<textarea value={form.courses} onChange={(event) => update('courses', event.target.value)} rows={3} maxLength={1000} placeholder="Ingliz tili, matematika, IT va boshqa kurslar" /></label>
      </div>
      <div className="form-footer"><span>Bu ma’lumotlar login sahifasida ommaga ko‘rinadi.</span><button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Saqlanmoqda…' : 'Markaz ma’lumotlarini saqlash'}<span aria-hidden="true">✓</span></button></div>
    </form>
  )
}

function AdminSettingsForm({ user, onSave, busy }) {
  const [form, setForm] = useState({ name: user.name, username: user.username, currentPassword: '', newPassword: '', confirmPassword: '' })
  const [validationError, setValidationError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setValidationError('')
    if (form.newPassword !== form.confirmPassword) {
      setValidationError('Yangi parol tasdig‘i mos kelmadi.')
      return
    }
    const saved = await onSave({
      name: form.name,
      username: form.username,
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    })
    if (saved) {
      setForm((current) => ({
        ...current,
        name: saved.name,
        username: saved.username,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    }
  }

  return (
    <form className="account-form" onSubmit={submit}>
      <Notice notice={validationError ? { type: 'error', message: validationError } : null} />
      <div className="form-grid">
        <label>Admin ismi<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} maxLength={100} required /></label>
        <label>Admin login<input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} minLength={3} maxLength={32} required /></label>
        <label className="form-wide">Joriy parol<input type="password" autoComplete="current-password" value={form.currentPassword} onChange={(event) => setForm({ ...form, currentPassword: event.target.value })} required /></label>
        <label>Yangi parol (ixtiyoriy)<input type="password" autoComplete="new-password" value={form.newPassword} onChange={(event) => setForm({ ...form, newPassword: event.target.value })} minLength={12} maxLength={128} placeholder="Kamida 12 belgi" /></label>
        <label>Yangi parol tasdig‘i<input type="password" autoComplete="new-password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} minLength={form.newPassword ? 12 : undefined} maxLength={128} /></label>
      </div>
      <div className="form-footer"><span>O‘zgarishlarni saqlash uchun joriy parol talab qilinadi.</span><button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Saqlanmoqda…' : 'Admin sozlamalarini saqlash'}<span aria-hidden="true">✓</span></button></div>
    </form>
  )
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="page-eyebrow"><span />{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}

function Schedule({ schedule }) {
  const lines = schedule.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  if (!lines.length) {
    return <div className="empty-state"><span>▦</span><strong>Dars jadvali hali kiritilmagan</strong><p>Jadvalingiz bo‘yicha ma’lumotni administrator orqali aniqlang.</p></div>
  }
  return (
    <div className="schedule-list">
      {lines.map((line, index) => {
        const day = weekdays.find((weekday) => line.toLocaleLowerCase('uz').includes(weekday.toLocaleLowerCase('uz')))
        return <div className="schedule-row" key={`${line}-${index}`}>
          <span className="schedule-day">{day || 'Dars'}</span>
          <span className="schedule-detail">{line}</span>
        </div>
      })}
    </div>
  )
}

function AttendanceTable({ rows, role, busyId, onMark, editable = true }) {
  if (!rows.length) return <div className="empty-state"><span>◷</span><strong>Hozircha ro‘yxat bo‘sh</strong><p>Hisoblar qo‘shilganda davomat shu yerda ko‘rinadi.</p></div>
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr><th>Ism</th><th>Guruh / turi</th><th>Kelgan vaqti</th><th>Ketgan vaqti</th>{role !== 'student' && <th>Amal</th>}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.userId || row.day}>
              <td><div className="table-person"><span className="table-avatar">{row.name.slice(0, 1).toUpperCase()}</span><span><strong>{row.name}</strong><small>{row.username}</small></span></div></td>
              <td>{row.groupName || roleNames[row.role] || '—'}</td>
              <td>{formatTime(row.checkIn)}</td>
              <td>{formatTime(row.checkOut)}</td>
              {role !== 'student' && <td>
                <div className="table-actions">
                  {!editable && <span>—</span>}
                  {editable && !row.checkIn && <button disabled={busyId === row.userId} onClick={() => onMark(row.userId, 'check-in')} type="button">Keldi</button>}
                  {editable && row.checkIn && !row.checkOut && <button disabled={busyId === row.userId} onClick={() => onMark(row.userId, 'check-out')} type="button">Ketdi</button>}
                  {editable && row.checkOut && <span className="status-done">Yakunlandi</span>}
                </div>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AccountForm({ onCreate, busy }) {
  const [form, setForm] = useState({ name: '', role: 'student', phone: '', groupName: '', schedule: '' })
  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }
  async function submit(event) {
    event.preventDefault()
    const created = await onCreate(form)
    if (created) setForm({ name: '', role: form.role, phone: '', groupName: '', schedule: '' })
  }
  return (
    <form className="account-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Ism va familiya<input value={form.name} onChange={(event) => update('name', event.target.value)} required maxLength={100} placeholder="O‘quvchi yoki o‘qituvchi ismi" /></label>
        <label>Hisob turi<select value={form.role} onChange={(event) => update('role', event.target.value)}><option value="student">O‘quvchi</option><option value="teacher">O‘qituvchi</option></select></label>
        <label>Telefon raqami<input value={form.phone} onChange={(event) => update('phone', event.target.value)} maxLength={32} placeholder="+998 …" /></label>
        {form.role === 'student' && <label>Guruh<input value={form.groupName} onChange={(event) => update('groupName', event.target.value)} maxLength={80} placeholder="Masalan, Ingliz tili — A1" /></label>}
        {form.role === 'student' && <label className="form-wide">Dars jadvali<textarea value={form.schedule} onChange={(event) => update('schedule', event.target.value)} rows={3} maxLength={2000} placeholder={'Har bir darsni yangi qatordan kiriting:\nDushanba 09:00 — Ingliz tili\nChorshanba 09:00 — Ingliz tili'} /></label>}
      </div>
      <div className="form-footer"><span>Login avtomatik yaratiladi, vaqtinchalik parol bir marta ko‘rsatiladi.</span><button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Yaratilmoqda…' : 'Hisob yaratish'}<span aria-hidden="true">＋</span></button></div>
    </form>
  )
}

function UserList({ users, onSave, onReset, busyId }) {
  return (
    <div className="user-list">
      {users.map((person) => (
        <details className="user-item" key={person.id}>
          <summary>
            <div className="table-person"><span className="table-avatar">{person.name.slice(0, 1).toUpperCase()}</span><span><strong>{person.name}</strong><small>{person.username}</small></span></div>
            <span className={`role-badge ${person.role}`}>{roleNames[person.role]}</span>
            <span className="user-group">{person.groupName || person.phone || 'Ma’lumot kiritilmagan'}</span>
            <span className="user-chevron" aria-hidden="true">⌄</span>
          </summary>
          <UserEdit person={person} onSave={onSave} onReset={onReset} busy={busyId === person.id} />
        </details>
      ))}
      {!users.length && <div className="empty-state"><span>♙</span><strong>Hisoblar hali qo‘shilmagan</strong><p>Yuqoridagi shakl yordamida yangi hisob yarating.</p></div>}
    </div>
  )
}

function UserEdit({ person, onSave, onReset, busy }) {
  const [credentials, setCredentials] = useState(null)
  const [form, setForm] = useState({
    name: person.name,
    phone: person.phone,
    groupName: person.groupName,
    schedule: person.schedule,
  })
  async function submit(event) {
    event.preventDefault()
    await onSave(person.id, form)
  }
  async function resetPassword() {
    const newCredentials = await onReset(person.id)
    if (newCredentials) setCredentials(newCredentials)
  }
  return (
    <form className="user-edit" onSubmit={submit}>
      <label>Ism<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required maxLength={100} /></label>
      <label>Telefon<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} maxLength={32} /></label>
      {person.role === 'student' && <>
        <label>Guruh<input value={form.groupName} onChange={(event) => setForm({ ...form, groupName: event.target.value })} maxLength={80} /></label>
        <label className="edit-schedule">Jadval<textarea value={form.schedule} onChange={(event) => setForm({ ...form, schedule: event.target.value })} rows={3} maxLength={2000} /></label>
      </>}
      <button type="submit" className="button button-primary" disabled={busy}>{busy ? 'Saqlanmoqda…' : 'O‘zgarishlarni saqlash'}</button>
      <button type="button" className="password-reset-button" disabled={busy} onClick={resetPassword}>Yangi parol yaratish</button>
      <Credentials credentials={credentials} onDismiss={() => setCredentials(null)} />
    </form>
  )
}

function Credentials({ credentials, onDismiss }) {
  if (!credentials) return null
  return (
    <div className="credentials-box" role="status">
      <button className="credentials-close" type="button" onClick={onDismiss} aria-label="Yopish">×</button>
      <strong>Kirish ma’lumotlarini hisob egasiga xavfsiz yetkazing:</strong>
      <div><span>Login</span><code>{credentials.username}</code></div>
      <div><span>Parol</span><code>{credentials.password}</code></div>
      <small>Parol qayta ko‘rsatilmaydi. Uni xavfsiz saqlab, egasiga yetkazing.</small>
    </div>
  )
}

function StudentOverview({ user, attendance, onClock, onOpenSchedule, busy, today }) {
  const todayRecord = attendance.find((record) => record.day === today)
  return (
    <>
      <PageHeading eyebrow={todayLabel()} title={`Assalomu alaykum, ${user.name.split(' ')[0]}!`} description="O‘qish va dars jadvalingiz bo‘yicha ma’lumotlar." />
      <div className="metric-grid student-metrics">
        <article className="metric-card"><span className="metric-icon purple">▦</span><span className="metric-label">Guruh</span><strong>{user.groupName || 'Biriktirilmagan'}</strong><small>O‘quv guruhingiz</small></article>
        <article className="metric-card"><span className="metric-icon green">◷</span><span className="metric-label">Bugungi davomat</span><strong>{todayRecord?.checkIn ? 'Keldi' : 'Belgilanmagan'}</strong><small>{todayRecord?.checkIn ? `Kelish: ${formatTime(todayRecord.checkIn)}` : 'Kelganingizni qayd eting'}</small></article>
        <article className="metric-card clock-card"><span className="metric-icon orange">↗</span><span className="metric-label">Davomat belgisi</span><strong>{todayRecord?.checkOut ? 'Dars tugadi' : todayRecord?.checkIn ? 'Dars davom etmoqda' : 'Darsga xush kelibsiz'}</strong>
          {!todayRecord?.checkIn && <button type="button" onClick={() => onClock('check-in')} disabled={busy} className="small-action">{busy ? 'Saqlanmoqda…' : 'Keldim deb belgilash'}</button>}
          {todayRecord?.checkIn && !todayRecord.checkOut && <button type="button" onClick={() => onClock('check-out')} disabled={busy} className="small-action">{busy ? 'Saqlanmoqda…' : 'Ketdim deb belgilash'}</button>}
          {todayRecord?.checkOut && <small>Ketish: {formatTime(todayRecord.checkOut)}</small>}
        </article>
      </div>
      <section className="content-card">
        <div className="card-heading"><div><span className="section-kicker">HAFTALIK REJA</span><h2>Dars jadvalim</h2></div><button className="quiet-link" type="button" onClick={onOpenSchedule}>To‘liq jadval →</button></div>
        <Schedule schedule={user.schedule || ''} />
      </section>
      <section className="content-card">
        <div className="card-heading"><div><span className="section-kicker">SHAXSIY MA’LUMOT</span><h2>Profilim</h2></div></div>
        <div className="profile-grid"><div><span>To‘liq ism</span><strong>{user.name}</strong></div><div><span>Login</span><strong>{user.username}</strong></div><div><span>Telefon</span><strong>{user.phone || 'Kiritilmagan'}</strong></div><div><span>Guruh</span><strong>{user.groupName || 'Biriktirilmagan'}</strong></div></div>
      </section>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [setup, setSetup] = useState(false)
  const [setupAvailable, setSetupAvailable] = useState(true)
  const [setupKeyRequired, setSetupKeyRequired] = useState(false)
  const [booting, setBooting] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState(null)
  const [page, setPage] = useState('overview')
  const [users, setUsers] = useState([])
  const [attendance, setAttendance] = useState([])
  const [myAttendance, setMyAttendance] = useState([])
  const [today, setToday] = useState('')
  const [attendanceDay, setAttendanceDay] = useState('')
  const [createdCredentials, setCreatedCredentials] = useState(null)
  const [search, setSearch] = useState('')
  const [centerSettings, setCenterSettings] = useState({
    centerName: 'FUTURE STEP',
    slogan: 'Bilim bilan kelajak sari.',
    description: '',
    phone: '',
    address: '',
    telegram: '',
    instagram: '',
    courses: '',
  })
  const [adminSettingsBusy, setAdminSettingsBusy] = useState(false)

  useEffect(() => {
    const title = `${centerSettings.centerName || 'FUTURE STEP'} — O‘quv markazi | Bilim bilan kelajak sari`
    document.title = title
    const description = centerSettings.description || `${centerSettings.centerName || 'FUTURE STEP'} o‘quv markazi — bilim va ko‘nikmalarni rivojlantirish sari qadam qo‘ying.`
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]']) {
      const meta = document.querySelector(selector)
      if (meta) meta.setAttribute('content', description)
    }
    const socialTitle = document.querySelector('meta[property="og:title"]')
    if (socialTitle) socialTitle.setAttribute('content', title)
    const socialName = document.querySelector('meta[property="og:site_name"]')
    if (socialName) socialName.setAttribute('content', centerSettings.centerName || 'FUTURE STEP')
    const canonicalUrl = new URL('/', window.location.origin).href
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', canonicalUrl)
    const socialUrl = document.querySelector('meta[property="og:url"]')
    if (socialUrl) socialUrl.setAttribute('content', canonicalUrl)
    const organizationSchema = document.querySelector('#organization-schema')
    if (organizationSchema) {
      organizationSchema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: centerSettings.centerName || 'FUTURE STEP',
        description,
        url: canonicalUrl,
        ...(centerSettings.phone ? { telephone: centerSettings.phone } : {}),
        ...(centerSettings.address ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: centerSettings.address,
            addressCountry: 'UZ',
          },
        } : {}),
        inLanguage: 'uz',
      })
    }
  }, [centerSettings.address, centerSettings.centerName, centerSettings.description, centerSettings.phone])

  const load = useCallback(async () => {
    const data = await api('/me')
    setUser(data.user)
    setMyAttendance(data.attendance)
    setToday(data.today)
    setAttendanceDay(data.today)
    if (['admin', 'teacher'].includes(data.user.role)) {
      const [accounts, day] = await Promise.all([api('/users'), api(`/attendance?day=${data.today}`)])
      setUsers(accounts.users)
      setAttendance(day.attendance)
    }
    return data.user
  }, [])

  useEffect(() => {
    async function initialize() {
      try {
        const [status, publicInfo] = await Promise.all([
          api('/setup/status'),
          api('/public/settings'),
        ])
        setSetup(status.needsSetup)
        setSetupAvailable(status.setupAvailable)
        setSetupKeyRequired(status.setupKeyRequired)
        setCenterSettings(publicInfo.settings)
        if (!status.needsSetup) {
          const session = await api('/session')
          if (session.authenticated) await load()
        }
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setBooting(false)
      }
    }
    initialize()
  }, [load])

  async function signIn(credentials) {
    setBusy(true)
    setError('')
    try {
      await api('/login', { method: 'POST', body: JSON.stringify(credentials) })
      await load()
      setPage('overview')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function createAdmin(credentials) {
    setBusy(true)
    setError('')
    try {
      await api('/setup', { method: 'POST', body: JSON.stringify(credentials) })
      setSetup(false)
      await load()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    try {
      await api('/logout', { method: 'POST' })
      setUser(null)
      setUsers([])
      setAttendance([])
      setMyAttendance([])
      setError('')
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
    }
  }

  async function createUser(form) {
    setBusy(true)
    try {
      const result = await api('/users', { method: 'POST', body: JSON.stringify(form) })
      setUsers((current) => [...current, result.user].sort((a, b) => a.name.localeCompare(b.name)))
      setCreatedCredentials(result.credentials)
      setNotice({ message: `${roleNames[form.role]} hisobi yaratildi.` })
      return true
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
      return false
    } finally {
      setBusy(false)
    }
  }

  async function saveUser(id, form) {
    setBusy(true)
    try {
      const result = await api(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(form) })
      setUsers((current) => current.map((person) => person.id === id ? result.user : person))
      if (user.id === id) setUser(result.user)
      setNotice({ message: 'Ma’lumotlar saqlandi.' })
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
    } finally {
      setBusy(false)
    }
  }

  async function saveCenterSettings(form) {
    setAdminSettingsBusy(true)
    try {
      const result = await api('/admin/settings', { method: 'PATCH', body: JSON.stringify(form) })
      setCenterSettings(result.settings)
      setNotice({ message: 'Markazning ommaviy ma’lumotlari saqlandi.' })
      return result.settings
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
      return false
    } finally {
      setAdminSettingsBusy(false)
    }
  }

  async function saveAdminSettings(form) {
    setAdminSettingsBusy(true)
    try {
      const result = await api('/admin/profile', { method: 'PATCH', body: JSON.stringify(form) })
      setUser(result.user)
      setNotice({ message: 'Admin sozlamalari saqlandi.' })
      return result.user
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
      return false
    } finally {
      setAdminSettingsBusy(false)
    }
  }

  async function clock(action) {
    setBusy(true)
    try {
      await api(`/attendance/clock/${action}`, { method: 'POST' })
      await load()
      setNotice({ message: action === 'check-in' ? 'Kelish vaqtingiz qayd etildi.' : 'Ketish vaqtingiz qayd etildi.' })
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
    } finally {
      setBusy(false)
    }
  }

  async function markAttendance(id, action) {
    setBusyId(id)
    try {
      await api(`/attendance/${id}/${action}`, { method: 'POST' })
      const day = await api(`/attendance?day=${attendanceDay}`)
      setAttendance(day.attendance)
      setNotice({ message: 'Davomat yangilandi.' })
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
    } finally {
      setBusyId('')
    }
  }

  async function changeAttendanceDay(day) {
    if (!day) return
    setAttendanceDay(day)
    try {
      const result = await api(`/attendance?day=${day}`)
      setAttendance(result.attendance)
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
    }
  }

  async function resetPassword(id) {
    setBusyId(id)
    try {
      const result = await api(`/users/${id}/reset-password`, { method: 'POST', body: '{}' })
      setNotice({ message: 'Yangi parol yaratildi. Uni hisob egasiga xavfsiz yetkazing.' })
      return result.credentials
    } catch (requestError) {
      setNotice({ type: 'error', message: requestError.message })
      return null
    } finally {
      setBusyId('')
    }
  }

  const [busyId, setBusyId] = useState('')

  if (booting) return <main className="loading-page"><span className="loading-mark">FS</span><p>FUTURE STEP yuklanmoqda…</p></main>
  if (!user) return <Login setup={setup} setupAvailable={setupAvailable} setupKeyRequired={setupKeyRequired} settings={centerSettings} onLogin={signIn} onSetup={createAdmin} busy={busy} error={error} />

  const currentTitle = {
    overview: user.role === 'admin' ? 'Umumiy ko‘rinish' : user.role === 'teacher' ? 'O‘quvchilarim' : 'Shaxsiy kabinet',
    attendance: user.role === 'student' ? 'Davomatim' : 'Davomat nazorati',
    users: 'Hisoblar',
    schedule: 'Dars jadvalim',
    settings: 'Markaz sozlamalari',
    'admin-settings': 'Admin sozlamalari',
  }[page]

  return (
    <div className="dashboard">
      <Sidebar user={user} page={page} setPage={setPage} onLogout={logout} />
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="breadcrumb">FUTURE STEP <span>/</span> {currentTitle}</div>
          <div className="topbar-right"><span className="today-label">{todayLabel()}</span><span className="avatar top-avatar">{user.name.slice(0, 1).toUpperCase()}</span></div>
        </header>
        <div className="dashboard-content">
          <Notice notice={notice} onClose={() => setNotice(null)} />
          {page === 'overview' && user.role === 'student' && (
            <StudentOverview user={user} attendance={myAttendance} onClock={clock} onOpenSchedule={() => setPage('schedule')} busy={busy} today={today} />
          )}
          {page === 'overview' && user.role === 'admin' && (
            <>
              <PageHeading eyebrow={todayLabel()} title="Umumiy ko‘rinish" description="Markazingizdagi bugungi holat va hisoblar." action={<button className="button button-primary" type="button" onClick={() => setPage('users')}>Hisob qo‘shish <span>＋</span></button>} />
              <div className="metric-grid">
                <article className="metric-card"><span className="metric-icon purple">♙</span><span className="metric-label">O‘quvchilar</span><strong>{users.filter((person) => person.role === 'student').length}</strong><small>Faol hisoblar</small></article>
                <article className="metric-card"><span className="metric-icon green">♧</span><span className="metric-label">O‘qituvchilar</span><strong>{users.filter((person) => person.role === 'teacher').length}</strong><small>Jamoa a’zolari</small></article>
                <article className="metric-card"><span className="metric-icon orange">◷</span><span className="metric-label">Bugun kelgan</span><strong>{attendance.filter((person) => person.checkIn).length}</strong><small>{attendance.filter((person) => person.role === 'student' && person.checkIn).length} nafar o‘quvchi</small></article>
              </div>
              <section className="content-card">
                <div className="card-heading"><div><span className="section-kicker">BUGUNGI NAZORAT</span><h2>Davomat holati</h2></div><button className="quiet-link" type="button" onClick={() => setPage('attendance')}>Barchasini ko‘rish →</button></div>
                <AttendanceTable rows={attendance.slice(0, 6)} role={user.role} busyId={busyId} onMark={markAttendance} />
              </section>
              <section className="content-card">
                <div className="card-heading"><div><span className="section-kicker">MARKAZ JAMOASI</span><h2>So‘nggi hisoblar</h2></div><button className="quiet-link" type="button" onClick={() => setPage('users')}>Hisoblarni boshqarish →</button></div>
                <UserList users={users.filter((person) => person.role !== 'admin').slice(0, 5)} onSave={saveUser} onReset={resetPassword} busyId={busyId} />
              </section>
            </>
          )}
          {page === 'overview' && user.role === 'teacher' && (
            <>
              <PageHeading eyebrow={todayLabel()} title={`Xush kelibsiz, ${user.name.split(' ')[0]}!`} description="Guruhingiz va o‘quvchilaringiz davomatini shu yerdan boshqaring." action={<button className="button button-primary" type="button" onClick={() => setPage('attendance')}>Davomatni belgilash <span>→</span></button>} />
              <div className="metric-grid">
                <article className="metric-card"><span className="metric-icon purple">♙</span><span className="metric-label">O‘quvchilar</span><strong>{users.filter((person) => person.role === 'student').length}</strong><small>Biriktirilgan o‘quvchilar</small></article>
                <article className="metric-card"><span className="metric-icon green">◷</span><span className="metric-label">Bugun kelgan</span><strong>{attendance.filter((person) => person.checkIn).length}</strong><small>Davomat belgilangan</small></article>
              </div>
              <section className="content-card">
                <div className="card-heading"><div><span className="section-kicker">BUGUNGI DARS</span><h2>O‘quvchilar davomati</h2></div></div>
                <AttendanceTable rows={attendance} role={user.role} busyId={busyId} onMark={markAttendance} />
              </section>
            </>
          )}
          {page === 'attendance' && user.role === 'student' && (
            <>
              <PageHeading eyebrow="Shaxsiy ma’lumot" title="Davomatim" description="O‘quv markazidagi kelish va ketish qaydlaringiz." />
              <section className="content-card"><div className="card-heading"><div><span className="section-kicker">SO‘NGGI 30 KUN</span><h2>Davomat tarixi</h2></div></div>
                <div className="table-scroll"><table><thead><tr><th>Sana</th><th>Kelgan vaqti</th><th>Ketgan vaqti</th><th>Holat</th></tr></thead><tbody>
                  {myAttendance.map((record) => <tr key={record.day}><td>{record.day}</td><td>{formatTime(record.checkIn)}</td><td>{formatTime(record.checkOut)}</td><td><span className={`role-badge ${record.checkIn ? 'teacher' : 'student'}`}>{record.checkOut ? 'Yakunlangan' : record.checkIn ? 'Keldi' : 'Belgilanmagan'}</span></td></tr>)}
                  {!myAttendance.length && <tr><td colSpan="4" className="table-empty">Hozircha davomat qaydi mavjud emas.</td></tr>}
                </tbody></table></div>
              </section>
            </>
          )}
          {page === 'attendance' && user.role !== 'student' && (
            <>
              <PageHeading
                eyebrow={todayLabel()}
                title="Davomat nazorati"
                description="O‘quvchi va o‘qituvchilarning kelish-ketish holati."
                action={<label className="date-filter">Sana<input type="date" value={attendanceDay} max={today} onChange={(event) => changeAttendanceDay(event.target.value)} /></label>}
              />
              <section className="content-card"><div className="card-heading"><div><span className="section-kicker">{attendanceDay === today ? 'BUGUNGI RO‘YXAT' : 'TANLANGAN SANA'}</span><h2>Kelish va ketish</h2></div><span className="count-pill">{attendance.filter((person) => person.checkIn).length} / {attendance.length} keldi</span></div>
                <AttendanceTable rows={attendance} role={user.role} busyId={busyId} onMark={markAttendance} editable={attendanceDay === today} />
              </section>
            </>
          )}
          {page === 'users' && user.role === 'admin' && (
            <>
              <PageHeading eyebrow="Hisoblarni boshqarish" title="Hisoblar" description="Yangi o‘quvchi yoki o‘qituvchi qo‘shing. Login avtomatik, parol esa bir martalik yaratiladi." />
              <section className="content-card"><div className="card-heading"><div><span className="section-kicker">YANGI HISOB</span><h2>O‘quvchi yoki o‘qituvchi qo‘shish</h2></div></div>
                <AccountForm onCreate={createUser} busy={busy} />
                <Credentials credentials={createdCredentials} onDismiss={() => setCreatedCredentials(null)} />
              </section>
              <section className="content-card"><div className="card-heading account-list-heading"><div><span className="section-kicker">MARKAZ HISOBLARI</span><h2>Hisoblar ro‘yxati</h2></div><input className="search-input" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ism yoki login bo‘yicha qidirish" aria-label="Hisoblarni qidirish" /></div>
                <UserList users={users.filter((person) => person.role !== 'admin' && `${person.name} ${person.username} ${person.groupName}`.toLocaleLowerCase('uz').includes(search.toLocaleLowerCase('uz')))} onSave={saveUser} onReset={resetPassword} busyId={busyId} />
              </section>
            </>
          )}
          {page === 'settings' && user.role === 'admin' && (
            <>
              <PageHeading eyebrow="Ommaviy ko‘rinish" title="Markaz sozlamalari" description="O‘quvchilar login sahifasida va ommaviy sahifalarda ko‘radigan aloqa va markaz ma’lumotlarini boshqaring." />
              <section className="content-card">
                <div className="card-heading"><div><span className="section-kicker">TASHQI MA’LUMOTLAR</span><h2>Markaz haqida</h2></div></div>
                <CenterSettingsForm settings={centerSettings} onSave={saveCenterSettings} busy={adminSettingsBusy} />
              </section>
              <section className="content-card public-preview">
                <span className="section-kicker">KO‘RINISH NAMUNASI</span>
                <h2>{centerSettings.centerName}</h2>
                <p>{centerSettings.slogan}</p>
                {centerSettings.address && <p>{centerSettings.address}</p>}
                {centerSettings.phone && <p>{centerSettings.phone}</p>}
              </section>
            </>
          )}
          {page === 'admin-settings' && user.role === 'admin' && (
            <>
              <PageHeading eyebrow="Himoyalangan sozlamalar" title="Admin sozlamalari" description="Administrator profilini, tizimga kirish loginini va parolini yangilang." />
              <section className="content-card">
                <div className="card-heading"><div><span className="section-kicker">ADMINISTRATOR HISOBI</span><h2>Login va xavfsizlik</h2></div></div>
                <AdminSettingsForm user={user} onSave={saveAdminSettings} busy={adminSettingsBusy} />
              </section>
              <section className="content-card security-note">
                <strong>Hisobingizni himoyalang</strong>
                <p>Kamida 12 belgili, boshqa saytlarda ishlatilmaydigan parol tanlang. Parolni hech kim bilan ulashmang.</p>
              </section>
            </>
          )}
          {page === 'schedule' && user.role === 'student' && (
            <>
              <PageHeading eyebrow="Haftalik reja" title="Dars jadvalim" description="Guruhingiz uchun administrator kiritgan dars kunlari va vaqtlari." />
              <section className="content-card"><div className="card-heading"><div><span className="section-kicker">{user.groupName || 'GURUH BIRIKTIRILMAGAN'}</span><h2>Haftalik darslar</h2></div></div><Schedule schedule={user.schedule || ''} /></section>
              <p className="schedule-help">Jadvalni o‘zgartirish kerak bo‘lsa, administratorga murojaat qiling.</p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
