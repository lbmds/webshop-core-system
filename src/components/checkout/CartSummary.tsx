
import React from 'react';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary = ({ items }: CartSummaryProps) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-secondary p-4 font-medium">
        Resumo do Pedido
      </div>
      
      {items.map(item => (
        <div key={item.id} className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-16 h-16 flex-shrink-0 mr-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between w-full">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
              </div>
              <div className="md:text-right">
                <p className="font-medium">R$ {item.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  Total: R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;
