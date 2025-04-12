
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Wallet } from '@mercadopago/sdk-react';
import { Card, CardContent } from '@/components/ui/card';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentError: string | null;
  preferenceId: string | null;
  isLoading: boolean;
  onRetry: () => void;
}

const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  paymentError,
  preferenceId,
  isLoading,
  onRetry
}: OrderSummaryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Resumo</h2>
        
        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Frete</span>
            <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Impostos</span>
            <span>R$ {tax.toFixed(2)}</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        
        {paymentError ? (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
              <p className="font-medium">Erro no pagamento</p>
              <p className="text-sm">{paymentError}</p>
            </div>
            <Button onClick={onRetry} className="w-full">
              Tentar novamente
            </Button>
          </div>
        ) : preferenceId ? (
          <div className="w-full flex justify-center">
            <Wallet 
              initialization={{ preferenceId }} 
            />
          </div>
        ) : (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando opções de pagamento...
          </Button>
        )}
        
        <p className="mt-4 text-xs text-center text-muted-foreground">
          Ao prosseguir, você será redirecionado para o Mercado Pago para finalizar seu pagamento.
        </p>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
