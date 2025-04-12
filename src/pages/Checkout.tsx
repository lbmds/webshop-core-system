
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago('TEST-4b0eb3ed-eabe-467e-95ea-99010b0aa403', { locale: 'pt-BR' });
  }, []);

  useEffect(() => {
    const mockCartItems = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
        quantity: 1
      },
      {
        id: 3,
        name: "Professional DSLR Camera",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1470&auto=format&fit=crop",
        quantity: 1
      }
    ];
    
    setCartItems(mockCartItems);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const createPreference = async () => {
      if (cartItems.length === 0) return;
      
      try {
        setIsLoading(true);
        
        const session = await supabase.auth.getSession();
        if (!session.data.session) {
          toast.error("Você precisa estar logado para finalizar a compra");
          navigate('/auth');
          return;
        }
        
        const response = await fetch(
          'https://xxnnpoyydwvplgvjawnn.supabase.co/functions/v1/create-payment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.data.session.access_token}`,
            },
            body: JSON.stringify({ items: cartItems }),
          }
        );
        
        const data = await response.json();
        
        if (response.ok) {
          setPreferenceId(data.id);
        } else {
          throw new Error(data.error || 'Erro ao criar preferência de pagamento');
        }
      } catch (error) {
        toast.error(`Erro: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    createPreference();
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-xl">Carregando checkout...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-secondary p-4 font-medium">
              Resumo do Pedido
            </div>
            
            {cartItems.map(item => (
              <div key={item.id} className="p-4 border-t">
                <div className="flex items-center">
                  <div className="w-16 h-16 flex-shrink-0 mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between w-full">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                    </div>
                    <div className="md:text-right">
                      <p className="font-medium">R$ {item.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Total: R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="border rounded-md p-6">
            <h2 className="text-xl font-bold mb-4">Resumo</h2>
            
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impostos</span>
                <span>R$ {tax.toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            
            {preferenceId ? (
              <div className="w-full flex justify-center">
                <Wallet 
                  initialization={{ preferenceId }} 
                />
              </div>
            ) : (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando opções de pagamento...
              </Button>
            )}
            
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Ao prosseguir, você será redirecionado para o Mercado Pago para finalizar seu pagamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
