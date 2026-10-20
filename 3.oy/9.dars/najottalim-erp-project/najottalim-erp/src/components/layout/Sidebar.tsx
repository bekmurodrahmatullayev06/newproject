import React from 'react';
import type { PortalSection } from '../../types';

interface SidebarProps {
  activeTab: PortalSection;
  setActiveTab: (tab: PortalSection) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems: { id: PortalSection; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Bosh sahifa', icon: '🏠' },
    { id: 'courses', label: 'Mening kurslarim', icon: '📚' },
    { id: 'attendance', label: 'Davomat', icon: '📅' },
    { id: 'rating', label: 'Reyting va Coin', icon: '🪙' },
    { id: 'payments', label: "To'lovlar", icon: '💳' },
  ];

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-zinc-800 bg-[#18181B] text-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-4 py-4 lg:p-6">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black">
          NT
        </div>
        <span className="font-bold text-lg text-emerald-400">Najot Ta'lim</span>
      </div>

      <nav aria-label="Asosiy menyu" className="flex gap-2 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-4 lg:pb-0">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all lg:w-full ${
              activeTab === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="hidden border-t border-zinc-800 p-4 lg:block">
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Balans</p>
            <p className="text-sm font-bold text-emerald-400">1,250 Coins 🪙</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
