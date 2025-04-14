
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectToAdmin?: boolean;
}

const ProtectedRoute = ({ children, requiredRole, redirectToAdmin = false }: ProtectedRouteProps) => {
  const { user, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You could show a loading spinner here
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!user) {
    // Redirect to login page if user is not authenticated
    toast.error("Você precisa estar logado para acessar esta página");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check for required role if specified
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect to homepage if user doesn't have the required role
    toast.error("Você não tem permissão para acessar esta página");
    return <Navigate to="/" replace />;
  }
  
  // If user is admin and redirectToAdmin is true, redirect to admin dashboard
  if (redirectToAdmin && hasRole('admin')) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
