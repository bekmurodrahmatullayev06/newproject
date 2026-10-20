import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] space-y-6 bg-[#09090B] p-4 text-white sm:p-8">
      {/* Salomlashuv paneli */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/30 to-zinc-900 p-6">
        <h1 className="text-2xl font-bold text-emerald-400">Xush kelibsiz, Bekmurod! 👋</h1>
        <p className="text-zinc-400 mt-1">Bugun sizda 16:00 da Frontend React guruhida darsingiz bor.</p>
      </div>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div className="bg-[#18181B] p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">O'rtacha ball</p>
          <p className="text-3xl font-bold text-white mt-2">94.5%</p>
          <span className="text-xs text-emerald-400 font-medium">A'lo darajada</span>
        </div>
        <div className="bg-[#18181B] p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Davomat ko'rsatkichi</p>
          <p className="text-3xl font-bold text-white mt-2">98%</p>
          <span className="text-xs text-emerald-400 font-medium">1 ta qoldirilgan dars</span>
        </div>
        <div className="bg-[#18181B] p-6 rounded-2xl border border-zinc-800">
          <p className="text-zinc-400 text-sm">Coinlar soni</p>
          <p className="text-3xl font-bold text-amber-400 mt-2">1,250 🪙</p>
          <span className="text-xs text-zinc-400">Market uchun mavjud</span>
        </div>
      </div>

      {/* Dars jadvali */}
      <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-6">
        <h2 className="text-lg font-bold mb-4">Navbatdagi darslar</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-zinc-900/80 rounded-xl border border-zinc-800">
            <div>
              <p className="font-semibold text-white">React Component Architecture</p>
              <p className="text-xs text-zinc-400">Xona: #4-Lab | O'qituvchi: Najot Ta'lim Mentor</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
              Bugun 16:00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
