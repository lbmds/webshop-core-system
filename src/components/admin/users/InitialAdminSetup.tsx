
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UseQueryClient } from '@tanstack/react-query';

interface InitialAdminSetupProps {
  queryClient: UseQueryClient;
  specificEmail: string;
}

const InitialAdminSetup = ({ queryClient, specificEmail }: InitialAdminSetupProps) => {
  // Set initial state - immediately add the specified email
  useEffect(() => {
    const addSpecifiedAdmin = async () => {
      try {
        // First, find the user by email
        const { data: userList, error: userError } = await supabase
          .from('users')
          .select('id, email')
          .eq('email', specificEmail);
        
        if (userError) {
          console.error('Error finding user:', userError.message);
          return;
        }
        
        if (!userList || userList.length === 0) {
          console.log('User not found, will be added when they sign up');
          toast.info('O usuário será adicionado como admin quando se cadastrar.');
          return;
        }
        
        const userId = userList[0].id;
        
        // Check if user already has admin role
        const { data: existingRole } = await supabase
          .from('user_roles')
          .select('*')
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (existingRole && existingRole.length > 0) {
          console.log('User is already an admin');
          toast.info('Este usuário já é um administrador.');
          return;
        }
        
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'admin'
          });
          
        if (error) {
          console.error('Error adding admin role:', error.message);
          toast.error('Erro ao adicionar permissão de administrador');
          return;
        }
        
        toast.success('Permissão de administrador adicionada com sucesso');
        queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      } catch (error: any) {
        console.error('Error in adding specified admin:', error.message);
      }
    };
    
    addSpecifiedAdmin();
  }, [queryClient, specificEmail]);

  return null; // This component doesn't render anything
};

export default InitialAdminSetup;
