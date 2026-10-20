import React from 'react';
import { BookOpen, CalendarCheck, Coins, CreditCard } from 'lucide-react';
import type { PortalSection } from '../types';

interface PortalPagesProps {
  section: Exclude<PortalSection, 'dashboard'>;
}

const courses = [
  { title: 'Frontend React', mentor: 'Najot Ta’lim Mentor', progress: 72, next: 'Bugun, 16:00' },
  { title: 'JavaScript Foundation', mentor: 'Azizbek Qodirov', progress: 100, next: 'Kurs yakunlangan' },
  { title: 'UI/UX dizayn asoslari', mentor: 'Madina Karimova', progress: 38, next: 'Ertaga, 14:00' },
];

const attendance = [
  { date: '07-oktabr, 2026', lesson: 'React hooks', status: 'Qatnashdi' },
  { date: '05-oktabr, 2026', lesson: 'State management', status: 'Qatnashdi' },
  { date: '02-oktabr, 2026', lesson: 'Component arxitekturasi', status: 'Sababli' },
  { date: '30-sentabr, 2026', lesson: 'React Router', status: 'Qatnashdi' },
];

const transactions = [
  { title: 'Topshiriq: React Todo App', date: '07-oktabr, 2026', amount: '+50 coin' },
  { title: 'Haftalik faollik bonusi', date: '04-oktabr, 2026', amount: '+100 coin' },
  { title: 'Market: Najot Ta’lim stikerlari', date: '01-oktabr, 2026', amount: '-200 coin' },
];

const invoices = [
  { month: 'Oktyabr 2026', due: 'To‘langan', amount: '1 500 000 so‘m' },
  { month: 'Sentabr 2026', due: 'To‘langan', amount: '1 500 000 so‘m' },
  { month: 'Avgust 2026', due: 'To‘langan', amount: '1 500 000 so‘m' },
];

const pageStyles = 'mx-auto w-full max-w-6xl space-y-6 p-4 text-white sm:p-8';
const cardStyles = 'rounded-2xl border border-zinc-800 bg-[#18181B] p-5 sm:p-6';

const PageHeading: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({
  title,
  description,
  icon,
}) => (
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
      {icon}
    </div>
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-sm text-zinc-400">{description}</p>
    </div>
  </div>
);

const CoursesPage: React.FC = () => (
  <>
    <PageHeading title="Mening kurslarim" description="Kurslaringiz va o'quv jarayoningiz." icon={<BookOpen />} />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <article key={course.title} className={cardStyles}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold">{course.title}</h2>
              <p className="mt-1 text-sm text-zinc-400">{course.mentor}</p>
            </div>
            <BookOpen className="shrink-0 text-emerald-400" size={20} />
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <span className="text-zinc-400">O'zlashtirish</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800"
            role="progressbar"
            aria-label={`${course.title} kursi o'zlashtirilishi`}
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${course.progress}%` }} />
          </div>
          <p className="mt-4 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
            Keyingi dars: <span className="text-zinc-200">{course.next}</span>
          </p>
        </article>
      ))}
    </div>
  </>
);

const AttendancePage: React.FC = () => (
  <>
    <PageHeading title="Davomat" description="Darslardagi qatnashuv holatingiz." icon={<CalendarCheck />} />
    <div className={cardStyles}>
      <div className="mb-5 flex flex-wrap gap-6">
        <div>
          <p className="text-sm text-zinc-400">Umumiy davomat</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">98%</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Qatnashilgan darslar</p>
          <p className="mt-1 text-2xl font-bold">48 / 49</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-xs uppercase text-zinc-500">
            <tr>
              <th className="border-b border-zinc-800 px-3 py-3 font-medium">Sana</th>
              <th className="border-b border-zinc-800 px-3 py-3 font-medium">Dars</th>
              <th className="border-b border-zinc-800 px-3 py-3 font-medium">Holat</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((lesson) => (
              <tr key={lesson.date} className="border-b border-zinc-800/70 last:border-0">
                <td className="px-3 py-4 text-zinc-300">{lesson.date}</td>
                <td className="px-3 py-4">{lesson.lesson}</td>
                <td className="px-3 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      lesson.status === 'Qatnashdi'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {lesson.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const RatingPage: React.FC = () => (
  <>
    <PageHeading title="Reyting va Coin" description="Faolligingiz va coin harakatlari." icon={<Coins />} />
    <div className="grid gap-4 sm:grid-cols-2">
      <div className={cardStyles}>
        <p className="text-sm text-zinc-400">Coin balansingiz</p>
        <p className="mt-2 text-3xl font-bold text-amber-400">1 250 coin</p>
        <p className="mt-2 text-sm text-zinc-500">Coinlarni o'quv marketida ishlatishingiz mumkin.</p>
      </div>
      <div className={cardStyles}>
        <p className="text-sm text-zinc-400">Guruh reytingi</p>
        <p className="mt-2 text-3xl font-bold text-emerald-400">#4</p>
        <p className="mt-2 text-sm text-zinc-500">Frontend React guruhida 18 nafar o'quvchi orasida.</p>
      </div>
    </div>
    <div className={cardStyles}>
      <h2 className="font-semibold">Coinlar tarixi</h2>
      <ul className="mt-4 divide-y divide-zinc-800">
        {transactions.map((transaction) => (
          <li key={transaction.title} className="flex flex-wrap items-center justify-between gap-2 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">{transaction.title}</p>
              <p className="mt-1 text-xs text-zinc-500">{transaction.date}</p>
            </div>
            <span className={transaction.amount.startsWith('+') ? 'text-sm font-semibold text-emerald-400' : 'text-sm font-semibold text-zinc-300'}>
              {transaction.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </>
);

const PaymentsPage: React.FC = () => (
  <>
    <PageHeading title="To'lovlar" description="O'qish to'lovlari va hisob-fakturalar." icon={<CreditCard />} />
    <div className="grid gap-4 sm:grid-cols-2">
      <div className={cardStyles}>
        <p className="text-sm text-zinc-400">Keyingi to'lov</p>
        <p className="mt-2 text-2xl font-bold">1 500 000 so'm</p>
        <p className="mt-2 text-sm text-emerald-400">Muddat: 10-noyabr, 2026</p>
      </div>
      <div className={cardStyles}>
        <p className="text-sm text-zinc-400">Hisob holati</p>
        <p className="mt-2 text-2xl font-bold text-emerald-400">Qarzdorlik yo'q</p>
        <p className="mt-2 text-sm text-zinc-500">Barcha to'lovlar o'z vaqtida amalga oshirilgan.</p>
      </div>
    </div>
    <div className={cardStyles}>
      <h2 className="font-semibold">To'lovlar tarixi</h2>
      <ul className="mt-4 divide-y divide-zinc-800">
        {invoices.map((invoice) => (
          <li key={invoice.month} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">{invoice.month}</p>
              <p className="mt-1 text-xs text-zinc-500">{invoice.due}</p>
            </div>
            <span className="text-sm font-semibold text-zinc-200">{invoice.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export const PortalPages: React.FC<PortalPagesProps> = ({ section }) => {
  const pages: Record<PortalPagesProps['section'], React.ReactNode> = {
    courses: <CoursesPage />,
    attendance: <AttendancePage />,
    rating: <RatingPage />,
    payments: <PaymentsPage />,
  };

  return <div className={pageStyles}>{pages[section]}</div>;
};
