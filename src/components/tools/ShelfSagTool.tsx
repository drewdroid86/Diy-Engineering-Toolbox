import React, { useState } from 'react';

export const ShelfSagTool = () => {
  const [load, setLoad] = useState('50');
  const [span, setSpan] = useState('36');
  const [thick, setThick] = useState('0.75');
  const [depth, setDepth] = useState('12');
  const [species, setSpecies] = useState('pine');

  const speciesData: Record<string, number> = {
    pine: 1200000, oak: 1800000, walnut: 1700000, mdf: 500000, plywood: 1000000
  };

  const w = Number(load);
  const L = Number(span);
  const t = Number(thick);
  const d = Number(depth);
  const E = speciesData[species];

  const deflection = (5 * w * Math.pow(L, 3)) / (384 * E * (d * Math.pow(t, 3) / 12));

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Estimated Sag</p>
          <h2 className={`text-4xl font-black ${deflection > 0.03 ? 'text-[#ff1744]' : 'text-[#00e5ff]'}`}>
            {deflection.toFixed(4)}<span className="text-xl ml-1">in</span>
          </h2>
          <p className="text-xs font-bold text-white/60 mt-1">
            {deflection > 0.03 ? 'Noticeable sagging expected' : 'Acceptable deflection'}
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Load (lbs)</label>
            <input type="number" value={load} onChange={e => setLoad(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Span (in)</label>
            <input type="number" value={span} onChange={e => setSpan(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Thickness (in)</label>
            <input type="number" value={thick} onChange={e => setThick(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Depth (in)</label>
            <input type="number" value={depth} onChange={e => setDepth(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Material Species</label>
          <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none">
            {Object.keys(speciesData).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};
