
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CheckoutStepProps {
  title: string;
  step: number;
  currentStep: 'address' | 'shipping' | 'payment';
  stepName: 'address' | 'shipping' | 'payment';
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isDisabled: boolean;
  completedInfo?: React.ReactNode;
  children: React.ReactNode;
}

export const CheckoutStep = ({
  title,
  step,
  currentStep,
  stepName,
  isOpen,
  onOpenChange,
  isDisabled,
  completedInfo,
  children
}: CheckoutStepProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger asChild>
        <div className={`flex items-center justify-between p-4 ${isDisabled ? 'bg-muted/50 text-muted-foreground' : 'bg-muted'} rounded-t-md ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
          <h2 className="text-lg font-semibold">
            {step}. {title}
            {completedInfo && !isOpen && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {completedInfo}
              </span>
            )}
          </h2>
          <span className="text-muted-foreground">
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
