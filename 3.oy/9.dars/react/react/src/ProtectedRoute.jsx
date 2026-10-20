import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAdmin = true;

  if (isAdmin) {
    return children;
  }

  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-center max-w-sm bg-white/5 border border-red-500/20 rounded-2xl p-8">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl mx-auto mb-4">
          🔒
        </div>
        <h2 className="text-xl font-bold mb-2">Kirish taqiqlangan</h2>
        <p className="text-white/40 text-sm mb-6">
          Bu sahifaga faqat adminlar kira oladi. Siz admin huquqiga ega emassiz.
        </p>
        <Link
          to="/najot-talim/student"
          className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2.5 rounded-xl text-sm font-medium"
        >
          Talaba paneliga o'tish
        </Link>
      </div>
    </div>
  );
}

export default ProtectedRoute;
