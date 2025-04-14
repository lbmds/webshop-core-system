
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  // Verificar se o usuário está autenticado
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Idealmente, verificaria também se o usuário tem papel de admin
  
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="container py-6 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
