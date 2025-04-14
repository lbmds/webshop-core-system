
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Hero = () => {
  return (
    <section 
      className="relative bg-cover bg-center h-[500px] flex items-center border-b-4 border-secondary" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1567828296309-743090c09693?q=80&w=1374&auto=format&fit=crop')"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-900/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg text-center md:text-left">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Produtos Personalizados 2025
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Descubra nossa coleção de produtos personalizados para sua marca, empresa ou evento.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/products">Comprar Agora</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Link to="/categories">Ver Categorias</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
