
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book, Gift, Bible, Bookmark, Video, Music } from "lucide-react";

const Index = () => {
  // Mock data for categories
  const categories = [
    {
      id: 1,
      name: "Bíblias",
      image: "https://images.unsplash.com/photo-1585860180271-c396f69d6fdf?q=80&w=1470&auto=format&fit=crop",
      productCount: 48
    },
    {
      id: 2,
      name: "Livros",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop",
      productCount: 124
    },
    {
      id: 3,
      name: "Estudos",
      image: "https://images.unsplash.com/photo-1546074177-31bfa593f731?q=80&w=1374&auto=format&fit=crop",
      productCount: 86
    },
    {
      id: 4,
      name: "Música",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1470&auto=format&fit=crop",
      productCount: 57
    },
    {
      id: 5,
      name: "Presentes",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1470&auto=format&fit=crop",
      productCount: 42
    },
    {
      id: 6,
      name: "Mídia Digital",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1470&auto=format&fit=crop",
      productCount: 33
    }
  ];
  
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Bíblia de Estudo Aplicação Pessoal",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop",
      category: "Bíblias",
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      name: "Dicionário Bíblico Ilustrado",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop",
      category: "Livros",
      rating: 4.7,
      isOnSale: true
    },
    {
      id: 3,
      name: "Curso de Teologia Básica",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=1470&auto=format&fit=crop",
      category: "Estudos",
      rating: 4.9
    },
    {
      id: 4,
      name: "Bíblia Sagrada Letra Grande",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1581074817932-3fecc307e8b3?q=80&w=1470&auto=format&fit=crop",
      category: "Bíblias",
      rating: 4.6,
      isOnSale: true
    }
  ];
  
  // Mock data for new arrivals
  const newArrivals = [
    {
      id: 5,
      name: "Hinário Edição Especial",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1465225314224-587cd83d322b?q=80&w=1470&auto=format&fit=crop",
      category: "Música",
      rating: 4.3,
      isNew: true
    },
    {
      id: 6,
      name: "Kit Marcadores Bíblicos",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=1470&auto=format&fit=crop",
      category: "Presentes",
      rating: 4.2,
      isNew: true
    },
    {
      id: 7,
      name: "Devocional Diário Anual",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?q=80&w=1468&auto=format&fit=crop",
      category: "Livros",
      rating: 4.5,
      isNew: true
    },
    {
      id: 8,
      name: "Série de Estudos em Vídeo",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1374&auto=format&fit=crop",
      category: "Mídia Digital",
      rating: 4.7,
      isNew: true
    }
  ];
  
  // Benefits section data
  const benefits = [
    {
      icon: <Bible className="h-8 w-8" />,
      title: "Material de Qualidade",
      description: "Selecionados por especialistas"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Embalagem Especial",
      description: "Para presentes"
    },
    {
      icon: <Bookmark className="h-8 w-8" />,
      title: "Recursos Exclusivos",
      description: "Para membros da igreja"
    },
    {
      icon: <Book className="h-8 w-8" />,
      title: "Variedade de Edições",
      description: "Para diferentes necessidades"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      {/* Benefits */}
      <section className="bg-white py-8">
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
      
      <FeaturedCategories categories={categories} />
      
      <FeaturedProducts
        title="Produtos Destacados"
        products={featuredProducts}
        viewAllLink="/products"
      />
      
      <FeaturedProducts
        title="Novidades"
        products={newArrivals}
        viewAllLink="/new"
      />
      
      {/* Newsletter */}
      <section className="bg-primary py-16">
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
