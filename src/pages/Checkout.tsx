
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CartSummary from '@/components/checkout/CartSummary';
import OrderSummary from '@/components/checkout/OrderSummary';
import LoginDialog from '@/components/checkout/LoginDialog';
import AddressForm, { AddressFormValues } from '@/components/checkout/AddressForm';
import ShippingMethodSelector, { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { createPaymentPreference } from '@/services/PaymentService';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from '@/components/ui/separator';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const { cartItems, isLoading, subtotal, tax, total, setShippingMethod, shippingMethod } = useCart();
  
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [address, setAddress] = useState<AddressFormValues | null>(null);
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'shipping' | 'payment'>('address');
  const [addressOpen, setAddressOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Initialize MercadoPago
  useEffect(() => {
    initMercadoPago('TEST-4b0eb3ed-eabe-467e-95ea-99010b0aa403');
  }, []);

  // Load user address if available
  useEffect(() => {
    const loadUserAddress = async () => {
      if (!user || addressLoaded) return;
      
      try {
        const { data } = await supabase
          .from('users')
          .select('address_street, address_city, address_state, address_zip')
          .eq('id', user.id)
          .single();
          
        if (data && data.address_street) {
          // Parse address parts from the saved string
          const addressParts = data.address_street.split(',');
          const street = addressParts[0]?.trim() || '';
          
          let number = '', complement = '', neighborhood = '';
          if (addressParts[1]) {
            const numberAndComplement = addressParts[1].trim().split('-');
            number = numberAndComplement[0]?.trim() || '';
            complement = numberAndComplement[1]?.trim() || '';
          }
          
          if (addressParts[2]) {
            neighborhood = addressParts[2]?.trim() || '';
          }
          
          setAddress({
            street,
            number,
            complement,
            neighborhood,
            city: data.address_city || '',
            state: data.address_state || '',
            zipCode: data.address_zip || '',
          });
        }
      } catch (error) {
        console.error('Error loading address:', error);
      } finally {
        setAddressLoaded(true);
      }
    };
    
    loadUserAddress();
  }, [user, addressLoaded]);
  
  // Handle address form submission
  const handleAddressSave = (addressData: AddressFormValues) => {
    setAddress(addressData);
    setCheckoutStep('shipping');
    setAddressOpen(false);
    setShippingOpen(true);
  };
  
  // Handle shipping method selection
  const handleShippingMethodSelect = (method: ShippingMethod) => {
    setShippingMethod(method);
    setCheckoutStep('payment');
    setShippingOpen(false);
    setPaymentOpen(true);
  };

  // Create payment preference
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
      
      // Check if address and shipping method are selected
      if (!address) {
        toast.error('Por favor, informe seu endereço de entrega');
        setCheckoutStep('address');
        setAddressOpen(true);
        setShippingOpen(false);
        setPaymentOpen(false);
        return;
      }
      
      if (!shippingMethod) {
        toast.error('Por favor, selecione um método de entrega');
        setCheckoutStep('shipping');
        setAddressOpen(false);
        setShippingOpen(true);
        setPaymentOpen(false);
        return;
      }
      
      console.log("Creating payment preference with valid session token");
      
      // Call the payment service
      const data = await createPaymentPreference(
        {
          cartItems,
          shippingAddress: address,
          shippingMethod
        },
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

  // Handle retry
  const handleRetry = () => {
    setPaymentError(null);
    setPreferenceId(null);
    setAttemptCount(prev => prev + 1);
    createPreference();
  }

  // Handle login redirect
  const handleGoToLogin = () => {
    navigate('/auth', { state: { returnTo: '/checkout' } });
  }

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (!address) {
      toast.error('Por favor, informe seu endereço de entrega');
      setCheckoutStep('address');
      setAddressOpen(true);
      return;
    }
    
    if (!shippingMethod) {
      toast.error('Por favor, selecione um método de entrega');
      return;
    }
    
    setCheckoutStep('payment');
    setShippingOpen(false);
    setPaymentOpen(true);
    createPreference();
  };

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
        <div className="lg:w-2/3 space-y-6">
          {/* Address Section */}
          <Collapsible open={addressOpen} onOpenChange={setAddressOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between p-4 bg-muted rounded-t-md cursor-pointer">
                <h2 className="text-lg font-semibold">
                  1. Endereço de Entrega
                  {address && !addressOpen && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (Preenchido)
                    </span>
                  )}
                </h2>
                <span className="text-muted-foreground">
                  {addressOpen ? '▲' : '▼'}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-1">
              <AddressForm 
                onAddressSave={handleAddressSave}
                defaultValues={address || undefined}
              />
            </CollapsibleContent>
          </Collapsible>
          
          {/* Shipping Section */}
          <Collapsible open={shippingOpen} onOpenChange={setShippingOpen}>
            <CollapsibleTrigger asChild>
              <div className={`flex items-center justify-between p-4 ${!address ? 'bg-muted/50 text-muted-foreground' : 'bg-muted'} rounded-t-md ${address ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <h2 className="text-lg font-semibold">
                  2. Método de Entrega
                  {shippingMethod && !shippingOpen && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      ({shippingMethod.name})
                    </span>
                  )}
                </h2>
                <span className="text-muted-foreground">
                  {shippingOpen ? '▲' : '▼'}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-1">
              {address ? (
                <>
                  <ShippingMethodSelector
                    selectedMethod={shippingMethod?.id || ''}
                    onSelectMethod={handleShippingMethodSelect}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button onClick={handleProceedToPayment} disabled={!shippingMethod}>
                      Continuar para Pagamento
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Por favor, preencha seu endereço de entrega primeiro.
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Payment Section */}
          <Collapsible open={paymentOpen} onOpenChange={setPaymentOpen}>
            <CollapsibleTrigger asChild>
              <div className={`flex items-center justify-between p-4 ${!shippingMethod ? 'bg-muted/50 text-muted-foreground' : 'bg-muted'} rounded-t-md ${shippingMethod && address ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <h2 className="text-lg font-semibold">
                  3. Pagamento
                </h2>
                <span className="text-muted-foreground">
                  {paymentOpen ? '▲' : '▼'}
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-1">
              {shippingMethod && address ? (
                <Card>
                  <CartSummary items={cartItems} />
                  <Separator className="my-4" />
                  <OrderSummary
                    subtotal={subtotal}
                    shipping={shippingMethod.price}
                    tax={tax}
                    total={total}
                    paymentError={paymentError}
                    preferenceId={preferenceId}
                    isLoading={isLoading}
                    onRetry={handleRetry}
                  />
                </Card>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Por favor, selecione um método de entrega primeiro.
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
          
          {/* Cart Summary (Mobile Only) */}
          <div className="block lg:hidden">
            <CartSummary items={cartItems} />
          </div>
        </div>
        
        {/* Order Summary (Desktop) */}
        <div className="hidden lg:block lg:w-1/3 space-y-4">
          <CartSummary items={cartItems} />
          <OrderSummary
            subtotal={subtotal}
            shipping={shippingMethod?.price || 0}
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
