
import React from 'react';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  unit?: string;
}

export const CalculatorInput = ({ label, value, onChange, placeholder, unit }: CalculatorInputProps) => {
  return (
    <div>
      <label className="block text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wider">{label}</label>
      <div className="relative">
        <input 
          type="number" 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder} 
          className="w-full p-3 bg-input text-foreground border border-border rounded-lg" 
        />
        {unit && <span className="absolute right-3 top-2.5 text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};
