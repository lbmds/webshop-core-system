
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

interface PaymentPreferenceOptions {
  cartItems: CartItem[];
  shippingAddress?: ShippingAddress;
  shippingMethod?: ShippingMethod;
}

export const createPaymentPreference = async (
  options: PaymentPreferenceOptions,
  accessToken: string
): Promise<{ id: string }> => {
  const { cartItems, shippingAddress, shippingMethod } = options;

  const { data, error } = await supabase.functions.invoke('create-payment', {
    body: { 
      items: cartItems,
      shippingAddress,
      shippingMethod
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  if (error) {
    throw new Error(error.message || 'Erro ao criar preferência de pagamento');
  }
  
  if (!data || !data.id) {
    throw new Error('Resposta inválida do servidor de pagamento');
  }
  
  return data;
};
