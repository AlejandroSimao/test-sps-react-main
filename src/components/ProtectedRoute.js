import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Este componente protege rotas que requerem autenticação.
export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  return token ? children : <Navigate to="/signin" />;
}
