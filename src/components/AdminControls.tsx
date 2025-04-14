
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const AdminControls = () => {
  const { hasRole } = useAuth();
  
  if (!hasRole('admin')) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/10">
          <Settings className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/admin" className="flex items-center cursor-pointer">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Painel Administrativo
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin/products" className="flex items-center cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Gerenciar Produtos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin/orders" className="flex items-center cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Gerenciar Pedidos
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminControls;
