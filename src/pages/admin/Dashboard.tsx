
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  ShoppingBag, 
  Tag, 
  TrendingUp, 
  Users 
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: 'Vendas Hoje', value: 'R$ 2.350', icon: TrendingUp, change: '+15%', changeType: 'positive' },
    { title: 'Novos Clientes', value: '12', icon: Users, change: '+7%', changeType: 'positive' },
    { title: 'Pedidos', value: '23', icon: ShoppingBag, change: '-2%', changeType: 'negative' },
    { title: 'Produtos Vendidos', value: '45', icon: Tag, change: '+24%', changeType: 'positive' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === 'positive' 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {stat.change} desde ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
            <CardDescription>Últimas 5 vendas realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 border-b pb-2">
                  <div className="bg-secondary rounded-full p-2">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Pedido #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Cliente {i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R$ {(Math.random() * 200 + 50).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Há {i} hora{i > 1 ? 's' : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <a href="/admin/orders" className="text-sm text-primary hover:underline">
              Ver todos os pedidos
            </a>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Visão Geral de Vendas</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <BarChart className="h-16 w-16 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Gráfico de vendas dos últimos 7 dias</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
