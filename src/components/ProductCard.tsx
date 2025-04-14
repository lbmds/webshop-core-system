
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
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

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  isNew = false,
  isOnSale = false,
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col group card product-card">
      <div className="relative">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-[200px] object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && <Badge className="bg-blue-500">Novo</Badge>}
          {isOnSale && <Badge className="bg-red-500">{discount}% OFF</Badge>}
        </div>
        
        {/* Quick action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="mb-1">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/20 text-secondary-foreground">{category}</span>
        </div>
        <Link to={`/product/${id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2 mb-1 mt-2">{name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-0 border-t mt-auto">
        <div className="flex items-baseline gap-1">
          <span className="font-bold">R$ {price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-muted-foreground text-sm line-through">R$ {originalPrice.toFixed(2)}</span>
          )}
        </div>
        <Button size="sm" className="rounded-full">
          <ShoppingCart className="h-4 w-4 mr-1" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
