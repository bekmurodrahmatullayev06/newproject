import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import type { PortalSection } from '../../types';

interface HeaderProps {
  activeTab: PortalSection;
}

const sectionTitles: Record<PortalSection, string> = {
  dashboard: 'Bosh sahifa',
  courses: 'Mening kurslarim',
  attendance: 'Davomat',
  rating: 'Reyting va Coin',
  payments: "To'lovlar",
};

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="flex min-h-[4rem] items-center justify-between gap-4 border-b border-zinc-800 bg-[#18181B] px-4 py-3 text-white sm:px-8">
      <div className="flex min-w-0 items-center gap-2 text-sm text-zinc-400">
        <span className="hidden sm:inline">O'quvchi kabineti</span>
        <span className="hidden sm:inline">/</span>
        <span className="truncate font-medium text-white">{sectionTitles[activeTab]}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            type="button"
            aria-label={notificationsOpen ? 'Bildirishnomalarni yopish' : 'Bildirishnomalarni ochish'}
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((open) => !open)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 hover:bg-zinc-800"
          >
            {notificationsOpen ? <X size={18} /> : <Bell size={18} />}
          </button>
          {notificationsOpen && (
            <div
              role="status"
              className="absolute right-0 top-12 z-10 w-72 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-xl"
            >
              <p className="font-semibold text-white">Bildirishnomalar</p>
              <p className="mt-2 text-sm text-zinc-400">
                Bugungi React darsi soat 16:00 da boshlanadi.
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-bold text-black">
            BR
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Bekmurod Rahmatullayev</p>
            <p className="text-xs text-zinc-400">Frontend Dasturchi</p>
          </div>
        </div>
      </div>
    </header>
  );
};
