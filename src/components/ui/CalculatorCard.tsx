
import { ReactNode } from 'react';

export const CalculatorCard = ({ title, children }: { title: string, children: ReactNode }) => {
  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      {children}
    </div>
  );
};
