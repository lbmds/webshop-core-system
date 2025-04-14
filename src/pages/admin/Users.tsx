
import React from 'react';
import { useQueryClient } from '@tanstack/react-query'; 
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import UserList from '@/components/admin/users/UserList';
import AddAdminDialog from '@/components/admin/users/AddAdminDialog';
import InitialAdminSetup from '@/components/admin/users/InitialAdminSetup';
import { useUserManagement } from '@/hooks/admin/useUserManagement';

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const {
    users,
    isLoading,
    error,
    isAddAdminOpen,
    setIsAddAdminOpen,
    handleAddAdmin,
    handleRemoveAdmin,
    isAddingAdmin,
    isRemovingAdmin
  } = useUserManagement();
  
  // Set up initial admin user (specified by email)
  const specificEmail = "legol24854@insfou.com";
  
  return (
    <div className="p-4">
      {/* Hidden component that sets up the initial admin */}
      <InitialAdminSetup 
        queryClient={queryClient}
        specificEmail={specificEmail}
      />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários e administradores do sistema.</p>
        </div>
        
        <AddAdminDialog 
          isOpen={isAddAdminOpen}
          setIsOpen={setIsAddAdminOpen}
          onSubmit={handleAddAdmin}
          isSubmitting={isAddingAdmin}
        />
      </div>
      
      <UserList 
        users={users}
        isLoading={isLoading}
        error={error as Error | null}
        onRemoveAdmin={handleRemoveAdmin}
        isRemovingAdmin={isRemovingAdmin}
      />
    </div>
  );
};

export default AdminUsers;
