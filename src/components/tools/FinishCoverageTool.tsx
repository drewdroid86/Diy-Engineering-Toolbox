import React, { useState } from 'react';

export const FinishCoverageTool = () => {
  const [area, setArea] = useState('100');
  const [coverage, setCoverage] = useState('350');
  const [coats, setCoats] = useState('2');

  const a = Number(area) || 0;
  const c = Number(coverage) || 1;
  const n = Number(coats) || 1;

  const totalGallons = (a / c) * n;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Finish Required</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{totalGallons.toFixed(2)}<span className="text-xl ml-1">Gallons</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">≈ {Math.ceil(totalGallons * 4)} Quarts</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Total Area (sq ft)</label>
          <input type="number" value={area} onChange={e => setArea(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Coverage (sq ft/gal)</label>
            <input type="number" value={coverage} onChange={e => setCoverage(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Number of Coats</label>
            <input type="number" value={coats} onChange={e => setCoats(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};
