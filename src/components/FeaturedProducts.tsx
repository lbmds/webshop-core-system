
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  viewAllLink: string;
}

const FeaturedProducts = ({ title, products, viewAllLink }: FeaturedProductsProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link to={viewAllLink} className="text-primary flex items-center hover:underline">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
