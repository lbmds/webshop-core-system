
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import { AddressFormValues } from '@/components/checkout/AddressForm';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { createPaymentPreference } from '@/services/PaymentService';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { supabase } from '@/integrations/supabase/client';

export const useCheckout = () => {
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
          
          // Create a properly typed AddressFormValues object with all required fields explicitly set
          const addressData: AddressFormValues = {
            street: street || '',    // Ensure non-optional with default
            number: number || '',    // Ensure non-optional with default
            complement: complement || '',
            neighborhood: neighborhood || '',
            city: data.address_city || '',
            state: data.address_state || '',
            zipCode: data.address_zip || '',
          };
          
          setAddress(addressData);
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
  };
  
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
  
  return {
    user,
    cartItems,
    isLoading,
    subtotal,
    tax,
    total,
    shippingMethod,
    preferenceId,
    paymentError,
    showLoginDialog,
    setShowLoginDialog,
    address,
    checkoutStep,
    addressOpen,
    setAddressOpen,
    shippingOpen,
    setShippingOpen,
    paymentOpen,
    setPaymentOpen,
    handleAddressSave,
    handleShippingMethodSelect,
    handleProceedToPayment,
    handleRetry,
    createPreference,
  };
};
