import React, { useState } from 'react';

const colors = [
  { name: 'Black', value: 0 },
  { name: 'Brown', value: 1 },
  { name: 'Red', value: 2 },
  { name: 'Orange', value: 3 },
  { name: 'Yellow', value: 4 },
  { name: 'Green', value: 5 },
  { name: 'Blue', value: 6 },
  { name: 'Violet', value: 7 },
  { name: 'Gray', value: 8 },
  { name: 'White', value: 9 },
];

export const ResistorColorCodeCalculator = () => {
  const [band1, setBand1] = useState(0);
  const [band2, setBand2] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [tolerance, setTolerance] = useState(5);

  const resistance = ((band1 * 10 + band2) * multiplier);

  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Resistor Color Code</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Band 1</label>
          <select onChange={(e) => setBand1(parseInt(e.target.value))} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            {colors.map(c => <option key={c.name} value={c.value}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Band 2</label>
          <select onChange={(e) => setBand2(parseInt(e.target.value))} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            {colors.map(c => <option key={c.name} value={c.value}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Multiplier</label>
          <select onChange={(e) => setMultiplier(Math.pow(10, parseInt(e.target.value)))} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            {colors.map(c => <option key={c.name} value={c.value}>10^{c.value}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Tolerance</label>
          <select onChange={(e) => setTolerance(parseInt(e.target.value))} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            <option value={1}>Brown (1%)</option>
            <option value={2}>Red (2%)</option>
            <option value={5}>Gold (5%)</option>
            <option value={10}>Silver (10%)</option>
          </select>
        </div>
      </div>
      <p className="text-2xl font-bold mt-8">Resistance: {resistance} Ω ±{tolerance}%</p>
    </div>
  );
};
