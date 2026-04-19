import { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';

export const OhmsLawCalculator = () => {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');

  const calculate = (changed: 'v' | 'i' | 'r', val: string) => {
    if (val === '') {
      setV('');
      setI('');
      setR('');
      return;
    }

    const vNum = changed === 'v' ? parseFloat(val) : parseFloat(v);
    const iNum = changed === 'i' ? parseFloat(val) : parseFloat(i);
    const rNum = changed === 'r' ? parseFloat(val) : parseFloat(r);

    if (changed === 'v') {
      setV(val);
      if (!isNaN(iNum)) {
        const result = vNum / iNum;
        setR(isFinite(result) ? result.toString() : '');
      } else if (!isNaN(rNum)) {
        const result = vNum / rNum;
        setI(isFinite(result) ? result.toString() : '');
      }
    } else if (changed === 'i') {
      setI(val);
      if (!isNaN(vNum)) {
        const result = vNum / iNum;
        setR(isFinite(result) ? result.toString() : '');
      } else if (!isNaN(rNum)) {
        const result = iNum * rNum;
        setV(isFinite(result) ? result.toString() : '');
      }
    } else if (changed === 'r') {
      setR(val);
      if (!isNaN(vNum)) {
        const result = vNum / rNum;
        setI(isFinite(result) ? result.toString() : '');
      } else if (!isNaN(iNum)) {
        const result = iNum * rNum;
        setV(isFinite(result) ? result.toString() : '');
      }
    }
  };
  
    return (
    <CalculatorCard title="Ohm's Law Calculator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalculatorInput label="Voltage" unit="V" value={v} onChange={(e) => calculate('v', e.target.value)} />
        <CalculatorInput label="Current" unit="A" value={i} onChange={(e) => calculate('i', e.target.value)} />
        <CalculatorInput label="Resistance" unit="Ω" value={r} onChange={(e) => calculate('r', e.target.value)} />
      </div>
    </CalculatorCard>
  );
};
