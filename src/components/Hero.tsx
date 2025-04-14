import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
const Hero = () => {
  return <section className="relative bg-cover bg-center h-[500px] flex items-center" style={{
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop')"
  }}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-900/50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
            <Logo variant="white" size="large" showText={false} />
            <div className="text-white">
              <h2 className="text-3xl font-bold">NOVA IGREJA BATISTA</h2>
              <p className="text-sm font-medium text-secondary">Igreja Batista Grande Circular</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Produtos e Recursos 2025
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Descubra nossa coleção de livros, Bíblias e materiais de estudo para enriquecer sua jornada espiritual.
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
    </section>;
};
export default Hero;