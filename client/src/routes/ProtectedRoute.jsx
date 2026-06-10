import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";
export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}
