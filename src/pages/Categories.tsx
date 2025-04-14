
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Canecas",
      image: "https://images.unsplash.com/photo-1572990302336-a8a5a1a1c2fa?q=80&w=1374&auto=format&fit=crop",
      description: "Canecas personalizadas em diversos materiais e tamanhos."
    },
    {
      id: 2,
      name: "Camisas",
      image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1471&auto=format&fit=crop",
      description: "Camisas de alta qualidade com estampas personalizadas."
    },
    {
      id: 3,
      name: "Canetas",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1470&auto=format&fit=crop",
      description: "Canetas personalizadas para brindes e eventos."
    },
    {
      id: 4,
      name: "Blusas",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1372&auto=format&fit=crop",
      description: "Blusas com estampas exclusivas e materiais de primeira linha."
    },
    {
      id: 5,
      name: "Chaveiros",
      image: "https://images.unsplash.com/photo-1631972235075-848c1e0ed653?q=80&w=1470&auto=format&fit=crop",
      description: "Chaveiros personalizados em diversos materiais."
    },
    {
      id: 6,
      name: "Sacolas",
      image: "https://images.unsplash.com/photo-1597484662317-c93a56c9e67d?q=80&w=1374&auto=format&fit=crop",
      description: "Sacolas personalizadas para eventos e promoções."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 section-title">Categorias</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link to={`/products?category=${category.name.toLowerCase()}`} key={category.id}>
            <Card className="hover:shadow-lg transition-shadow border-2 overflow-hidden h-full">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
