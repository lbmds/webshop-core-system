
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BadgePercent, 
  BarChart2, 
  Truck, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => (
  <Link to={href} className="w-full">
    <Button 
      variant={isActive ? "secondary" : "ghost"} 
      className={cn(
        "w-full justify-start gap-2 mb-1", 
        isActive ? "bg-secondary" : "",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  </Link>
);

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Produtos', href: '/admin/products' },
    { icon: ShoppingBag, label: 'Categorias', href: '/admin/categories' },
    { icon: ShoppingBag, label: 'Pedidos', href: '/admin/orders' },
    { icon: BarChart2, label: 'Relatórios', href: '/admin/reports' },
    { icon: BadgePercent, label: 'Promoções', href: '/admin/promotions' },
    { icon: Truck, label: 'Configuração de Frete', href: '/admin/shipping' },
    { icon: Settings, label: 'Configurações', href: '/admin/settings' },
  ];

  if (!user) return null;

  return (
    <div className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-64"
    )}>
      <div className="p-4 border-b border-border flex justify-between items-center">
        {!collapsed && <h2 className="text-xl font-bold">Admin</h2>}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <div className="flex-1 py-4 px-2 overflow-y-auto">
        {menuItems.map((item) => (
          <React.Fragment key={item.href}>
            {collapsed ? (
              <Link to={item.href} className="flex justify-center p-2 mb-2 rounded-md hover:bg-accent">
                <item.icon className="h-6 w-6" />
              </Link>
            ) : (
              <SidebarItem
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={location.pathname === item.href}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <Link to="/">
            <Button variant="outline" className="w-full">
              Voltar ao site
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
