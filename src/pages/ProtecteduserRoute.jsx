import { Navigate } from 'react-router-dom';

export default function ProtectedUserRoute({ children }) {
  const user = localStorage.getItem("userloggedIn");

  return user ? children : <Navigate to="/login" />;
}
