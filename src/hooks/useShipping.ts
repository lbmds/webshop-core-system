
import { useState } from 'react';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { toast } from 'sonner';

export const useShipping = () => {
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [shippingOpen, setShippingOpen] = useState(false);
  
  // Handle shipping method selection
  const handleShippingMethodSelect = (method: ShippingMethod) => {
    setShippingMethod(method);
  };
  
  // Validate shipping selection
  const validateShipping = () => {
    if (!shippingMethod) {
      toast.error('Por favor, selecione um método de entrega');
      return false;
    }
    return true;
  };
  
  return {
    shippingMethod,
    setShippingMethod,
    shippingOpen,
    setShippingOpen,
    handleShippingMethodSelect,
    validateShipping,
  };
};
