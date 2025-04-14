
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  Download, 
  BarChart3, 
  PieChart, 
  LineChart,
  Calendar
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Por simplicidade, vamos usar componentes de gráficos muito básicos
// Em um sistema real, essas seriam implementações mais completas usando bibliotecas como Recharts

const BarChartPlaceholder = () => (
  <div className="h-[400px] flex flex-col items-center justify-center">
    <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
    <p className="text-muted-foreground">Gráfico de barras mostrando vendas por categoria</p>
  </div>
);

const PieChartPlaceholder = () => (
  <div className="h-[400px] flex flex-col items-center justify-center">
    <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
    <p className="text-muted-foreground">Gráfico de pizza mostrando distribuição de vendas</p>
  </div>
);

const LineChartPlaceholder = () => (
  <div className="h-[400px] flex flex-col items-center justify-center">
    <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
    <p className="text-muted-foreground">Gráfico de linha mostrando tendência de vendas</p>
  </div>
);

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('month');
  
  const dateRangeLabels = {
    'week': 'Última Semana',
    'month': 'Último Mês',
    'quarter': 'Último Trimestre',
    'year': 'Último Ano',
    'all': 'Todo o Período'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Relatórios e Análises</h1>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Calendar className="h-4 w-4 mr-1" />
                {dateRangeLabels[dateRange as keyof typeof dateRangeLabels]}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Período</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setDateRange('week')}>
                  Última Semana
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange('month')}>
                  Último Mês
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange('quarter')}>
                  Último Trimestre
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange('year')}>
                  Último Ano
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange('all')}>
                  Todo o Período
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 24.380,00</div>
            <p className="text-xs text-green-500">+12% comparado ao período anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-xs text-green-500">+8% comparado ao período anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 95,23</div>
            <p className="text-xs text-green-500">+4% comparado ao período anterior</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Período</CardTitle>
                <CardDescription>
                  Evolução de vendas ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartPlaceholder />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Categoria</CardTitle>
                <CardDescription>
                  Distribuição de vendas por categoria de produto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartPlaceholder />
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Vendas por Produto</CardTitle>
              <CardDescription>
                Os produtos mais vendidos no período selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartPlaceholder />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho de Produtos</CardTitle>
              <CardDescription>
                Análise de desempenho por produto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex flex-col items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Gráfico de desempenho de produtos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Clientes</CardTitle>
              <CardDescription>
                Comportamento de compra e segmentação de clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex flex-col items-center justify-center">
                <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Gráfico de segmentação de clientes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
