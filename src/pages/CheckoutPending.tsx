
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const CheckoutPending = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md text-center">
      <div className="bg-background border rounded-lg p-8 shadow-sm">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 mb-6">
          <Clock className="h-10 w-10 text-yellow-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Pagamento Pendente</h1>
        <p className="text-muted-foreground mb-6">
          Seu pagamento está sendo processado. Assim que for confirmado, enviaremos um e-mail com os detalhes do seu pedido.
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full" variant="default">
            <Link to="/">Voltar para a loja</Link>
          </Button>
          
          <Button asChild className="w-full" variant="outline">
            <Link to="/profile">Ver meus pedidos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPending;
