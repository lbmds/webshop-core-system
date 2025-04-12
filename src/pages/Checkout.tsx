
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import CartSummary from '@/components/checkout/CartSummary';
import OrderSummary from '@/components/checkout/OrderSummary';
import LoginDialog from '@/components/checkout/LoginDialog';
import AddressForm from '@/components/checkout/AddressForm';
import { CheckoutStep } from '@/components/checkout/CheckoutStepper';
import CheckoutShipping from '@/components/checkout/CheckoutShipping';
import CheckoutPayment from '@/components/checkout/CheckoutPayment';
import { useCheckout } from '@/hooks/useCheckout';

const Checkout = () => {
  const navigate = useNavigate();
  
  const {
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
  } = useCheckout();

  // Handle login redirect
  const handleGoToLogin = () => {
    navigate('/auth', { state: { returnTo: '/checkout' } });
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
          <CheckoutStep 
            title="Endereço de Entrega" 
            step={1}
            currentStep="address"
            stepName="address"
            isOpen={addressOpen} 
            onOpenChange={setAddressOpen}
            isDisabled={false}
            completedInfo={address && "(Preenchido)"}
          >
            <AddressForm 
              onAddressSave={handleAddressSave}
              defaultValues={address || undefined}
            />
          </CheckoutStep>
          
          {/* Shipping Section */}
          <CheckoutStep 
            title="Método de Entrega" 
            step={2}
            currentStep="shipping"
            stepName="shipping"
            isOpen={shippingOpen} 
            onOpenChange={setShippingOpen}
            isDisabled={!address}
            completedInfo={shippingMethod && `(${shippingMethod.name})`}
          >
            <CheckoutShipping
              address={address}
              selectedMethod={shippingMethod?.id || ''}
              onSelectMethod={handleShippingMethodSelect}
              onProceedToPayment={handleProceedToPayment}
              shippingMethod={shippingMethod}
            />
          </CheckoutStep>
          
          {/* Payment Section */}
          <CheckoutStep 
            title="Pagamento" 
            step={3}
            currentStep="payment"
            stepName="payment"
            isOpen={paymentOpen} 
            onOpenChange={setPaymentOpen}
            isDisabled={!shippingMethod || !address}
            completedInfo={null}
          >
            <CheckoutPayment
              cartItems={cartItems}
              subtotal={subtotal}
              shippingMethod={shippingMethod}
              tax={tax}
              total={total}
              paymentError={paymentError}
              preferenceId={preferenceId}
              isLoading={isLoading}
              onRetry={handleRetry}
              address={address}
            />
          </CheckoutStep>
          
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
