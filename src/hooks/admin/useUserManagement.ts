
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserWithRoles } from '@/components/admin/users/UserList';

interface AddAdminData {
  email: string;
}

export const useUserManagement = () => {
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch all users with roles
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // Fetch users from database directly instead of using admin API
      const { data: dbUsers, error: usersError } = await supabase
        .from('users')
        .select('id, email');

      if (usersError) {
        throw usersError;
      }
      
      if (!dbUsers || dbUsers.length === 0) {
        return [];
      }
      
      // Fetch role information for each user
      const usersWithRoles: UserWithRoles[] = await Promise.all(
        dbUsers.map(async (user) => {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          
          return {
            id: user.id,
            email: user.email || 'sem email',
            roles: roles?.map(r => r.role) || ['customer'],
          };
        })
      );
      
      return usersWithRoles;
    }
  });
  
  // Mutation to add admin role to user
  const addAdminMutation = useMutation({
    mutationFn: async (data: AddAdminData) => {
      const { email } = data;
      
      // First, find the user by email
      const { data: userList, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .single();
      
      if (userError || !userList) {
        throw new Error('Usuário não encontrado');
      }
      
      // Check if user already has admin role
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userList.id)
        .eq('role', 'admin');
      
      if (existingRole && existingRole.length > 0) {
        throw new Error('Usuário já possui permissão de administrador');
      }
      
      // Add admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userList.id,
          role: 'admin'
        });
        
      if (error) throw error;
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Permissão de administrador adicionada com sucesso');
      setIsAddAdminOpen(false);
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error: Error) => {
      toast.error(`Erro ao adicionar administrador: ${error.message}`);
    }
  });
  
  // Mutation to remove admin role from user
  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');
        
      if (error) throw error;
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Permissão de administrador removida com sucesso');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao remover administrador: ${error.message}`);
    }
  });
  
  const handleAddAdmin = (data: AddAdminData) => {
    addAdminMutation.mutate(data);
  };
  
  const handleRemoveAdmin = (userId: string) => {
    if (confirm('Tem certeza que deseja remover as permissões de administrador deste usuário?')) {
      removeAdminMutation.mutate(userId);
    }
  };

  return {
    users,
    isLoading,
    error,
    isAddAdminOpen,
    setIsAddAdminOpen,
    handleAddAdmin,
    handleRemoveAdmin,
    isAddingAdmin: addAdminMutation.isPending,
    isRemovingAdmin: removeAdminMutation.isPending
  };
};
