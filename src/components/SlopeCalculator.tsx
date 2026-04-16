import React, { useState } from 'react';
import { CalculatorCard } from './ui/CalculatorCard';
import { CalculatorInput } from './ui/CalculatorInput';
import { ResultDisplay } from './ui/ResultDisplay';

export const SlopeCalculator = () => {
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');

  const riseNum = parseFloat(rise);
  const runNum = parseFloat(run);

  let slopeRatio = '';
  let slopePercentage = '';

  if (!isNaN(riseNum) && !isNaN(runNum) && runNum !== 0) {
    const slope = riseNum / runNum;
    slopeRatio = `1:${(1/slope).toFixed(2)}`;
    slopePercentage = (slope * 100).toFixed(2);
  }

  return (
    <CalculatorCard title="Slope Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalculatorInput label="Rise" value={rise} onChange={(e) => setRise(e.target.value)} />
        <CalculatorInput label="Run" value={run} onChange={(e) => setRun(e.target.value)} />
      </div>
      {slopePercentage && <ResultDisplay label="Slope" value={slopePercentage} unit="%" />}
      {slopeRatio && <p className="text-xl text-muted-foreground mt-4">(Ratio {slopeRatio})</p>}
    </CalculatorCard>
  );
};
