
import React from 'react';
import { Zap, Ruler, Calculator, Settings, MessageSquare } from 'lucide-react';

export type ToolCategory = 'Electrical' | 'Mechanical' | 'General' | 'Civil' | 'AI Assistant';

export const TOOLS: Record<ToolCategory, { name: string; icon: React.ReactNode; description: string }[]> = {
  Electrical: [
    { name: "Ohm's Law", icon: <Zap className="w-5 h-5" />, description: 'Calculate Voltage, Current, or Resistance.' },
    { name: 'Resistor Color Code', icon: <Zap className="w-5 h-5" />, description: 'Determine resistor values from color bands.' },
    { name: 'Voltage Divider', icon: <Zap className="w-5 h-5" />, description: 'Calculate output voltage from a voltage divider.' },
    { name: 'LED Resistor', icon: <Zap className="w-5 h-5" />, description: 'Calculate the required resistor for an LED.' },
  ],
  Mechanical: [
    { name: 'Torque Calculator', icon: <Ruler className="w-5 h-5" />, description: 'Calculate torque based on force and distance.' },
    { name: 'Gear Ratio', icon: <Settings className="w-5 h-5" />, description: 'Calculate gear ratios.' },
  ],
  Civil: [
      { name: 'Concrete Volume', icon: <Calculator className="w-5 h-5" />, description: 'Calculate volume of concrete needed.' },
      { name: 'Slope Calculator', icon: <Ruler className="w-5 h-5" />, description: 'Calculate slope from rise and run.' },
  ],
  General: [
    { name: 'Unit Converter', icon: <Calculator className="w-5 h-5" />, description: 'Convert between various engineering units.' },
  ],
  'AI Assistant': [
    { name: 'Gemini Assistant', icon: <MessageSquare className="w-5 h-5" />, description: 'Ask an engineering question to AI.' },
  ],
};

export const FORMULAS: Record<ToolCategory, { name: string; formula: string }[]> = {
  Electrical: [
      { name: "Ohm's Law", formula: 'V = I * R' },
      { name: 'Power', formula: 'P = V * I' },
      { name: 'Voltage Divider', formula: 'Vout = Vin * (R2 / (R1 + R2))' },
  ],
  Mechanical: [
      { name: 'Torque', formula: 'T = F * r' },
      { name: 'Gear Ratio', formula: 'Ratio = Teeth_Out / Teeth_In' },
  ],
  Civil: [
      { name: 'Stress', formula: 'σ = F / A' },
      { name: 'Slope', formula: 'Slope = Rise / Run' },
  ],
  General: [],
  'AI Assistant': [],
};
