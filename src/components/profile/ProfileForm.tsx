
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  address_street: string | null;
  address_city: string | null;
  address_state: string | null;
  address_zip: string | null;
}

interface ProfileFormProps {
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

const ProfileForm = ({ profile, onProfileChange }: ProfileFormProps) => {
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('users')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone: profile.phone,
          address_street: profile.address_street,
          address_city: profile.address_city,
          address_state: profile.address_state,
          address_zip: profile.address_zip
        })
        .eq('id', profile.id);

      if (error) throw error;
      
      toast.success("Perfil atualizado com sucesso");
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedProfile = { ...profile, [name]: value };
    onProfileChange(updatedProfile);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>Atualize seus dados pessoais e endereço</CardDescription>
      </CardHeader>
      <form onSubmit={handleUpdate}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Dados Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nome</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={profile?.first_name || ""}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last_name">Sobrenome</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={profile?.last_name || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={profile?.email || ""}
                disabled
              />
              <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={profile?.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Endereço</h3>
            
            <div className="space-y-2">
              <Label htmlFor="address_street">Endereço</Label>
              <Input
                id="address_street"
                name="address_street"
                value={profile?.address_street || ""}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address_city">Cidade</Label>
                <Input
                  id="address_city"
                  name="address_city"
                  value={profile?.address_city || ""}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_state">Estado</Label>
                <Input
                  id="address_state"
                  name="address_state"
                  value={profile?.address_state || ""}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address_zip">CEP</Label>
                <Input
                  id="address_zip"
                  name="address_zip"
                  value={profile?.address_zip || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={updating}>
            {updating ? "Salvando..." : "Salvar alterações"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
