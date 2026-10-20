import {Navigate} from 'react-router-dom';

function ProtectedRoute({children}) {
    let isAthod = true; // bu yerda siz autentifikatsiya tekshiruvini amalga oshirishingiz mumkin

    if (!isAthod) {
        return children;
    }

    return <Navigate to="/login"  />;

}

export default ProtectedRoute;