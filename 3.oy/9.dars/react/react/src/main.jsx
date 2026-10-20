import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Najottalim from './NajotTalim.jsx';
import AdminPanel from './AdminPanel.jsx';
import StudentPanel from './StudentPanel.jsx';
import ErrorBoundry from './ErrorBoundry.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/najot-talim',
    element: <Najottalim />,
    errorElement: <ErrorBoundry/>,

    children: [
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        )
      },
      {
        path: "student",
        element: <StudentPanel />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
