
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, BarChart2, BadgePercent, Truck, Settings, Users } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const AdminControls = () => {
  const { hasRole } = useAuth();
  
  if (!hasRole('admin')) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20 transition-colors">
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Admin
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Painel Administrativo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/admin" className="flex items-center cursor-pointer w-full">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/products" className="flex items-center cursor-pointer w-full">
              <Package className="h-4 w-4 mr-2" />
              Produtos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/categories" className="flex items-center cursor-pointer w-full">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Categorias
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/orders" className="flex items-center cursor-pointer w-full">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Pedidos
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/reports" className="flex items-center cursor-pointer w-full">
              <BarChart2 className="h-4 w-4 mr-2" />
              Relatórios
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/promotions" className="flex items-center cursor-pointer w-full">
              <BadgePercent className="h-4 w-4 mr-2" />
              Promoções
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/shipping" className="flex items-center cursor-pointer w-full">
              <Truck className="h-4 w-4 mr-2" />
              Frete
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/users" className="flex items-center cursor-pointer w-full">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/settings" className="flex items-center cursor-pointer w-full">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminControls;
