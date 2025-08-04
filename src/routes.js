import { createBrowserRouter, Navigate } from 'react-router-dom';

import Users from './pages/Users';

import SignIn from './pages/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import UserEdit from './pages/UserEdit';
import UserRegister from './pages/UserRegister';
// Este arquivo define as rotas da aplicação usando o React Router.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:userId',
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/new',
    element: (
      <ProtectedRoute>
        <UserRegister />
      </ProtectedRoute>
    ),
  },
]);

export default router;
