const adminStats = [
  { label: "Jami talabalar", value: "1,248", change: "+12%", up: true },
  { label: "Faol kurslar", value: "48", change: "+3", up: true },
  { label: "Bu oy daromad", value: "$24,800", change: "+8%", up: true },
  { label: "Chiqib ketganlar", value: "32", change: "+5%", up: false },
];

const recentUsers = [
  { name: "Abdulloh Karimov", course: "React.js", date: "Bugun, 10:24", status: "Faol" },
  { name: "Dilnoza Yusupova", course: "UI/UX Design", date: "Bugun, 09:11", status: "Faol" },
  { name: "Jasur Toshmatov", course: "Node.js", date: "Kecha, 18:45", status: "To'xtatilgan" },
  { name: "Malika Nazarova", course: "Python", date: "Kecha, 14:30", status: "Faol" },
  { name: "Sherzod Botirov", course: "Flutter", date: "2 kun oldin", status: "Faol" },
];

function AdminPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin boshqaruvi</h1>
          <p className="text-white/40 text-sm mt-1">Platforma statistikasi va boshqaruv</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
          + Yangi kurs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs mb-2">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <span
              className={`text-xs font-medium mt-1 inline-block ${s.up ? "text-emerald-400" : "text-red-400"
                }`}
            >
              {s.up ? "↑" : "↓"} {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">So'nggi ro'yxatdan o'tganlar</h2>
          <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
            Barchasini ko'rish →
          </button>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-white/40 font-medium">Ism</th>
                <th className="text-left px-4 py-3 text-white/40 font-medium">Kurs</th>
                <th className="text-left px-4 py-3 text-white/40 font-medium hidden md:table-cell">Sana</th>
                <th className="text-left px-4 py-3 text-white/40 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentUsers.map((user) => (

                <tr key={user.name} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-white/50">{user.course}</td>
                  <td className="px-4 py-3 text-white/30 hidden md:table-cell">{user.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${user.status === "Faol"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                        }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Tezkor amallar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Talaba qo'shish", icon: "👤" },
            { label: "Kurs yaratish", icon: "📚" },
            { label: "Hisobot", icon: "📊" },
            { label: "Sozlamalar", icon: "⚙️" },
          ].map((action) => (
            <button
              key={action.label}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-white/60 text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
