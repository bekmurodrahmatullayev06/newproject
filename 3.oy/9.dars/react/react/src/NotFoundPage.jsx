import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold mb-3">Sahifa topilmadi</h1>
        <p className="text-white/40 mb-8">
          Siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-xl font-semibold"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
