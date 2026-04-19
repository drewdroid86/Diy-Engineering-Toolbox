
import { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';
import { ResultDisplay } from './ui/ResultDisplay';

export const TorqueCalculator = () => {
  const [force, setForce] = useState('');
  const [distance, setDistance] = useState('');
  const [angle, setAngle] = useState('90');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const rad = (parseFloat(angle) * Math.PI) / 180;
    setResult(parseFloat(force) * parseFloat(distance) * Math.sin(rad));
  };

  return (
    <CalculatorCard title="Torque Calculator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <CalculatorInput label="Force" unit="N" value={force} onChange={(e) => setForce(e.target.value)} />
        <CalculatorInput label="Distance" unit="m" value={distance} onChange={(e) => setDistance(e.target.value)} />
        <CalculatorInput label="Angle" unit="deg" value={angle} onChange={(e) => setAngle(e.target.value)} />
      </div>
      <button onClick={calculate} className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-6 rounded-lg transition w-full">Calculate</button>
      {result !== null && (
        <ResultDisplay label="Calculated Torque" value={result.toFixed(2)} unit="Nm" />
      )}
    </CalculatorCard>
  );
};
