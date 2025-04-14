
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductCarousel from "@/components/ProductCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Gift, BookOpen, Bookmark, ShoppingBag, Coffee } from "lucide-react";

const Index = () => {
  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: "Canecas",
      image: "https://images.unsplash.com/photo-1572990302336-a8a5a1a1c2fa?q=80&w=1374&auto=format&fit=crop",
      productCount: 24
    },
    {
      id: 2,
      name: "Camisas",
      image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1471&auto=format&fit=crop",
      productCount: 36
    },
    {
      id: 3,
      name: "Canetas",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1470&auto=format&fit=crop",
      productCount: 18
    },
    {
      id: 4,
      name: "Blusas",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1372&auto=format&fit=crop",
      productCount: 42
    },
    {
      id: 5,
      name: "Chaveiros",
      image: "https://images.unsplash.com/photo-1631972235075-848c1e0ed653?q=80&w=1470&auto=format&fit=crop",
      productCount: 15
    },
    {
      id: 6,
      name: "Sacolas",
      image: "https://images.unsplash.com/photo-1597484662317-c93a56c9e67d?q=80&w=1374&auto=format&fit=crop",
      productCount: 12
    }
  ];
  
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Caneca Personalizada - Logo Oficial",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1470&auto=format&fit=crop",
      category: "Canecas",
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      name: "Camisa Polo - Coleção 2025",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1374&auto=format&fit=crop",
      category: "Camisas",
      rating: 4.7,
      isOnSale: true
    },
    {
      id: 3,
      name: "Caneta Executiva Metálica",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1470&auto=format&fit=crop",
      category: "Canetas",
      rating: 4.9
    },
    {
      id: 4,
      name: "Blusa de Moletom - Inverno",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1470&auto=format&fit=crop",
      category: "Blusas",
      rating: 4.6,
      isOnSale: true
    }
  ];
  
  // Mock data for new arrivals
  const newArrivals = [
    {
      id: 5,
      name: "Chaveiro Emborrachado 3D",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1590333748338-d629e4564ad1?q=80&w=1374&auto=format&fit=crop",
      category: "Chaveiros",
      rating: 4.3,
      isNew: true
    },
    {
      id: 6,
      name: "Kit Canetas Coloridas",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1595925889916-1daa01718120?q=80&w=1374&auto=format&fit=crop",
      category: "Canetas",
      rating: 4.2,
      isNew: true
    },
    {
      id: 7,
      name: "Camisa Estampada - Edição Especial",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop",
      category: "Camisas",
      rating: 4.5,
      isNew: true
    },
    {
      id: 8,
      name: "Caneca Térmica 500ml",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1374&auto=format&fit=crop",
      category: "Canecas",
      rating: 4.7,
      isNew: true
    }
  ];
  
  // Carrossel de produtos em destaque
  const carouselProducts = [
    ...featuredProducts,
    ...newArrivals,
    {
      id: 9,
      name: "Blusa Polo Feminina",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1525&auto=format&fit=crop",
      category: "Blusas",
      rating: 4.8
    },
    {
      id: 10,
      name: "Chaveiro Abridor de Garrafas",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1561464382-349a0d78a9b7?q=80&w=1374&auto=format&fit=crop",
      category: "Chaveiros",
      rating: 4.1
    }
  ];
  
  // Benefits section data
  const benefits = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "Produtos Personalizados",
      description: "De acordo com sua identidade visual"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Embalagem Especial",
      description: "Para presentes"
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Alta Qualidade",
      description: "Materiais duráveis"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Variedade de Opções",
      description: "Para diferentes necessidades"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      {/* Benefits */}
      <section className="bg-white py-8 bordered-section mx-4 my-8 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-primary mb-2">{benefit.icon}</div>
                <h3 className="font-medium text-sm md:text-base">{benefit.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Carrossel de produtos */}
      <ProductCarousel
        title="Produtos em Destaque"
        products={carouselProducts}
        viewAllLink="/products"
      />
      
      <FeaturedCategories categories={categories} />
      
      <FeaturedProducts
        title="Mais Vendidos"
        products={featuredProducts}
        viewAllLink="/products"
      />
      
      <FeaturedProducts
        title="Novidades"
        products={newArrivals}
        viewAllLink="/new"
      />
      
      {/* Newsletter */}
      <section className="bg-primary py-16 rounded-lg mx-4 my-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Junte-se à Nossa Newsletter
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Inscreva-se para receber novidades, ofertas especiais e anúncios de novos produtos.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu email"
              className="flex-grow px-4 py-2 rounded-md"
            />
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
