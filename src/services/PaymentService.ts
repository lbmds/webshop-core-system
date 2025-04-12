
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const createPaymentPreference = async (
  cartItems: CartItem[], 
  accessToken: string
): Promise<{ id: string }> => {
  const { data, error } = await supabase.functions.invoke('create-payment', {
    body: { items: cartItems },
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
