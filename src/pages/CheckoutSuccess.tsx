
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CheckoutSuccess = () => {
  // Poderia registrar o pagamento bem-sucedido no banco de dados
  useEffect(() => {
    // Aqui você implementaria o código para registrar o pedido no Supabase
    console.log("Pagamento processado com sucesso");
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-md text-center">
      <div className="bg-background border rounded-lg p-8 shadow-sm">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Pagamento Aprovado!</h1>
        <p className="text-muted-foreground mb-6">
          Seu pedido foi processado com sucesso e já está sendo preparado para envio.
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

export default CheckoutSuccess;
