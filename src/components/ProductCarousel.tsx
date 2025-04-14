
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const ProductCarousel = ({ title, products, viewAllLink }: ProductCarouselProps) => {
  return (
    <section className="py-12 bordered-section my-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title inline-block relative">
            {title}
            <span className="absolute bottom-[-8px] left-0 h-1 w-20 bg-primary rounded-full"></span>
          </h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Ver todos
            </a>
          )}
        </div>
        
        <div className="mt-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2">
                  <div className="product-card">
                    <ProductCard {...product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-secondary/10 hover:bg-secondary/30 border-none" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-secondary/10 hover:bg-secondary/30 border-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
