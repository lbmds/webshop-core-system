
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Truck,
  Save
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number | null; // null para frete grátis
  minOrder: number | null; // valor mínimo para frete grátis
  estimatedDays: string;
  isActive: boolean;
}

interface ShippingRegion {
  id: string;
  region: string;
  additionalFee: number;
  isActive: boolean;
}

const mockShippingMethods: ShippingMethod[] = [
  {
    id: '1',
    name: 'Padrão',
    description: 'Entrega em até 7 dias úteis',
    price: 12.90,
    minOrder: null,
    estimatedDays: '3-7',
    isActive: true
  },
  {
    id: '2',
    name: 'Expresso',
    description: 'Entrega em até 3 dias úteis',
    price: 25.90,
    minOrder: null,
    estimatedDays: '1-3',
    isActive: true
  },
  {
    id: '3',
    name: 'Frete Grátis',
    description: 'Para compras acima de R$ 150',
    price: null,
    minOrder: 150,
    estimatedDays: '3-7',
    isActive: true
  }
];

const mockShippingRegions: ShippingRegion[] = [
  { id: '1', region: 'Norte', additionalFee: 15.0, isActive: true },
  { id: '2', region: 'Nordeste', additionalFee: 12.0, isActive: true },
  { id: '3', region: 'Centro-Oeste', additionalFee: 8.0, isActive: true },
  { id: '4', region: 'Sudeste', additionalFee: 0, isActive: true },
  { id: '5', region: 'Sul', additionalFee: 5.0, isActive: true },
];

const ShippingMethodDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" /> Novo Método de Entrega
          </DialogTitle>
          <DialogDescription>
            Adicione um novo método de entrega para sua loja
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Nome do método de entrega" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input id="description" placeholder="Descrição do método de entrega" />
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <Switch id="free-shipping" checked={isFreeShipping} onCheckedChange={setIsFreeShipping} />
            <Label htmlFor="free-shipping">Frete Grátis</Label>
          </div>
          
          {isFreeShipping ? (
            <div className="grid gap-2">
              <Label htmlFor="min-order">Valor Mínimo para Frete Grátis (R$)</Label>
              <Input id="min-order" type="number" min="0" step={0.01} placeholder="0.00" />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="price">Preço do Frete (R$)</Label>
              <Input id="price" type="number" min="0" step={0.01} placeholder="0.00" />
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="estimated-days">Prazo Estimado de Entrega (dias)</Label>
            <Input id="estimated-days" placeholder="Ex: 3-5" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="active" defaultChecked />
            <Label htmlFor="active">Ativo</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ShippingRegionDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Região de Entrega</DialogTitle>
          <DialogDescription>
            Adicione uma taxa adicional para entrega em uma região específica
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="region">Região</Label>
            <Input id="region" placeholder="Nome da região" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="additional-fee">Taxa Adicional (R$)</Label>
            <Input id="additional-fee" type="number" min="0" step={0.01} placeholder="0.00" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="active" defaultChecked />
            <Label htmlFor="active">Ativo</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ShippingSettingsCard = () => {
  const [generalSettings, setGeneralSettings] = useState({
    freeShippingThreshold: 150,
    showEstimatedDates: true,
    defaultShippingMethod: '1'
  });
  
  const handleSave = () => {
    // Em um sistema real, salvaria as configurações
    alert('Configurações salvas com sucesso!');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
        <CardDescription>
          Configure as opções gerais de frete da sua loja
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="free-shipping-threshold">
            Valor Mínimo para Frete Grátis (R$)
          </Label>
          <Input 
            id="free-shipping-threshold" 
            type="number"
            min="0"
            step={0.01}
            value={generalSettings.freeShippingThreshold}
            onChange={(e) => setGeneralSettings({
              ...generalSettings,
              freeShippingThreshold: parseFloat(e.target.value)
            })}
          />
          <p className="text-xs text-muted-foreground">
            Configure 0 para desativar o frete grátis automático
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="show-estimated-dates" 
            checked={generalSettings.showEstimatedDates}
            onCheckedChange={(checked) => setGeneralSettings({
              ...generalSettings,
              showEstimatedDates: checked
            })}
          />
          <Label htmlFor="show-estimated-dates">
            Exibir datas estimadas de entrega
          </Label>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ShippingPage = () => {
  const [methodDialogOpen, setMethodDialogOpen] = useState(false);
  const [regionDialogOpen, setRegionDialogOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações de Frete</h1>
      
      <ShippingSettingsCard />
      
      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="methods">Métodos de Entrega</TabsTrigger>
          <TabsTrigger value="regions">Regiões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="methods" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Métodos de Entrega</h2>
            <Button onClick={() => setMethodDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Novo Método
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockShippingMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell className="font-medium">{method.name}</TableCell>
                      <TableCell>{method.description}</TableCell>
                      <TableCell>
                        {method.price !== null ? 
                          `R$ ${method.price.toFixed(2)}` : 
                          method.minOrder !== null ? 
                            `Grátis acima de R$ ${method.minOrder.toFixed(2)}` : 
                            'Grátis'}
                      </TableCell>
                      <TableCell>{method.estimatedDays} dias úteis</TableCell>
                      <TableCell>
                        <Badge variant={method.isActive ? "default" : "outline"}>
                          {method.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Regiões</h2>
            <Button onClick={() => setRegionDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Nova Região
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Taxas Adicionais por Região</CardTitle>
              <CardDescription>
                Configure taxas adicionais de entrega para diferentes regiões
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Região</TableHead>
                    <TableHead>Taxa Adicional</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockShippingRegions.map((region) => (
                    <TableRow key={region.id}>
                      <TableCell className="font-medium">{region.region}</TableCell>
                      <TableCell>
                        {region.additionalFee > 0 ? 
                          `+ R$ ${region.additionalFee.toFixed(2)}` : 
                          'Sem taxa adicional'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={region.isActive ? "default" : "outline"}>
                          {region.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <ShippingMethodDialog 
        isOpen={methodDialogOpen}
        onClose={() => setMethodDialogOpen(false)}
      />
      
      <ShippingRegionDialog 
        isOpen={regionDialogOpen}
        onClose={() => setRegionDialogOpen(false)}
      />
    </div>
  );
};

export default ShippingPage;
