
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AddressFormValues } from '@/components/checkout/AddressForm';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';

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
  
  const [preferenceId, setPreferenceId] = useState<string | null>("demo-payment-123456");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  
  // Simplified payment creation for demo
  const createPreference = async () => {
    if (cartItems.length === 0) {
      toast.error('Seu carrinho está vazio');
      return false;
    }

    try {
      setPaymentError(null);
      setPaymentProcessing(true);
      
      // Check authentication
      if (!session?.access_token || !user) {
        console.log("User not authenticated, showing login dialog");
        setShowLoginDialog(true);
        setPaymentProcessing(false);
        return false;
      }
      
      // Check if address and shipping method are selected
      if (!address) {
        toast.error('Por favor, informe seu endereço de entrega');
        setPaymentProcessing(false);
        return false;
      }
      
      if (!shippingMethod) {
        toast.error('Por favor, selecione um método de entrega');
        setPaymentProcessing(false);
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just create a fake preference ID
      setPreferenceId("demo-payment-" + Math.random().toString(36).substring(2, 8));
      setPaymentProcessing(false);
      
      console.log("Demo payment preference created");
      return true;
    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentError("Erro ao processar pagamento: " + error.message);
      toast.error(`Erro: ${error.message}`);
      setPaymentProcessing(false);
      return false;
    }
  };
  
  // Handle retry
  const handleRetry = () => {
    setPaymentError(null);
    setPreferenceId(null);
    createPreference();
  };
  
  return {
    preferenceId,
    paymentError,
    paymentOpen,
    setPaymentOpen,
    showLoginDialog,
    setShowLoginDialog,
    paymentProcessing,
    createPreference,
    handleRetry,
  };
};
