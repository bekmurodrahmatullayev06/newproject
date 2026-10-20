import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const routing = [
  { path: "/najot-talim/student", text: "Talaba paneli", icon: "🎓" },
  { path: "/najot-talim/admin", text: "Admin paneli", icon: "⚙️" },
];

function Najottalim() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className="font-bold text-lg tracking-tight">Najot Ta'lim</span>
            </Link>
            <span className="text-white/20 text-xl">/</span>
            <span className="text-white/50 text-sm">
              {location.pathname.includes("admin") ? "Admin paneli" : "Talaba paneli"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-6 py-8 gap-6">
        {/* Sidebar */}
        <aside className="w-56 shrink-0">
          <nav className="flex flex-col gap-1">
            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest px-3 mb-2">
              Navigatsiya
            </p>
            {routing.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <button
                  key={route.path}
                  onClick={() => handleNavigate(route.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <span>{route.icon}</span>
                  {route.text}
                </button>
              );
            })}

            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                to="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/8 transition-all"
              >
                <span>🏠</span>
                Bosh sahifa
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Najottalim;
