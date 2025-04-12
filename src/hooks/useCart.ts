
import { useState, useEffect } from 'react';
import { ShippingMethod } from '@/components/checkout/ShippingMethodSelector';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);

  useEffect(() => {
    // Mock data - in a real app, this would come from a real cart/api
    const mockCartItems = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
        quantity: 1
      },
      {
        id: 3,
        name: "Professional DSLR Camera",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1470&auto=format&fit=crop",
        quantity: 1
      }
    ];
    
    setCartItems(mockCartItems);
    setIsLoading(false);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  // Shipping price based on selected method or default calculation
  const shipping = shippingMethod 
    ? shippingMethod.price 
    : subtotal > 100 ? 0 : 9.99;
    
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return {
    cartItems,
    isLoading,
    subtotal,
    shipping,
    tax,
    total,
    shippingMethod,
    setShippingMethod
  };
};
