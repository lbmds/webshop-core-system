
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, signOut } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
            <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">Produtos</Link>
            <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">Categorias</Link>
            <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">Sobre</Link>
            <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contato</Link>
          </nav>
          
          {/* Search, Cart, and User Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8 w-[200px] lg:w-[300px] rounded-md"
              />
            </div>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {cartCount}
                </Badge>
              )}
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer w-full">Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-8 w-full rounded-md"
              />
            </div>
            <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Produtos</Link>
            <Link to="/categories" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Categorias</Link>
            <Link to="/about" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Sobre</Link>
            <Link to="/contact" className="block py-2 text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Contato</Link>
            
            {!user && (
              <div className="pt-2 border-t mt-2">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full" size="sm">Entrar / Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
