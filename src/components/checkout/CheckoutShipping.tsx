
import React from 'react';
import { Button } from '@/components/ui/button';
import ShippingMethodSelector, { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { AddressFormValues } from '@/components/checkout/AddressForm';

interface CheckoutShippingProps {
  address: AddressFormValues | null;
  selectedMethod: string;
  onSelectMethod: (method: ShippingMethod) => void;
  onProceedToPayment: () => void;
  shippingMethod: ShippingMethod | null;
}

const CheckoutShipping = ({
  address,
  selectedMethod,
  onSelectMethod,
  onProceedToPayment,
  shippingMethod
}: CheckoutShippingProps) => {
  if (!address) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Por favor, preencha seu endereço de entrega primeiro.
      </div>
    );
  }
  
  return (
    <>
      <ShippingMethodSelector
        selectedMethod={selectedMethod}
        onSelectMethod={onSelectMethod}
      />
      <div className="mt-4 flex justify-end">
        <Button onClick={onProceedToPayment} disabled={!shippingMethod}>
          Continuar para Pagamento
        </Button>
      </div>
    </>
  );
};

export default CheckoutShipping;
