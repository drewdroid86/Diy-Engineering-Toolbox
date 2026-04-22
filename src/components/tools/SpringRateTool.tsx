import React, { useState } from 'react';

export const SpringRateTool = () => {
  const [wire, setWire] = useState('2');
  const [coil, setCoil] = useState('20');
  const [active, setActive] = useState('5');

  const d = Number(wire) || 1;
  const D = Number(coil) || 1;
  const n = Number(active) || 1;
  const G = 80000; // Shear modulus for steel in MPa

  const rateNmm = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * n);
  const rateLbIn = rateNmm * 5.710147;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Spring Rate</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{rateLbIn.toFixed(2)}<span className="text-xl ml-1">lb/in</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">{rateNmm.toFixed(2)} N/mm</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Wire Diameter (mm)</label>
          <input type="number" value={wire} onChange={e => setWire(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Coil Diameter (mm)</label>
          <input type="number" value={coil} onChange={e => setCoil(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Active Coils</label>
          <input type="number" value={active} onChange={e => setActive(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};
