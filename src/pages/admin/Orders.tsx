
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  Package,
  ShoppingCart,
  Calendar,
  User,
  MapPin,
  CreditCard
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface Order {
  id: string;
  customerName: string;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'João Silva',
    date: new Date('2024-04-10'),
    total: 159.80,
    status: 'pending',
    paymentMethod: 'Cartão de Crédito',
    items: [
      { id: '1', name: 'Caneca Personalizada', price: 29.90, quantity: 2 },
      { id: '3', name: 'Caneta Personalizada', price: 19.90, quantity: 5 },
    ],
    shippingAddress: {
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zip: '01310-100'
    }
  },
  {
    id: 'ORD-002',
    customerName: 'Maria Souza',
    date: new Date('2024-04-09'),
    total: 99.80,
    status: 'processing',
    paymentMethod: 'Boleto Bancário',
    items: [
      { id: '2', name: 'Camiseta Básica', price: 49.90, quantity: 2 },
    ],
    shippingAddress: {
      street: 'Rua Augusta, 500',
      city: 'São Paulo',
      state: 'SP',
      zip: '01304-000'
    }
  },
  {
    id: 'ORD-003',
    customerName: 'Pedro Costa',
    date: new Date('2024-04-08'),
    total: 89.90,
    status: 'shipped',
    paymentMethod: 'Pix',
    items: [
      { id: '4', name: 'Blusa de Moletom', price: 89.90, quantity: 1 },
    ],
    shippingAddress: {
      street: 'Rua da Consolação, 200',
      city: 'São Paulo',
      state: 'SP',
      zip: '01301-000'
    }
  },
  {
    id: 'ORD-004',
    customerName: 'Ana Santos',
    date: new Date('2024-04-07'),
    total: 49.70,
    status: 'delivered',
    paymentMethod: 'Cartão de Débito',
    items: [
      { id: '5', name: 'Chaveiro Personalizado', price: 9.90, quantity: 5 },
    ],
    shippingAddress: {
      street: 'Rua Oscar Freire, 300',
      city: 'São Paulo',
      state: 'SP',
      zip: '01426-000'
    }
  },
  {
    id: 'ORD-005',
    customerName: 'Roberto Alves',
    date: new Date('2024-04-06'),
    total: 279.60,
    status: 'canceled',
    paymentMethod: 'Cartão de Crédito',
    items: [
      { id: '1', name: 'Caneca Personalizada', price: 29.90, quantity: 2 },
      { id: '2', name: 'Camiseta Básica', price: 49.90, quantity: 3 },
      { id: '3', name: 'Caneta Personalizada', price: 19.90, quantity: 2 },
    ],
    shippingAddress: {
      street: 'Av. Brigadeiro Faria Lima, 1000',
      city: 'São Paulo',
      state: 'SP',
      zip: '01451-000'
    }
  }
];

const getStatusColor = (status: Order['status']) => {
  switch(status) {
    case 'pending': return 'bg-yellow-500';
    case 'processing': return 'bg-blue-500';
    case 'shipped': return 'bg-purple-500';
    case 'delivered': return 'bg-green-500';
    case 'canceled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadge = (status: Order['status']) => {
  const variants: Record<Order['status'], any> = {
    pending: { variant: 'outline', label: 'Pendente' },
    processing: { variant: 'secondary', label: 'Em Processamento' },
    shipped: { variant: 'default', label: 'Enviado' },
    delivered: { variant: 'default', label: 'Entregue', className: 'bg-green-500 hover:bg-green-600' },
    canceled: { variant: 'destructive', label: 'Cancelado' }
  };
  
  const { variant, label, className } = variants[status];
  
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};

const OrderDetailsDialog = ({ order, isOpen, onClose }: { order: Order | null, isOpen: boolean, onClose: () => void }) => {
  if (!order) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> 
            Pedido #{order.id}
          </DialogTitle>
          <DialogDescription>
            Detalhes completos do pedido
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium flex items-center gap-1 mb-2">
              <User className="h-4 w-4" /> Informações do Cliente
            </h3>
            <div className="bg-muted p-4 rounded-md">
              <p><span className="font-medium">Nome:</span> {order.customerName}</p>
            </div>
            
            <h3 className="text-base font-medium flex items-center gap-1 mt-4 mb-2">
              <MapPin className="h-4 w-4" /> Endereço de Entrega
            </h3>
            <div className="bg-muted p-4 rounded-md">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>CEP: {order.shippingAddress.zip}</p>
            </div>
            
            <h3 className="text-base font-medium flex items-center gap-1 mt-4 mb-2">
              <CreditCard className="h-4 w-4" /> Informações de Pagamento
            </h3>
            <div className="bg-muted p-4 rounded-md">
              <p><span className="font-medium">Método:</span> {order.paymentMethod}</p>
              <p><span className="font-medium">Total:</span> R$ {order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium flex items-center gap-1 mb-2">
              <Package className="h-4 w-4" /> Itens do Pedido
            </h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Qtd</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <h3 className="text-base font-medium flex items-center gap-1 mt-4 mb-2">
              <Calendar className="h-4 w-4" /> Status e Datas
            </h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p><span className="font-medium">Data do Pedido:</span> {format(order.date, 'dd/MM/yyyy')}</p>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="mt-4">
                <Label htmlFor="status">Atualizar Status</Label>
                <Select defaultValue={order.status}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Status do pedido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="processing">Em Processamento</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregue</SelectItem>
                    <SelectItem value="canceled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
          <Button>Atualizar Pedido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredOrders = mockOrders.filter(
    order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    }
  );

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeOrderDetails = () => {
    setIsDialogOpen(false);
    // Delay clearing the order to prevent UI flickering during dialog close animation
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gerenciamento de Pedidos</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por ID ou cliente..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="processing">Em Processamento</SelectItem>
                <SelectItem value="shipped">Enviados</SelectItem>
                <SelectItem value="delivered">Entregues</SelectItem>
                <SelectItem value="canceled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{format(order.date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum pedido encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <OrderDetailsDialog 
        order={selectedOrder} 
        isOpen={isDialogOpen} 
        onClose={closeOrderDetails} 
      />
    </div>
  );
};

export default OrdersPage;
