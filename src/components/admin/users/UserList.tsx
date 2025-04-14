
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from "@/components/ui/badge";
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

// Define the user structure
export type UserWithRoles = {
  id: string;
  email: string;
  roles: string[];
}

interface UserListProps {
  users: UserWithRoles[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onRemoveAdmin: (userId: string) => void;
  isRemovingAdmin: boolean;
}

const UserList = ({ users, isLoading, error, onRemoveAdmin, isRemovingAdmin }: UserListProps) => {
  if (isLoading) return <div className="p-4">Carregando usuários...</div>;
  if (error) return <div className="p-4 text-red-500">Erro ao carregar usuários: {error.message}</div>;

  return (
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
                      onClick={() => onRemoveAdmin(user.id)}
                      disabled={isRemovingAdmin}
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
  );
};

export default UserList;
