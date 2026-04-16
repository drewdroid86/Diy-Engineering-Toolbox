import React, { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';
import { ResultDisplay } from './ui/ResultDisplay';

export const ConcreteVolumeCalculator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');

  const lengthNum = parseFloat(length);
  const widthNum = parseFloat(width);
  const thicknessNum = parseFloat(thickness);

  let volumeCubicFeet = 0;
  let volumeCubicYards = '';
  let volumeCubicMeters = '';

  if (!isNaN(lengthNum) && !isNaN(widthNum) && !isNaN(thicknessNum)) {
    const thicknessInFeet = thicknessNum / 12;
    volumeCubicFeet = lengthNum * widthNum * thicknessInFeet;
    volumeCubicYards = (volumeCubicFeet / 27).toFixed(2);
    volumeCubicMeters = (volumeCubicFeet / 35.3147).toFixed(2);
  }

  return (
    <CalculatorCard title="Concrete Volume Calculator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalculatorInput label="Length" unit="feet" value={length} onChange={(e) => setLength(e.target.value)} />
        <CalculatorInput label="Width" unit="feet" value={width} onChange={(e) => setWidth(e.target.value)} />
        <CalculatorInput label="Thickness" unit="inches" value={thickness} onChange={(e) => setThickness(e.target.value)} />
      </div>
      {volumeCubicYards && <ResultDisplay label="Volume" value={volumeCubicYards} unit="cubic yards" />}
      {volumeCubicMeters && <p className="text-xl text-muted-foreground mt-4">({volumeCubicMeters} cubic meters)</p>}
    </CalculatorCard>
  );
};
