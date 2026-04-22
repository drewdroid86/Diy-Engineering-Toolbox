import React, { useState } from 'react';

export const RoiCalculatorTool = () => {
  const [initial, setInitial] = useState('1000');
  const [current, setCurrent] = useState('1500');

  const i = Number(initial) || 1;
  const c = Number(current) || 0;
  const roi = ((c - i) / i) * 100;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Return</p>
          <h2 className={`text-4xl font-black ${roi >= 0 ? 'text-[#00e676]' : 'text-[#ff1744]'}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
          </h2>
          <p className="text-sm font-bold text-white/60 mt-1">Profit: ${(c - i).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Invested ($)</label>
          <input type="number" value={initial} onChange={e => setInitial(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Current ($)</label>
          <input type="number" value={current} onChange={e => setCurrent(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
      </div>
    </div>
  );
};
