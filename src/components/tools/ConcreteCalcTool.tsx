import React, { useState } from 'react';

export const ConcreteCalcTool = () => {
  const [l, setL] = useState('10');
  const [w, setW] = useState('10');
  const [d, setD] = useState('4');

  const length = Number(l) || 0;
  const width = Number(w) || 0;
  const depth = Number(d) || 0;

  const cubicFeet = (length * width * (depth / 12));
  const cubicYards = cubicFeet / 27;
  const bags60 = cubicFeet / 0.45;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Volume</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{cubicYards.toFixed(2)}<span className="text-xl ml-1">yd³</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">≈ {Math.ceil(bags60)} Bags (60lb)</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Length (ft)</label>
            <input type="number" value={l} onChange={e => setL(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Width (ft)</label>
            <input type="number" value={w} onChange={e => setW(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Thickness (in)</label>
          <input type="number" value={d} onChange={e => setD(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};
