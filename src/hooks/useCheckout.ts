
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAddress } from '@/hooks/useAddress';
import { useShipping } from '@/hooks/useShipping';
import { usePayment } from '@/hooks/usePayment';
import { AddressFormValues } from '@/components/checkout/AddressForm';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useCheckout = () => {
  const { user, session } = useAuth();
  const { cartItems, isLoading, subtotal, tax, total } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'shipping' | 'payment'>('address');
  
  // Initialize sub-hooks
  const {
    address,
    addressOpen,
    setAddressOpen,
    handleAddressSave
  } = useAddress();
  
  const {
    shippingMethod,
    setShippingMethod,
    shippingOpen,
    setShippingOpen,
    handleShippingMethodSelect,
    validateShipping
  } = useShipping();
  
  const {
    preferenceId,
    paymentError,
    paymentOpen,
    setPaymentOpen,
    showLoginDialog,
    setShowLoginDialog,
    createPreference,
    handleRetry
  } = usePayment({
    cartItems,
    address,
    shippingMethod
  });
  
  // Handle address form submission with step change
  const handleAddressSaveAndContinue = (addressData: AddressFormValues) => {
    handleAddressSave(addressData);
    setCheckoutStep('shipping');
    setAddressOpen(false);
    setShippingOpen(true);
  };
  
  // Handle shipping method selection with step change
  const handleShippingMethodSelectAndContinue = (method: ShippingMethod) => {
    handleShippingMethodSelect(method);
    setCheckoutStep('payment');
    setShippingOpen(false);
    setPaymentOpen(true);
  };
  
  // Proceed to payment
  const handleProceedToPayment = () => {
    if (!address) {
      toast.error('Por favor, informe seu endereço de entrega');
      setCheckoutStep('address');
      setAddressOpen(true);
      return;
    }
    
    if (!validateShipping()) {
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
    handleAddressSave: handleAddressSaveAndContinue,
    handleShippingMethodSelect: handleShippingMethodSelectAndContinue,
    handleProceedToPayment,
    handleRetry,
    createPreference
  };
};
