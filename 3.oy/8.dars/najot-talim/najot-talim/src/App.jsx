import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import NajotTalim from './pages/NajotTalim';
import Guruhlar from './pages/Guruhlar';
import FullStackSN2 from './pages/FullStackSN2';
import FullStackSN3 from './pages/FullStackSN3';
import FullStackSN4 from './pages/FullStackSN4';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/najot-talim'} />,
  },
  {
    path: '/najot-talim',
    element: <NajotTalim />,
    children: [
      {
        index: true,
        element: <Navigate to="/najot-talim/guruhlar" replace />,
      },
   
      {
        path: '/najot-talim/kurslar',
        element: <h1>Kurslar</h1>,
      },

      {
        path: '/najot-talim/guruhlar',
        children: [
          {
            index: true,
            element: <Guruhlar />,
          },
          {
            path: 'fullstack-sn2',
            element: <FullStackSN2 />,
          },
          {
            path: 'fullstack-sn3',
            element: <FullStackSN3 />,
          },
          {
            path: 'fullstack-sn4',
            element: <FullStackSN4 />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
