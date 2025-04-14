
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You could show a loading spinner here
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check for required role if specified
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to homepage if user doesn't have the required role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
