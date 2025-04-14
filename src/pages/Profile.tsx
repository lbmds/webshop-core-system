
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ProfileAdminAlert from "@/components/profile/ProfileAdminAlert";
import ProfileForm, { UserProfile } from "@/components/profile/ProfileForm";

const Profile = () => {
  const { user, hasRole, refreshUserRoles } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        
        if (!user) return;

        // Refresh user roles to ensure we have the latest data
        await refreshUserRoles();

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (error: any) {
        console.error("Error loading user profile:", error.message);
        toast.error("Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, refreshUserRoles]);

  const isAdmin = hasRole('admin');
  console.log('User is admin:', isAdmin);

  if (loading) {
    return <div className="container py-8">Carregando...</div>;
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
        
        {isAdmin && <ProfileAdminAlert />}
        
        {profile && (
          <ProfileForm 
            profile={profile} 
            onProfileChange={setProfile} 
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
