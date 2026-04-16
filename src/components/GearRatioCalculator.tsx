import React, { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';
import { ResultDisplay } from './ui/ResultDisplay';

export const GearRatioCalculator = () => {
  const [teethIn, setTeethIn] = useState('');
  const [teethOut, setTeethOut] = useState('');
  const [rpmIn, setRpmIn] = useState('');

  const teethInNum = parseFloat(teethIn);
  const teethOutNum = parseFloat(teethOut);
  const rpmInNum = parseFloat(rpmIn);

  let ratioDisplay = '';
  let rpmOut = '';

  if (!isNaN(teethInNum) && !isNaN(teethOutNum) && teethInNum !== 0) {
    const calculatedRatio = teethOutNum / teethInNum;
    if (calculatedRatio >= 1) {
        ratioDisplay = `${calculatedRatio.toFixed(2)}:1`;
    } else {
        ratioDisplay = `1:${(1/calculatedRatio).toFixed(2)}`;
    }
    
    if (!isNaN(rpmInNum)) {
      rpmOut = (rpmInNum / calculatedRatio).toFixed(2);
    }
  }


  return (
    <CalculatorCard title="Gear Ratio Calculator">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalculatorInput label="Driving Gear Teeth" value={teethIn} onChange={(e) => setTeethIn(e.target.value)} />
        <CalculatorInput label="Driven Gear Teeth" value={teethOut} onChange={(e) => setTeethOut(e.target.value)} />
        <CalculatorInput label="Input Speed" unit="RPM" value={rpmIn} onChange={(e) => setRpmIn(e.target.value)} />
      </div>
      {ratioDisplay && <ResultDisplay label="Gear Ratio" value={ratioDisplay} />}
      {rpmOut && <ResultDisplay label="Output Speed" value={rpmOut} unit="RPM" />}
    </CalculatorCard>
  );
};
