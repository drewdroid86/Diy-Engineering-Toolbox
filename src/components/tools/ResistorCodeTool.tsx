import React, { useState } from 'react';

export const ResistorCodeTool = () => {
  const [band1, setBand1] = useState('black');
  const [band2, setBand2] = useState('black');
  const [multiplier, setMultiplier] = useState('black');
  const [tolerance, setTolerance] = useState('brown');

  const colors: Record<string, { val: number, mult: number, tol?: number, hex: string }> = {
    black: { val: 0, mult: 1, hex: '#000000' },
    brown: { val: 1, mult: 10, tol: 1, hex: '#8B4513' },
    red: { val: 2, mult: 100, tol: 2, hex: '#FF0000' },
    orange: { val: 3, mult: 1000, hex: '#FFA500' },
    yellow: { val: 4, mult: 10000, hex: '#FFFF00' },
    green: { val: 5, mult: 100000, tol: 0.5, hex: '#008000' },
    blue: { val: 6, mult: 1000000, tol: 0.25, hex: '#0000FF' },
    violet: { val: 7, mult: 10000000, tol: 0.1, hex: '#EE82EE' },
    gray: { val: 8, mult: 100000000, tol: 0.05, hex: '#808080' },
    white: { val: 9, mult: 1000000000, hex: '#FFFFFF' },
    gold: { val: -1, mult: 0.1, tol: 5, hex: '#FFD700' },
    silver: { val: -1, mult: 0.01, tol: 10, hex: '#C0C0C0' },
  };

  const resistance = (colors[band1].val * 10 + colors[band2].val) * colors[multiplier].mult;
  const tolVal = colors[tolerance].tol;

  const formatRes = (r: number) => {
    if (r >= 1000000) return (r / 1000000).toFixed(1) + 'M Ω';
    if (r >= 1000) return (r / 1000).toFixed(1) + 'k Ω';
    return r + ' Ω';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Resistance Value</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{formatRes(resistance)}</h2>
          <p className="text-sm font-bold text-white/60 mt-1">±{tolVal}% Tolerance</p>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-4">
        <div className="flex justify-between items-center bg-gray-700/20 p-4 rounded-2xl">
          {[band1, band2, multiplier, tolerance].map((c, i) => (
            <div key={i} className="w-4 h-12 rounded-sm shadow-inner" style={{ backgroundColor: colors[c].hex }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Band 1</label>
            <select value={band1} onChange={e => setBand1(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).filter(c => colors[c].val >= 0).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Band 2</label>
            <select value={band2} onChange={e => setBand2(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).filter(c => colors[c].val >= 0).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Multiplier</label>
            <select value={multiplier} onChange={e => setMultiplier(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Tolerance</label>
            <select value={tolerance} onChange={e => setTolerance(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).filter(c => colors[c].tol).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
