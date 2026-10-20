import { Link } from "react-router-dom";

const stats = [
  { label: "Talabalar", value: "12,400+", color: "from-blue-500 to-blue-700", icon: "🎓" },
  { label: "Kurslar", value: "48", color: "from-purple-500 to-purple-700", icon: "📚" },
  { label: "O'qituvchilar", value: "120+", color: "from-emerald-500 to-emerald-700", icon: "👨‍🏫" },
  { label: "Bitiruvchilar", value: "8,300+", color: "from-amber-500 to-amber-700", icon: "🏆" },
];

const courses = [
  { name: "Frontend Development", tech: "React · Vue · Angular", students: 3200, level: "Boshlang'ich" },
  { name: "Backend Development", tech: "Node.js · Python · Java", students: 2800, level: "O'rta" },
  { name: "Mobile Development", tech: "Flutter · React Native", students: 1900, level: "O'rta" },
  { name: "UI/UX Design", tech: "Figma · Adobe XD", students: 1500, level: "Boshlang'ich" },
  { name: "Data Science", tech: "Python · TensorFlow", students: 1200, level: "Yuqori" },
  { name: "DevOps", tech: "Docker · Kubernetes · CI/CD", students: 800, level: "Yuqori" },
];

function App() {
  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-[45deg] from-blue-500 to-green-600 flex items-center justify-center font-bold text-sm">
              N
            </div>
            <span className="font-bold text-lg tracking-tight">Najot Ta'lim</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Kurslar</a>
            <a href="#" className="hover:text-white transition-colors">O'qituvchilar</a>
            <a href="#" className="hover:text-white transition-colors">Haqida</a>
          </div>
          <Link
            to="/najot-talim/student"
            className="bg-blue-600 hover:bg-red-500 transition-all duration-800 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Platformaga kirish
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-blue-500/20">
          #1 IT Ta'lim Markazi — O'zbekiston
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Kelajagingizni <br />
          <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            kod bilan quring
          </span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
          Najot Ta'limda zamonaviy IT bilimlarini o'rganing va professional dasturchiga aylaning.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/najot-talim/student"
            className="bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-xl font-semibold"
          >
            Hoziroq boshlash
          </Link>
          <Link
            to="/najot-talim/admin"
            className="border border-white/15 hover:border-white/30 transition-colors px-6 py-3 rounded-xl font-semibold text-white/70 hover:text-white"
          >
            Admin panel
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center text-xl mb-4`}
              >
                {s.icon}
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </div>

          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Mashhur kurslar</h2>
          <a href="#" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
            Barchasini ko'rish →
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
         
          {courses.map((course) => (
            <div
              key={course.name}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold group-hover:text-blue-400 transition-colors">
                  {course.name}
                </h3>
                <span className="text-xs bg-white/10 text-white/50 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                  {course.level}
                </span>
              </div>
              <p className="text-white/40 text-sm mb-4">{course.tech}</p>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <span>👤</span>
                <span>{course.students.toLocaleString()} talaba</span>
              </div>
            </div>

          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <span>© 2026 Najot Ta'lim. Barcha huquqlar himoyalangan.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Shartlar</a>
            <a href="#" className="hover:text-white/60 transition-colors">Maxfiylik</a>
            <a href="#" className="hover:text-white/60 transition-colors">Aloqa</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
