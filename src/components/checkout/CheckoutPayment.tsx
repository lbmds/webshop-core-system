
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CartSummary from '@/components/checkout/CartSummary';
import OrderSummary from '@/components/checkout/OrderSummary';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';
import { AddressFormValues } from '@/components/checkout/AddressForm';

interface CheckoutPaymentProps {
  cartItems: {
    id: string | number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  subtotal: number;
  shippingMethod: ShippingMethod | null;
  tax: number;
  total: number;
  paymentError: string | null;
  preferenceId: string | null;
  isLoading: boolean;
  onRetry: () => void;
  address: AddressFormValues | null;
}

const CheckoutPayment = ({
  cartItems,
  subtotal,
  shippingMethod,
  tax,
  total,
  paymentError,
  preferenceId,
  isLoading,
  onRetry,
  address
}: CheckoutPaymentProps) => {
  if (!shippingMethod || !address) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Por favor, selecione um método de entrega primeiro.
      </div>
    );
  }
  
  return (
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
        onRetry={onRetry}
      />
    </Card>
  );
};

export default CheckoutPayment;
