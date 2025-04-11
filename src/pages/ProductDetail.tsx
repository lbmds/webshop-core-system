
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductRecommendations from '@/components/ProductRecommendations';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  rating: number;
  is_on_sale: boolean;
  original_price?: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setProduct(data);
      } catch (error: any) {
        toast.error('Erro ao carregar produto');
        console.error('Error loading product:', error.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Faça login para adicionar produtos ao carrinho');
      return;
    }
    
    if (!product) return;
    
    try {
      setAddingToCart(true);
      
      // Check if the item is already in the cart
      const { data: existingItem, error: findError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();
        
      if (findError && findError.code !== 'PGRST116') {
        throw findError;
      }
      
      if (existingItem) {
        // Update quantity if already in cart
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
          
        if (updateError) throw updateError;
      } else {
        // Add new item to cart
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: quantity
          });
          
        if (insertError) throw insertError;
      }
      
      toast.success('Produto adicionado ao carrinho');
    } catch (error: any) {
      toast.error('Erro ao adicionar ao carrinho');
      console.error('Error adding to cart:', error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Produto não encontrado</h1>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2)}
            </span>
            {product.is_on_sale && product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                R$ {product.original_price.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.stock_quantity > 0 ? (
            <div className="text-sm text-green-600">Em estoque</div>
          ) : (
            <div className="text-sm text-red-600">Fora de estoque</div>
          )}
          
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
          
          <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          
          <div className="pt-4">
            <div className="flex items-center gap-4 mb-6">
              <label htmlFor="quantity" className="font-medium">Quantidade:</label>
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full md:w-auto"
              disabled={addingToCart || product.stock_quantity < 1}
              onClick={handleAddToCart}
            >
              {addingToCart ? "Adicionando..." : "Adicionar ao Carrinho"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Recommendations */}
      {id && <ProductRecommendations productId={id} />}
    </div>
  );
};

export default ProductDetail;
