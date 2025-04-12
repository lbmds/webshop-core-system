
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AddressFormValues } from '@/components/checkout/AddressForm';
import { supabase } from '@/integrations/supabase/client';

export const useAddress = () => {
  const { user } = useAuth();
  const [address, setAddress] = useState<AddressFormValues | null>(null);
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [addressOpen, setAddressOpen] = useState(true);
  
  // Load user address if available
  useEffect(() => {
    const loadUserAddress = async () => {
      if (!user || addressLoaded) return;
      
      try {
        const { data } = await supabase
          .from('users')
          .select('address_street, address_city, address_state, address_zip')
          .eq('id', user.id)
          .single();
          
        if (data && data.address_street) {
          // Parse address parts from the saved string
          const addressParts = data.address_street.split(',');
          const street = addressParts[0]?.trim() || '';
          
          let number = '', complement = '', neighborhood = '';
          if (addressParts[1]) {
            const numberAndComplement = addressParts[1].trim().split('-');
            number = numberAndComplement[0]?.trim() || '';
            complement = numberAndComplement[1]?.trim() || '';
          }
          
          if (addressParts[2]) {
            neighborhood = addressParts[2]?.trim() || '';
          }
          
          // Create address object with all required fields explicitly set
          const addressData: AddressFormValues = {
            street: street,
            number: number,
            complement: complement,
            neighborhood: neighborhood,
            city: data.address_city || '',
            state: data.address_state || '',
            zipCode: data.address_zip || '',
          };
          
          setAddress(addressData);
        }
      } catch (error) {
        console.error('Error loading address:', error);
      } finally {
        setAddressLoaded(true);
      }
    };
    
    loadUserAddress();
  }, [user, addressLoaded]);
  
  // Handle address form submission
  const handleAddressSave = (addressData: AddressFormValues) => {
    setAddress(addressData);
  };
  
  return {
    address,
    addressLoaded,
    addressOpen,
    setAddressOpen,
    handleAddressSave,
  };
};
