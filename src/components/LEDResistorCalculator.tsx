import React, { useState } from 'react';

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
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">LED Resistor Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Source Voltage (Vs)</label>
          <input type="number" value={vs} onChange={(e) => setVs(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">LED Forward Voltage (Vf)</label>
          <input type="number" value={vf} onChange={(e) => setVf(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">LED Forward Current (If) (mA)</label>
          <input type="number" value={lif} onChange={(e) => setIf(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <p className="text-2xl font-bold mt-8">Required Resistor (R): {r} Ω</p>
    </div>
  );
};
