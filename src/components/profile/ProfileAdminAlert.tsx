
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";

const ProfileAdminAlert = () => {
  const { hasRole } = useAuth();
  console.log("Rendering ProfileAdminAlert, user is admin:", hasRole('admin'));
  
  return (
    <Alert className="mb-6 bg-primary/10 border-primary">
      <Shield className="h-5 w-5" />
      <AlertTitle>Acesso Administrativo</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Você tem acesso à área administrativa do sistema.</p>
        <Button asChild variant="outline" className="w-fit">
          <Link to="/admin" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Acessar área administrativa
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ProfileAdminAlert;
