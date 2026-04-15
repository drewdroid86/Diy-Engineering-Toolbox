import React, { useState } from 'react';

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
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Voltage Divider Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Input Voltage (Vin)</label>
          <input type="number" value={vin} onChange={(e) => setVin(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Resistor 1 (R1)</label>
          <input type="number" value={r1} onChange={(e) => setR1(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Resistor 2 (R2)</label>
          <input type="number" value={r2} onChange={(e) => setR2(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <p className="text-2xl font-bold mt-8">Output Voltage (Vout): {vout} V</p>
    </div>
  );
};
