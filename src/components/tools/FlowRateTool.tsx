import React, { useState } from 'react';

export const FlowRateTool = () => {
  const [diameter, setDiameter] = useState('2');
  const [velocity, setVelocity] = useState('5');

  const d = Number(diameter) / 12; // feet
  const v = Number(velocity); // ft/s
  const area = Math.PI * Math.pow(d / 2, 2);
  const flowCFS = area * v;
  const flowGPM = flowCFS * 448.831;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Flow Rate</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{flowGPM.toFixed(1)}<span className="text-xl ml-1">GPM</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">{flowCFS.toFixed(3)} ft³/s</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Pipe Inner Diameter (in)</label>
          <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Flow Velocity (ft/s)</label>
          <input type="number" value={velocity} onChange={e => setVelocity(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};
