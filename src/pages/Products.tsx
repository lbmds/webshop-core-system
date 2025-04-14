
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductsFilter from "@/components/ProductsFilter";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 1000
  });
  
  // Mock data for products
  const products = [
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
      name: "Caneca Térmica 500ml",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1374&auto=format&fit=crop",
      category: "Canecas",
      rating: 4.7
    },
    {
      id: 3,
      name: "Caneca de Cerâmica Artesanal",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1572916118992-fb8c982d3d6c?q=80&w=1374&auto=format&fit=crop",
      category: "Canecas",
      rating: 4.6
    },
    {
      id: 4,
      name: "Camisa Polo - Coleção 2025",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1374&auto=format&fit=crop",
      category: "Camisas",
      rating: 4.7,
      isOnSale: true
    },
    {
      id: 5,
      name: "Camisa Estampada - Edição Especial",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1528&auto=format&fit=crop",
      category: "Camisas",
      rating: 4.5,
      isNew: true
    },
    {
      id: 6,
      name: "Caneta Executiva Metálica",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1470&auto=format&fit=crop",
      category: "Canetas",
      rating: 4.9
    },
    {
      id: 7,
      name: "Kit Canetas Coloridas",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1595925889916-1daa01718120?q=80&w=1374&auto=format&fit=crop",
      category: "Canetas",
      rating: 4.2,
      isNew: true
    },
    {
      id: 8,
      name: "Blusa de Moletom - Inverno",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1470&auto=format&fit=crop",
      category: "Blusas",
      rating: 4.6,
      isOnSale: true
    },
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
      name: "Chaveiro Emborrachado 3D",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1590333748338-d629e4564ad1?q=80&w=1374&auto=format&fit=crop",
      category: "Chaveiros",
      rating: 4.3,
      isNew: true
    },
    {
      id: 11,
      name: "Chaveiro Abridor de Garrafas",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1561464382-349a0d78a9b7?q=80&w=1374&auto=format&fit=crop",
      category: "Chaveiros",
      rating: 4.1
    },
    {
      id: 12,
      name: "Chaveiro de Metal Personalizado",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1470&auto=format&fit=crop",
      category: "Chaveiros",
      rating: 4.4
    }
  ];
  
  // Mock data for filters
  const categoryFilters = {
    id: "categories",
    name: "Categorias",
    options: [
      { id: "canecas", label: "Canecas" },
      { id: "camisas", label: "Camisas" },
      { id: "canetas", label: "Canetas" },
      { id: "blusas", label: "Blusas" },
      { id: "chaveiros", label: "Chaveiros" }
    ]
  };
  
  const brandFilters = {
    id: "brands",
    name: "Marcas",
    options: [
      { id: "marca-propria", label: "Marca Própria" },
      { id: "premium", label: "Premium" },
      { id: "classic", label: "Classic" },
      { id: "eco", label: "Eco-friendly" }
    ]
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would filter products here
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 section-title">Todos os Produtos</h1>
      
      {/* Filter and sort controls */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4">
          <div className="bordered-section">
            <ProductsFilter
              categories={categoryFilters}
              brands={brandFilters}
              priceRange={[0, 200]}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
        
        {/* Products grid */}
        <div className="lg:w-3/4">
          {/* Sort and layout controls */}
          <div className="flex justify-between items-center mb-6 bordered-section p-4">
            <div className="flex items-center">
              <span className="text-sm mr-2">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Em destaque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Em destaque</SelectItem>
                  <SelectItem value="newest">Novidades</SelectItem>
                  <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                  <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                  <SelectItem value="rating">Melhor Avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={layout === 'grid' ? 'bg-secondary' : ''}
                onClick={() => setLayout('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={layout === 'list' ? 'bg-secondary' : ''}
                onClick={() => setLayout('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Products */}
          <div className={layout === 'grid' ? 'product-grid' : 'space-y-4'}>
            {products.map((product) => (
              <div key={product.id} className={layout === 'list' ? 'bordered-section p-4' : 'product-card'}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-1">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="icon" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
