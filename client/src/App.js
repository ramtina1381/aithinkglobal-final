import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';

import Contact from './pages/Contact/Contact';
import AuthenticationPage from './pages/AuthenticationPage';
import RootLayout from './pages/Root';
import Profile from './components/Profile';
import CareersPage from './pages/Careers/Careers';
import Position from './pages/Careers/Position';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import { AuthProvider } from './context/ContextProvider.jsx';
import RoleRedirect from './context/RoleRedirect.jsx';
import AdminLayout from './pages/Admin/Layout.jsx';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import AdminHomePage from './pages/Admin/HomePage.jsx';
import AdminContact from './pages/Admin/Contact.jsx';
import AdminCareers from './pages/Admin/Careers.jsx';
import UserLayout from './pages/User/Layout.jsx';
import UserDashboard from './pages/User/Dashboard.jsx';
import UserHomePage from './pages/User/HomePage.jsx';
import UserContact from './pages/User/Contact.jsx';
import UserCareers from './pages/User/Careers.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'contact', element: <Contact /> },
      { path: 'auth', element: <AuthenticationPage />},
      { path: 'profile', element: <Profile />},
      { path: 'careers', element: <CareersPage />},
      { path: 'careers/:slug', element: <Position /> },
      { path: 'dashboard', element: <RoleRedirect /> },
      // User area
      {
        path: 'user',
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
          { 
            path: '',
            element: <UserLayout />,
            children: [
              { index: true, element: <UserDashboard /> },
              { path: 'homepage', element: <UserHomePage /> },
              { path: 'contact', element: <UserContact /> },
              { path: 'careers', element: <UserCareers /> },
              { path: 'profile', element: <Profile /> }
            ]
          }
        ]
      },
      // Admin area
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          { 
            path: '',
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: 'homepage', element: <AdminHomePage /> },
              { path: 'contact', element: <AdminContact /> },
              { path: 'careers', element: <AdminCareers /> }
            ]
          }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
