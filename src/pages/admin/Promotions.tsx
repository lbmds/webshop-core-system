
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
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  Percent,
  BadgePercent
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Promotion {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  appliesTo: 'all' | 'category' | 'product';
  appliesToValue?: string;
}

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  usageLimit: number;
  usedCount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

const mockPromotions: Promotion[] = [
  {
    id: '1',
    name: 'Desconto de Verão',
    type: 'percentage',
    value: 15,
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-04-30'),
    isActive: true,
    appliesTo: 'category',
    appliesToValue: 'Camisas'
  },
  {
    id: '2',
    name: 'Canecas com Desconto',
    type: 'percentage',
    value: 10,
    startDate: new Date('2024-04-05'),
    endDate: new Date('2024-05-05'),
    isActive: true,
    appliesTo: 'category',
    appliesToValue: 'Canecas'
  },
  {
    id: '3',
    name: 'Desconto Especial',
    type: 'fixed',
    value: 20,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    isActive: false,
    appliesTo: 'all'
  }
];

const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    usageLimit: 100,
    usedCount: 42,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true
  },
  {
    id: '2',
    code: 'SUMMER20',
    type: 'percentage',
    value: 20,
    usageLimit: 50,
    usedCount: 12,
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-06-30'),
    isActive: true
  },
  {
    id: '3',
    code: 'DISCOUNT30',
    type: 'fixed',
    value: 30,
    usageLimit: 200,
    usedCount: 0,
    startDate: new Date('2024-04-15'),
    endDate: new Date('2024-05-15'),
    isActive: false
  }
];

const PromotionDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [appliesTo, setAppliesTo] = useState<Promotion['appliesTo']>('all');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BadgePercent className="h-5 w-5" /> Nova Promoção
          </DialogTitle>
          <DialogDescription>
            Crie uma nova promoção para seus produtos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome da Promoção</Label>
            <Input id="name" placeholder="Nome da promoção" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Desconto</Label>
              <Select defaultValue="percentage">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentual (%)</SelectItem>
                  <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">Valor do Desconto</Label>
              <Input id="value" type="number" min="0" step={0.01} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Data de Início</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">Data de Término</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="applies-to">Aplicar a</Label>
            <Select 
              defaultValue="all" 
              onValueChange={(value) => setAppliesTo(value as Promotion['appliesTo'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione onde aplicar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os produtos</SelectItem>
                <SelectItem value="category">Categoria específica</SelectItem>
                <SelectItem value="product">Produto específico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {appliesTo !== 'all' && (
            <div className="grid gap-2">
              <Label htmlFor="applies-to-value">
                {appliesTo === 'category' ? 'Selecione a Categoria' : 'Selecione o Produto'}
              </Label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder={`Selecione ${appliesTo === 'category' ? 'uma categoria' : 'um produto'}`} />
                </SelectTrigger>
                <SelectContent>
                  {appliesTo === 'category' ? (
                    <>
                      <SelectItem value="canecas">Canecas</SelectItem>
                      <SelectItem value="camisas">Camisas</SelectItem>
                      <SelectItem value="canetas">Canetas</SelectItem>
                      <SelectItem value="blusas">Blusas</SelectItem>
                      <SelectItem value="chaveiros">Chaveiros</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="1">Caneca Personalizada</SelectItem>
                      <SelectItem value="2">Camiseta Básica</SelectItem>
                      <SelectItem value="3">Caneta Personalizada</SelectItem>
                      <SelectItem value="4">Blusa de Moletom</SelectItem>
                      <SelectItem value="5">Chaveiro Personalizado</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch id="active" defaultChecked />
            <Label htmlFor="active">Ativa</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button>Salvar Promoção</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CouponDialog = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" /> Novo Cupom
          </DialogTitle>
          <DialogDescription>
            Crie um novo cupom de desconto
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Código do Cupom</Label>
            <Input id="code" placeholder="Ex: WELCOME10" className="uppercase" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Desconto</Label>
              <Select defaultValue="percentage">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentual (%)</SelectItem>
                  <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">Valor do Desconto</Label>
              <Input id="value" type="number" min="0" step={0.01} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Data de Início</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">Data de Término</Label>
              <Input id="end-date" type="date" />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="usage-limit">Limite de Uso</Label>
            <Input id="usage-limit" type="number" min="1" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="active" defaultChecked />
            <Label htmlFor="active">Ativo</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button>Salvar Cupom</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PromotionsPage = () => {
  const [promotionDialogOpen, setPromotionDialogOpen] = useState(false);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestão de Promoções e Cupons</h1>
      
      <Tabs defaultValue="promotions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="promotions" className="flex items-center gap-1">
            <BadgePercent className="h-4 w-4" /> Promoções
          </TabsTrigger>
          <TabsTrigger value="coupons" className="flex items-center gap-1">
            <Tag className="h-4 w-4" /> Cupons
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="promotions" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Promoções</h2>
            <Button onClick={() => setPromotionDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Nova Promoção
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Aplicado a</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPromotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">{promotion.name}</TableCell>
                      <TableCell>
                        {promotion.type === 'percentage' ? (
                          <span className="inline-flex items-center">
                            <Percent className="h-3 w-3 mr-1" /> Percentual
                          </span>
                        ) : (
                          <span>Valor Fixo</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {promotion.type === 'percentage' ? 
                          `${promotion.value}%` : 
                          `R$ ${promotion.value.toFixed(2)}`}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>
                            {format(promotion.startDate, 'dd/MM/yy')} - {format(promotion.endDate, 'dd/MM/yy')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {promotion.appliesTo === 'all' ? 'Todos os produtos' : 
                         promotion.appliesTo === 'category' ? `Categoria: ${promotion.appliesToValue}` : 
                         `Produto: ${promotion.appliesToValue}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={promotion.isActive ? "default" : "outline"}>
                          {promotion.isActive ? "Ativo" : "Inativo"}
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
        
        <TabsContent value="coupons" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cupons</h2>
            <Button onClick={() => setCouponDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Novo Cupom
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Usos</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCoupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">
                        <code className="bg-muted px-1 py-0.5 rounded">{coupon.code}</code>
                      </TableCell>
                      <TableCell>
                        {coupon.type === 'percentage' ? (
                          <span className="inline-flex items-center">
                            <Percent className="h-3 w-3 mr-1" /> Percentual
                          </span>
                        ) : (
                          <span>Valor Fixo</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {coupon.type === 'percentage' ? 
                          `${coupon.value}%` : 
                          `R$ ${coupon.value.toFixed(2)}`}
                      </TableCell>
                      <TableCell>
                        {coupon.usedCount} / {coupon.usageLimit}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>Até {format(coupon.endDate, 'dd/MM/yy')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={coupon.isActive ? "default" : "outline"}>
                          {coupon.isActive ? "Ativo" : "Inativo"}
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
      
      <PromotionDialog
        isOpen={promotionDialogOpen}
        onClose={() => setPromotionDialogOpen(false)}
      />
      
      <CouponDialog
        isOpen={couponDialogOpen}
        onClose={() => setCouponDialogOpen(false)}
      />
    </div>
  );
};

export default PromotionsPage;
