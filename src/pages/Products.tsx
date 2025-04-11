
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
      name: "Premium Wireless Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.5,
      isNew: true
    },
    {
      id: 2,
      name: "Ultra HD Smart TV 55\"",
      price: 699.99,
      originalPrice: 899.99,
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1475&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.8,
      isOnSale: true
    },
    {
      id: 3,
      name: "Professional DSLR Camera",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1470&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.7
    },
    {
      id: 4,
      name: "Smartwatch Series 5",
      price: 349.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1472&auto=format&fit=crop",
      category: "Electronics",
      rating: 4.6,
      isOnSale: true
    },
    {
      id: 5,
      name: "Casual Denim Jacket",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop",
      category: "Clothing",
      rating: 4.3,
      isNew: true
    },
    {
      id: 6,
      name: "Natural Bamboo Side Table",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1374&auto=format&fit=crop",
      category: "Home & Kitchen",
      rating: 4.2,
      isNew: true
    },
    {
      id: 7,
      name: "Organic Face Serum",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop",
      category: "Beauty",
      rating: 4.5,
      isNew: true
    },
    {
      id: 8,
      name: "Fitness Smart Band",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1035&auto=format&fit=crop",
      category: "Sports",
      rating: 4.1,
      isNew: true
    }
  ];
  
  // Mock data for filters
  const categoryFilters = {
    id: "categories",
    name: "Categories",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "clothing", label: "Clothing" },
      { id: "home-kitchen", label: "Home & Kitchen" },
      { id: "beauty", label: "Beauty" },
      { id: "sports", label: "Sports" }
    ]
  };
  
  const brandFilters = {
    id: "brands",
    name: "Brands",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "sony", label: "Sony" }
    ]
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, you would filter products here
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
      {/* Filter and sort controls */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4">
          <ProductsFilter
            categories={categoryFilters}
            brands={brandFilters}
            priceRange={[0, 1000]}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        {/* Products grid */}
        <div className="lg:w-3/4">
          {/* Sort and layout controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <span className="text-sm mr-2">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
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
              <div key={product.id} className={layout === 'list' ? 'border rounded-md p-4' : ''}>
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
