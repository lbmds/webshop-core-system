
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AddressFormValues } from '@/components/checkout/AddressForm';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { createPaymentPreference } from '@/services/PaymentService';
import { initMercadoPago } from '@mercadopago/sdk-react';

interface UsePaymentProps {
  cartItems: {
    id: string | number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  address: AddressFormValues | null;
  shippingMethod: ShippingMethod | null;
}

export const usePayment = ({ cartItems, address, shippingMethod }: UsePaymentProps) => {
  const { user, session } = useAuth();
  
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  
  // Initialize MercadoPago
  useEffect(() => {
    initMercadoPago('TEST-4b0eb3ed-eabe-467e-95ea-99010b0aa403');
  }, []);
  
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
        return false;
      }
      
      if (!shippingMethod) {
        toast.error('Por favor, selecione um método de entrega');
        return false;
      }
      
      console.log("Creating payment preference with valid session token");
      
      // Make sure we pass the complete address object with all required properties
      const completeAddress: AddressFormValues = {
        street: address.street,
        number: address.number,
        complement: address.complement || '',
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode
      };
      
      // Call the payment service with the complete address
      const data = await createPaymentPreference(
        {
          cartItems,
          shippingAddress: completeAddress,
          shippingMethod
        },
        session.access_token
      );
      
      setPreferenceId(data.id);
      return true;
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentError(error.message);
      toast.error(`Erro: ${error.message}`);
      
      // Increment attempt counter
      setAttemptCount(prev => prev + 1);
      return false;
    }
  };
  
  // Handle retry
  const handleRetry = () => {
    setPaymentError(null);
    setPreferenceId(null);
    setAttemptCount(prev => prev + 1);
    createPreference();
  };
  
  return {
    preferenceId,
    paymentError,
    paymentOpen,
    setPaymentOpen,
    showLoginDialog,
    setShowLoginDialog,
    createPreference,
    handleRetry,
  };
};
