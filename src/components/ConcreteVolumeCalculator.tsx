import React, { useState } from 'react';

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
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Concrete Volume Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Length (feet)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Width (feet)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Thickness (inches)</label>
          <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      {volumeCubicYards && <p className="text-2xl font-bold mt-8">Volume: {volumeCubicYards} cubic yards</p>}
      {volumeCubicMeters && <p className="text-xl text-muted-foreground mt-4">({volumeCubicMeters} cubic meters)</p>}
    </div>
  );
};
