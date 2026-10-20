const courses = [
  { name: "React.js Asoslari", progress: 72, lessons: 24, done: 17, color: "bg-blue-500" },
  { name: "JavaScript ES6+", progress: 100, lessons: 18, done: 18, color: "bg-emerald-500" },
  { name: "Node.js Backend", progress: 35, lessons: 30, done: 10, color: "bg-purple-500" },
];

const activities = [
  { text: "JavaScript ES6+ kursini yakunladingiz", time: "2 soat oldin", icon: "🏆" },
  { text: "React Hooks darsini tugatdingiz", time: "Kecha", icon: "✅" },
  { text: "Node.js 3-darsga qatnashdingiz", time: "2 kun oldin", icon: "📖" },
];

function StudentPanel() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-1">Xush kelibsiz! 👋</h1>
        <p className="text-white/50 text-sm">Bugun ham o'rganishni davom eting. Maqsadingizga yaqinlashyapsiz!</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Faol kurslar", value: "3", icon: "📚" },
          { label: "Tugallangan", value: "1", icon: "✅" },
          { label: "Streak", value: "14 kun", icon: "🔥" },
        ].map((item) => (
          <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="text-xl font-bold">{item.value}</p>
            <p className="text-white/40 text-xs mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mening kurslarim</h2>
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.name} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">{course.name}</h3>
                <span className="text-white/40 text-xs">{course.done}/{course.lessons} dars</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${course.color} rounded-full transition-all`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/30 text-xs">{course.progress}% tugallangan</span>
                {course.progress === 100 && (
                  <span className="text-emerald-400 text-xs font-medium">Yakunlandi ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">So'nggi faollik</h2>
        <div className="bg-white/5 border border-white/10 rounded-xl divide-y divide-white/5">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-base shrink-0">
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 truncate">{a.text}</p>
                <p className="text-xs text-white/30 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentPanel;
