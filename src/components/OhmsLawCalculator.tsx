import React, { useState } from 'react';

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
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Ohm's Law Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Voltage (V)</label>
          <input type="number" value={v} onChange={(e) => calculate('v', e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Current (I)</label>
          <input type="number" value={i} onChange={(e) => calculate('i', e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Resistance (R)</label>
          <input type="number" value={r} onChange={(e) => calculate('r', e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
    </div>
  );
};
