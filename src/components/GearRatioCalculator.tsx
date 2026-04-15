import React, { useState } from 'react';

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
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Gear Ratio Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-muted-foreground mb-2">Driving Gear Teeth</label>
          <input type="number" value={teethIn} onChange={(e) => setTeethIn(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Driven Gear Teeth</label>
          <input type="number" value={teethOut} onChange={(e) => setTeethOut(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2">Input Speed (RPM)</label>
          <input type="number" value={rpmIn} onChange={(e) => setRpmIn(e.target.value)} className="w-full p-3 bg-input text-text rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>
      <p className="text-2xl font-bold mt-8">Gear Ratio: {ratioDisplay}</p>
      {rpmOut && <p className="text-2xl font-bold mt-4">Output Speed: {rpmOut} RPM</p>}
    </div>
  );
};
