
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

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
  const handleProceedToPayment = () => {
    toast.success("Pedido finalizado com sucesso! Redirecionando para a página de confirmação...");
    setTimeout(() => {
      window.location.href = "/checkout/success";
    }, 2000);
  };
  
  return (
    <Card className="bordered-section shadow-md">
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
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 mr-2" />
                <p className="font-medium">Pronto para finalizar</p>
              </div>
              <p className="text-sm">Seu pedido foi processado com sucesso. Clique no botão abaixo para finalizar o pagamento.</p>
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={handleProceedToPayment}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Finalizar Pagamento
            </Button>
            
            <div className="flex items-center justify-center gap-4 pt-4 border-t">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-visa-3-226460.png" alt="Visa" className="h-8" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-mastercard-4-226450.png" alt="Mastercard" className="h-8" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-american-express-4-226462.png" alt="American Express" className="h-8" />
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-paypal-54-226448.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        ) : (
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando pagamento...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Prosseguir para pagamento
              </>
            )}
          </Button>
        )}
        
        <p className="mt-4 text-xs text-center text-muted-foreground">
          Este é um sistema de pagamento simulado para fins de demonstração.
        </p>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
