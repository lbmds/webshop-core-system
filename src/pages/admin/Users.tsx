
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User as UserIcon, UserPlus, Shield, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Define the user structure that we'll use
type UserWithRoles = {
  id: string;
  email: string;
  roles: string[];
}

// Form schema for adding admin user
const addAdminFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

const AdminUsers = () => {
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const queryClient = useQueryClient();
  
  // Fetch all users with roles
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // Fetch users from Supabase Auth
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        throw authError; // Just throw the error directly, don't try to construct it
      }
      
      // Fetch role information for each user
      const usersWithRoles: UserWithRoles[] = await Promise.all(
        authUsers.users.map(async (user) => {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          
          return {
            id: user.id,
            email: user.email || 'sem email',
            roles: roles?.map(r => r.role) || [],
          };
        })
      );
      
      return usersWithRoles;
    }
  });
  
  // Form for adding admin user
  const addAdminForm = useForm<z.infer<typeof addAdminFormSchema>>({
    resolver: zodResolver(addAdminFormSchema),
    defaultValues: {
      email: "",
    },
  });
  
  // Mutation to add admin role to user
  const addAdminMutation = useMutation({
    mutationFn: async (data: z.infer<typeof addAdminFormSchema>) => {
      const { email } = data;
      
      // First search if user exists - fix the invalid filters property
      const { data: userList } = await supabase.auth.admin.listUsers({
        // Remove the filters object and use a different approach
        // that's compatible with the API
        page: 1,
        perPage: 100
      });
      
      // Find the user by email manually in code
      const user = userList?.users.find(user => user.email === email);
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Check if user already has admin role
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();
      
      if (existingRole) {
        throw new Error('Usuário já possui permissão de administrador');
      }
      
      // Add admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'admin'
        });
        
      if (error) throw error;
      
      return { user, success: true };
    },
    onSuccess: () => {
      toast.success('Permissão de administrador adicionada com sucesso');
      setIsAddAdminOpen(false);
      addAdminForm.reset();
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
  
  const onSubmitAddAdmin = (data: z.infer<typeof addAdminFormSchema>) => {
    addAdminMutation.mutate(data);
  };
  
  const handleRemoveAdmin = (userId: string) => {
    if (confirm('Tem certeza que deseja remover as permissões de administrador deste usuário?')) {
      removeAdminMutation.mutate(userId);
    }
  };
  
  if (isLoading) return <div className="p-4">Carregando usuários...</div>;
  if (error) return <div className="p-4 text-red-500">Erro ao carregar usuários: {(error as Error).message}</div>;
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>
          <p className="text-muted-foreground">Gerencie os usuários e administradores do sistema.</p>
        </div>
        
        <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Shield className="mr-2 h-4 w-4" />
              Adicionar Administrador
            </Button>
          </DialogTrigger>
          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Administrador</DialogTitle>
              <DialogDescription>
                Adicione permissões de administrador a um usuário existente.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...addAdminForm}>
              <form onSubmit={addAdminForm.handleSubmit(onSubmitAddAdmin)} className="space-y-4">
                <FormField
                  control={addAdminForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email do Usuário</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@exemplo.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddAdminOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    disabled={addAdminMutation.isPending}
                  >
                    {addAdminMutation.isPending ? "Adicionando..." : "Adicionar Administrador"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Funções</TableHead>
              <TableHead className="w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.roles.map((role) => (
                        <Badge key={role} variant={role === 'admin' ? 'default' : 'outline'}>
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.roles.includes('admin') && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveAdmin(user.id)}
                        disabled={removeAdminMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remover admin</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
