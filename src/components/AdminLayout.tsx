
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const AdminLayout = () => {
  const { user, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  // Check if the user is authenticated
  if (!user) {
    toast.error("Você precisa estar logado para acessar esta área");
    return <Navigate to="/auth" replace />;
  }

  // Check if user has admin role
  if (!hasRole('admin')) {
    toast.error("Você não tem permissão para acessar esta área");
    return <Navigate to="/" replace />;
  }
  
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
