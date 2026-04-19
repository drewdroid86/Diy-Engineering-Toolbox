import { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';
import { ResultDisplay } from './ui/ResultDisplay';

export const LEDResistorCalculator = () => {
  const [vs, setVs] = useState('');
  const [vf, setVf] = useState('');
  const [lif, setIf] = useState(''); // current in mA

  const vsNum = parseFloat(vs);
  const vfNum = parseFloat(vf);
  const ifNum = parseFloat(lif);

  let r = '';
  if (!isNaN(vsNum) && !isNaN(vfNum) && !isNaN(ifNum) && ifNum !== 0) {
    const ifA = ifNum / 1000; // convert mA to A
    if (vsNum >= vfNum) {
        const res = (vsNum - vfNum) / ifA;
        r = res.toFixed(2);
    }
  }

  return (
    <CalculatorCard title="LED Resistor Calculator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalculatorInput label="Source Voltage" unit="V" value={vs} onChange={(e) => setVs(e.target.value)} />
        <CalculatorInput label="LED Forward Voltage" unit="V" value={vf} onChange={(e) => setVf(e.target.value)} />
        <CalculatorInput label="LED Forward Current" unit="mA" value={lif} onChange={(e) => setIf(e.target.value)} />
      </div>
      {r && <ResultDisplay label="Required Resistor" value={r} unit="Ω" />}
    </CalculatorCard>
  );
};
