
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  rating: number;
  is_on_sale: boolean;
  original_price?: number;
  category: string;
}

interface ProductRecommendationsProps {
  productId: string;
}

const ProductRecommendations = ({ productId }: ProductRecommendationsProps) => {
  const { user, session } = useAuth();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user || !session?.access_token || !productId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase.functions.invoke('product-recommendations', {
          body: { productId },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        
        if (error) throw new Error(error.message);
        
        setRecommendations(data.recommendations || []);
      } catch (err: any) {
        console.error('Error fetching product recommendations:', err);
        setError(err.message);
        toast.error('Não foi possível carregar recomendações');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [productId, user, session]);
  
  if (loading) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Produtos Recomendados</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-md"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error || recommendations.length === 0) {
    return null;
  }
  
  return (
    <Card className="mt-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Produtos Recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {recommendations.map((product) => (
            <ProductCard 
              key={product.id}
              id={Number(product.id)}
              name={product.name}
              price={product.price}
              originalPrice={product.original_price}
              image={product.image_url}
              category={product.category}
              rating={product.rating}
              isOnSale={product.is_on_sale}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendations;
