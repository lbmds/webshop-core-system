
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Save,
  Store,
  CreditCard,
  Mail,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const StoreSettingsForm = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Produtos Personalizados 2025',
    storeEmail: 'contato@produtospersonalizados.com',
    storePhone: '(11) 98765-4321',
    storeAddress: 'Av. Paulista, 1000, São Paulo - SP',
    logoUrl: '',
    allowGuestCheckout: true,
    requirePhone: true,
    showOutOfStock: true,
    enableReviews: true,
    currencySymbol: 'R$',
    currencyCode: 'BRL',
  });
  
  const handleSave = () => {
    alert('Configurações salvas com sucesso!');
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Nome da Loja</Label>
            <Input 
              id="store-name" 
              value={storeSettings.storeName} 
              onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-email">E-mail da Loja</Label>
            <Input 
              id="store-email" 
              type="email" 
              value={storeSettings.storeEmail} 
              onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-phone">Telefone de Contato</Label>
            <Input 
              id="store-phone" 
              value={storeSettings.storePhone} 
              onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-address">Endereço</Label>
            <Textarea 
              id="store-address" 
              rows={3} 
              value={storeSettings.storeAddress} 
              onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logo-url">URL do Logo</Label>
            <Input 
              id="logo-url" 
              value={storeSettings.logoUrl} 
              onChange={(e) => setStoreSettings({...storeSettings, logoUrl: e.target.value})}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Opções de Exibição</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-out-of-stock"
                  checked={storeSettings.showOutOfStock}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, showOutOfStock: checked})}
                />
                <Label htmlFor="show-out-of-stock">Exibir produtos fora de estoque</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enable-reviews"
                  checked={storeSettings.enableReviews}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, enableReviews: checked})}
                />
                <Label htmlFor="enable-reviews">Habilitar avaliações de produtos</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Opções de Checkout</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="allow-guest-checkout"
                  checked={storeSettings.allowGuestCheckout}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, allowGuestCheckout: checked})}
                />
                <Label htmlFor="allow-guest-checkout">Permitir checkout como convidado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="require-phone"
                  checked={storeSettings.requirePhone}
                  onCheckedChange={(checked) => setStoreSettings({...storeSettings, requirePhone: checked})}
                />
                <Label htmlFor="require-phone">Exigir telefone no checkout</Label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency-symbol">Símbolo da Moeda</Label>
              <Input 
                id="currency-symbol" 
                value={storeSettings.currencySymbol} 
                onChange={(e) => setStoreSettings({...storeSettings, currencySymbol: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency-code">Código da Moeda</Label>
              <Input 
                id="currency-code" 
                value={storeSettings.currencyCode} 
                onChange={(e) => setStoreSettings({...storeSettings, currencyCode: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

const PaymentSettingsForm = () => {
  const [paymentSettings, setPaymentSettings] = useState({
    enableBankTransfer: true,
    enableCreditCard: true,
    enablePix: true,
    enableBoleto: true,
    bankName: 'Banco do Brasil',
    accountName: 'Produtos Personalizados LTDA',
    accountNumber: '12345-6',
    accountAgency: '7890',
    pixKey: 'contato@produtospersonalizados.com',
  });
  
  const handleSave = () => {
    alert('Configurações de pagamento salvas com sucesso!');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Métodos de Pagamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="flex items-center space-x-2">
            <Switch 
              id="enable-bank-transfer"
              checked={paymentSettings.enableBankTransfer}
              onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableBankTransfer: checked})}
            />
            <Label htmlFor="enable-bank-transfer">Transferência Bancária</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="enable-credit-card"
              checked={paymentSettings.enableCreditCard}
              onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableCreditCard: checked})}
            />
            <Label htmlFor="enable-credit-card">Cartão de Crédito</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="enable-pix"
              checked={paymentSettings.enablePix}
              onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePix: checked})}
            />
            <Label htmlFor="enable-pix">PIX</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="enable-boleto"
              checked={paymentSettings.enableBoleto}
              onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableBoleto: checked})}
            />
            <Label htmlFor="enable-boleto">Boleto Bancário</Label>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium">Dados para Transferência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="space-y-2">
            <Label htmlFor="bank-name">Nome do Banco</Label>
            <Input 
              id="bank-name" 
              value={paymentSettings.bankName} 
              onChange={(e) => setPaymentSettings({...paymentSettings, bankName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-name">Nome da Conta</Label>
            <Input 
              id="account-name" 
              value={paymentSettings.accountName} 
              onChange={(e) => setPaymentSettings({...paymentSettings, accountName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-number">Número da Conta</Label>
            <Input 
              id="account-number" 
              value={paymentSettings.accountNumber} 
              onChange={(e) => setPaymentSettings({...paymentSettings, accountNumber: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="account-agency">Agência</Label>
            <Input 
              id="account-agency" 
              value={paymentSettings.accountAgency} 
              onChange={(e) => setPaymentSettings({...paymentSettings, accountAgency: e.target.value})}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-medium">Dados do PIX</h3>
        <div className="space-y-2 mt-3">
          <Label htmlFor="pix-key">Chave PIX</Label>
          <Input 
            id="pix-key" 
            value={paymentSettings.pixKey} 
            onChange={(e) => setPaymentSettings({...paymentSettings, pixKey: e.target.value})}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

const EmailSettingsForm = () => {
  const [emailSettings, setEmailSettings] = useState({
    fromEmail: 'no-reply@produtospersonalizados.com',
    fromName: 'Produtos Personalizados 2025',
    sendOrderConfirmation: true,
    sendShippingNotification: true,
    sendPaymentConfirmation: true,
    orderConfirmationSubject: 'Pedido #%s Confirmado',
    shippingNotificationSubject: 'Seu pedido #%s foi enviado',
    paymentConfirmationSubject: 'Pagamento do pedido #%s recebido',
  });
  
  const handleSave = () => {
    alert('Configurações de e-mail salvas com sucesso!');
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from-email">E-mail de Remetente</Label>
          <Input 
            id="from-email" 
            value={emailSettings.fromEmail} 
            onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="from-name">Nome de Remetente</Label>
          <Input 
            id="from-name" 
            value={emailSettings.fromName} 
            onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
          />
        </div>
      </div>
      
      <Separator />
      
      <h3 className="text-lg font-medium">E-mails de Notificação</h3>
      <div className="space-y-4 mt-3">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Switch 
              id="order-confirmation"
              checked={emailSettings.sendOrderConfirmation}
              onCheckedChange={(checked) => setEmailSettings({...emailSettings, sendOrderConfirmation: checked})}
            />
            <Label htmlFor="order-confirmation">Confirmação de Pedido</Label>
          </div>
          <div className="space-y-2">
            <Input 
              value={emailSettings.orderConfirmationSubject}
              onChange={(e) => setEmailSettings({...emailSettings, orderConfirmationSubject: e.target.value})}
              placeholder="Assunto do e-mail"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Switch 
              id="shipping-notification"
              checked={emailSettings.sendShippingNotification}
              onCheckedChange={(checked) => setEmailSettings({...emailSettings, sendShippingNotification: checked})}
            />
            <Label htmlFor="shipping-notification">Notificação de Envio</Label>
          </div>
          <div className="space-y-2">
            <Input 
              value={emailSettings.shippingNotificationSubject}
              onChange={(e) => setEmailSettings({...emailSettings, shippingNotificationSubject: e.target.value})}
              placeholder="Assunto do e-mail"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Switch 
              id="payment-confirmation"
              checked={emailSettings.sendPaymentConfirmation}
              onCheckedChange={(checked) => setEmailSettings({...emailSettings, sendPaymentConfirmation: checked})}
            />
            <Label htmlFor="payment-confirmation">Confirmação de Pagamento</Label>
          </div>
          <div className="space-y-2">
            <Input 
              value={emailSettings.paymentConfirmationSubject}
              onChange={(e) => setEmailSettings({...emailSettings, paymentConfirmationSubject: e.target.value})}
              placeholder="Assunto do e-mail"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      
      <Tabs defaultValue="store" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="store" className="flex items-center gap-1">
            <Store className="h-4 w-4" /> Loja
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" /> Pagamentos
          </TabsTrigger>
          <TabsTrigger value="emails" className="flex items-center gap-1">
            <Mail className="h-4 w-4" /> E-mails
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Loja</CardTitle>
              <CardDescription>
                Gerencie as configurações básicas da sua loja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StoreSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>
                Configure os métodos de pagamento disponíveis na sua loja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="emails" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de E-mail</CardTitle>
              <CardDescription>
                Configure as notificações por e-mail para você e seus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
