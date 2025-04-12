
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

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
          <DialogTitle>Faça login para continuar</DialogTitle>
          <DialogDescription>
            Você precisa estar logado para finalizar sua compra.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onLogin} className="w-full mt-4">
          Ir para o login
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
