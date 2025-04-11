
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Sua fonte confiável para livros, Bíblias e materiais de estudo. Comprometidos em fornecer recursos de qualidade para sua jornada espiritual.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary-foreground">Loja</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-primary">Todos os Produtos</Link></li>
              <li><Link to="/categories" className="text-sm hover:text-primary">Categorias</Link></li>
              <li><Link to="/deals" className="text-sm hover:text-primary">Promoções</Link></li>
              <li><Link to="/new" className="text-sm hover:text-primary">Lançamentos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary-foreground">Atendimento</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-sm hover:text-primary">Fale Conosco</Link></li>
              <li><Link to="/shipping" className="text-sm hover:text-primary">Entrega</Link></li>
              <li><Link to="/returns" className="text-sm hover:text-primary">Trocas e Devoluções</Link></li>
              <li><Link to="/faq" className="text-sm hover:text-primary">Perguntas Frequentes</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary-foreground">Conecte-se Conosco</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2 text-secondary-foreground">Inscreva-se em nossa newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-3 py-2 border rounded-l-md w-full text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md text-sm"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/10 mt-8 pt-8 text-center text-sm text-secondary-foreground/70">
          <p>&copy; {new Date().getFullYear()} NOVA Igreja Batista Grande Circular. Todos os direitos reservados.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary">Política de Privacidade</Link>
            <Link to="/terms" className="hover:text-primary">Termos de Serviço</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
