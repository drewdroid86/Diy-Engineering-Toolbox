import React, { useState } from 'react';

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
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Slope Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Rise</label>
          <input type="number" value={rise} onChange={(e) => setRise(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Run</label>
          <input type="number" value={run} onChange={(e) => setRun(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      {slopePercentage && <p className="text-2xl font-bold mt-8">Slope: {slopePercentage}%</p>}
      {slopeRatio && <p className="text-xl text-muted-foreground mt-4">(Ratio {slopeRatio})</p>}
    </div>
  );
};
