# FUTURE STEP

FUTURE STEP o‘quv markazi uchun o‘quvchi, o‘qituvchi va administrator kabinetlari.

## Talablar

- Node.js 22.13 yoki undan yangi versiya (`node:sqlite` ishlatiladi).
- npm.

## Lokal ishga tushirish

Loyiha papkasida ikkita terminal oching:

```powershell
npm run dev:server
```

```powershell
npm run dev
```

Brauzerda Vite ko‘rsatgan manzilni oching. Birinchi marta kirganda
administratorning ismi, logini va kamida 12 belgili parolini yarating. Keyingi
foydalanuvchilarni administrator kabinetdagi **Hisoblar** bo‘limidan qo‘shadi.

O‘quvchi va o‘qituvchi loginlari ism-familiyadan avtomatik yaratiladi. Har bir
yangi hisob uchun vaqtinchalik parol faqat yaratilgan zahoti ko‘rsatiladi.
Hisob egasiga parolni xavfsiz yetkazing.

Administrator kabinetidagi **Markaz sozlamalari** orqali ommaga ko‘rinadigan
nom, shior, telefon, manzil, Telegram/Instagram, tavsif va kurslarni tahrirlash
mumkin. **Admin sozlamalari** bo‘limida administrator ismi, login va paroli
yangilanadi; buning uchun joriy parolni qayta kiritish talab etiladi.

## Render’da joylashtirish

Loyiha ildizidagi `render.yaml` Render Blueprint orqali Node web service va
doimiy PostgreSQL bazasini yaratadi. Render hisobida **New + → Blueprint** ni
tanlab GitHub repozitoriyani ulang. Blueprint `starter` web service va
`basic-256mb` PostgreSQL rejasini tanlaydi; bu pullik xizmatlarni yaratishdan
oldin Render’ning amaldagi narxlarini tekshiring.

Render GitHub’dan build qilib `npm start` ishga tushiradi. HTTPS tekshiruvida
Render’ning `X-Forwarded-Proto` headeridan foydalanadi.
`FUTURE_STEP_RENDER_PROXY=true` faqat Render uchun; boshqa hostingda
ishlatmang.

Deploy tugagach, Render service domenini ochib, ilk administrator hisobini
yarating. Forma Render → Environment bo‘limidagi `FUTURE_STEP_SETUP_KEY`
qiymatini so‘raydi. Admin yaratilgandan keyin bu qiymatni Environment’dan
o‘chirib, redeploy qiling. Maxfiy qiymatni chat, Git yoki ommaviy joyda
ulashmang.

Lokal SQLite ma’lumotlarini Render PostgreSQL’ga bir marta ko‘chirish uchun
avval web service’ni vaqtincha to‘xtating, so‘ng lokal SQLite fayli mavjud
loyiha papkasidan migratsiya skriptini ishga tushiring:

```powershell
$env:DATABASE_URL = "Render PostgreSQL external connection string"
npm run migrate:postgres
Remove-Item Env:DATABASE_URL
```

`DATABASE_URL` parolni o‘z ichiga olishi mumkin; uni terminal tarixi,
screenshot yoki chatda qoldirmang. Maqsad PostgreSQL’da foydalanuvchi,
sessiya, davomat yoki login urinishlari bo‘lsa, migratsiya to‘xtaydi va mavjud
ma’lumotlar ustiga yozmaydi. Foydalanuvchilar, parol xeshlari, davomat va
markaz sozlamalari saqlanadi. Xavfsizlik sabab sessiya tokenlari ko‘chmaydi,
foydalanuvchilar qayta kiradi. Avval PostgreSQL backup oling; migratsiya
tugagach web service’ni qayta ishga tushiring. `DATABASE_POOL_MAX` qiymatini
barcha web instance’lar bo‘yicha jamlab, database ulanish limitidan past
saqlang.

Blueprint domen sotib olmaydi va Google indeksatsiyasini kafolatlamaydi.
Render’ning `onrender.com` domenidan foydalanib boshlash mumkin; o‘z domeningizni
ulash, Search Console’da ro‘yxatdan o‘tish hamda sitemap/robots sozlash kerak.
Sayt `PUBLIC_SITE_URL` qiymatidan `robots.txt` va `sitemap.xml` yaratadi. Render
domeni boshqacha bo‘lsa, bu environment qiymatini haqiqiy HTTPS manzilga
o‘zgartiring. O‘z domeningizni ulaganda `index.html` ichidagi dastlabki
canonical va Open Graph URL’larini ham shu domenga moslab, qayta deploy qiling.

Indekslanishni tezlatish uchun deploy va domen/HTTPS’ni tekshirgach, Google
Search Console’da domen egaligini tasdiqlang, `https://<sayt-domeni>/sitemap.xml`
manzilini **Sitemaps** bo‘limida yuboring va **URL Inspection → Request
indexing** ni bosing. Markaz sozlamalarida aniq nom, manzil, telefon, kurslar
va qisqa tavsifni to‘ldiring. Google qidiruvda qachon chiqishini yoki doim
birinchi o‘rinda turishini kafolatlamaydi.

## Production xavfsizligi va yuklama

Lokal ishlab chiqishda SQLite, production’da `DATABASE_URL` orqali PostgreSQL
ishlatiladi. `DATABASE_URL` belgilanmagan production server xavfsiz tarzda
ishga tushmaydi. Render’dan boshqa hostingda `FUTURE_STEP_HTTPS_KEY_FILE` va
`FUTURE_STEP_HTTPS_CERT_FILE` orqali TLS sertifikati yoki
`FUTURE_STEP_TRUSTED_PROXY_SECRET` bilan himoyalangan HTTPS reverse proxy
talab qilinadi. Proxy tashqi mijoz yuborgan sarlavhalarni almashtirib,
upstream so‘rovlariga `X-Future-Step-Proxy-Secret` va
`X-Forwarded-Proto: https` qo‘shishi kerak. Backend portini internetga ochmang;
backup va database ulanishini hostingda himoyalang.

Parollar bazada PBKDF2-SHA256 xesh ko‘rinishida saqlanadi; sessiya cookie
`HttpOnly`, production’da `Secure`, `SameSite=Strict` xususiyatlariga ega.
Login urinishlari PostgreSQL’da saqlanadi, shu sabab rate limit bir nechta web
instance o‘rtasida umumiy.

Render sozlamasida `UV_THREADPOOL_SIZE=8` o‘rnatilgan. `starter`/`basic-256mb`
boshlang‘ich deployment uchun, minglab bir vaqtdagi foydalanuvchiga kafolat
emas. Yuklamani oshirishdan oldin haqiqiy hostingda yuklama testi, backup’dan
tiklash sinovi, monitoring, instance va database imkoniyatlarini tekshiring.
