import React, { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';
import { ResultDisplay } from './ui/ResultDisplay';

export const VoltageDividerCalculator = () => {
  const [vin, setVin] = useState('');
  const [r1, setR1] = useState('');
  const [r2, setR2] = useState('');

  const vinNum = parseFloat(vin);
  const r1Num = parseFloat(r1);
  const r2Num = parseFloat(r2);

  let vout = '';
  if (!isNaN(vinNum) && !isNaN(r1Num) && !isNaN(r2Num) && (r1Num + r2Num !== 0)) {
    vout = (vinNum * (r2Num / (r1Num + r2Num))).toFixed(4);
  }

  return (
    <CalculatorCard title="Voltage Divider Calculator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalculatorInput label="Input Voltage" unit="V" value={vin} onChange={(e) => setVin(e.target.value)} />
        <CalculatorInput label="Resistor 1" unit="Ω" value={r1} onChange={(e) => setR1(e.target.value)} />
        <CalculatorInput label="Resistor 2" unit="Ω" value={r2} onChange={(e) => setR2(e.target.value)} />
      </div>
      {vout && <ResultDisplay label="Output Voltage" value={vout} unit="V" />}
    </CalculatorCard>
  );
};
