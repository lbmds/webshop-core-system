
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-cover bg-center h-[500px] flex items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Spring Collection 2025
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Discover our latest arrivals with styles that define the season. Quality products at unbeatable prices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
