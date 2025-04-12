
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const CheckoutFailure = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md text-center">
      <div className="bg-background border rounded-lg p-8 shadow-sm">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-6">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Falha no Pagamento</h1>
        <p className="text-muted-foreground mb-6">
          Ocorreu um problema ao processar seu pagamento. Por favor, verifique os dados do seu cartão e tente novamente.
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full" variant="default">
            <Link to="/checkout">Tentar novamente</Link>
          </Button>
          
          <Button asChild className="w-full" variant="outline">
            <Link to="/cart">Voltar ao carrinho</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailure;
