
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, Zap } from 'lucide-react';

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  icon: 'standard' | 'express' | 'same-day';
}

interface ShippingMethodSelectorProps {
  selectedMethod: string;
  onSelectMethod: (method: ShippingMethod) => void;
}

const ShippingMethodSelector = ({
  selectedMethod,
  onSelectMethod,
}: ShippingMethodSelectorProps) => {
  const shippingMethods: ShippingMethod[] = [
    {
      id: 'standard',
      name: 'Entrega Padrão',
      price: 9.99,
      estimatedDays: '5-7 dias úteis',
      icon: 'standard',
    },
    {
      id: 'express',
      name: 'Entrega Expressa',
      price: 19.99,
      estimatedDays: '2-3 dias úteis',
      icon: 'express',
    },
    {
      id: 'same-day',
      name: 'Entrega no Mesmo Dia',
      price: 29.99,
      estimatedDays: 'Hoje (pedidos até 12h)',
      icon: 'same-day',
    },
  ];

  const getShippingIcon = (type: string) => {
    switch (type) {
      case 'standard':
        return <Truck className="h-5 w-5 text-muted-foreground" />;
      case 'express':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'same-day':
        return <Zap className="h-5 w-5 text-amber-500" />;
      default:
        return <Truck className="h-5 w-5" />;
    }
  };

  const handleChange = (value: string) => {
    const selected = shippingMethods.find((method) => method.id === value);
    if (selected) {
      onSelectMethod(selected);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Método de Entrega</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedMethod}
          onValueChange={handleChange}
          className="space-y-3"
        >
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center space-x-2 border rounded-md p-4 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary bg-primary/5'
                  : 'border-input'
              }`}
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getShippingIcon(method.icon)}
                  <div>
                    <Label
                      htmlFor={method.id}
                      className="font-medium cursor-pointer"
                    >
                      {method.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {method.estimatedDays}
                    </p>
                  </div>
                </div>
                <div className="text-right font-medium">
                  {method.price === 0
                    ? 'Grátis'
                    : `R$ ${method.price.toFixed(2)}`}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ShippingMethodSelector;
