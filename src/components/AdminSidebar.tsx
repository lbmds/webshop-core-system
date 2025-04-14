
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  X,
  Home,
  LogOut,
  Wifi
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={cn(
      "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-[70px]" : "w-64"
    )}>
      <div className="p-4 border-b border-border flex justify-between items-center">
        {!collapsed && (
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Admin</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant={isOnline ? "default" : "destructive"}
                    className="ml-2 h-6 cursor-default"
                  >
                    <Wifi className="h-3 w-3 mr-1" />
                    {isOnline ? 'Online' : 'Offline'}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {isOnline ? 'Alterações em tempo real ativas' : 'Sem conexão - alterações não serão salvas'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to={item.href} className="flex justify-center p-2 mb-2 rounded-md hover:bg-accent">
                      <item.icon className="h-6 w-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
      
      <div className="p-4 border-t border-border flex flex-col gap-2">
        {collapsed ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/" className="flex justify-center p-2 rounded-md hover:bg-accent">
                    <Home className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Ver o site
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleLogout}
                    className="w-full p-2"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sair
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <>
            <Link to="/">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Ver o site
              </Button>
            </Link>
            
            <Button variant="destructive" onClick={handleLogout} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
