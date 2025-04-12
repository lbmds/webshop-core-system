
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CartSummary from '@/components/checkout/CartSummary';
import OrderSummary from '@/components/checkout/OrderSummary';
import LoginDialog from '@/components/checkout/LoginDialog';
import { createPaymentPreference } from '@/services/PaymentService';
import { useCart } from '@/hooks/useCart';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const { cartItems, isLoading, subtotal, shipping, tax, total } = useCart();
  
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    // Initialize MercadoPago with the public key
    initMercadoPago('TEST-4b0eb3ed-eabe-467e-95ea-99010b0aa403');
  }, []);

  // Create payment preference
  useEffect(() => {
    const createPreference = async () => {
      if (cartItems.length === 0 || attemptCount > 3) return;
      
      try {
        setPaymentError(null);
        
        // Check authentication
        if (!session?.access_token || !user) {
          console.log("User not authenticated, showing login dialog");
          setShowLoginDialog(true);
          return;
        }
        
        console.log("Creating payment preference with valid session token");
        
        // Call the payment service
        const data = await createPaymentPreference(
          cartItems,
          session.access_token
        );
        
        setPreferenceId(data.id);
      } catch (error: any) {
        console.error("Payment error:", error);
        setPaymentError(error.message);
        toast.error(`Erro: ${error.message}`);
        
        // Increment attempt counter
        setAttemptCount(prev => prev + 1);
      }
    };

    createPreference();
  }, [cartItems, user, session, attemptCount]);

  // Handle retry
  const handleRetry = () => {
    setPaymentError(null);
    setPreferenceId(null);
    setAttemptCount(prev => prev + 1);
  }

  // Handle login redirect
  const handleGoToLogin = () => {
    navigate('/auth', { state: { returnTo: '/checkout' } });
  }

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
          <CartSummary items={cartItems} />
        </div>
        
        <div className="lg:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            paymentError={paymentError}
            preferenceId={preferenceId}
            isLoading={isLoading}
            onRetry={handleRetry}
          />
        </div>
      </div>

      <LoginDialog 
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onLogin={handleGoToLogin}
      />
    </div>
  );
};

export default Checkout;
