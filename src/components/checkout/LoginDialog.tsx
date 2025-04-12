
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ShieldCheck } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

const LoginDialog = ({ open, onOpenChange, onLogin }: LoginDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center">Faça login para continuar</DialogTitle>
          <DialogDescription className="text-center">
            Você precisa estar logado para finalizar sua compra. Isso garante a segurança da sua transação.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3">
          <Button onClick={onLogin} className="w-full">
            Ir para o login
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full">
            Voltar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
