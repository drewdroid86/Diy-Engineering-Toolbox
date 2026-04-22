import React, { useState } from 'react';

export const RebarWeightTool = () => {
  const [size, setSize] = useState('4');
  const [length, setLength] = useState('20');

  const rebarData: Record<string, number> = {
    '3': 0.376, '4': 0.668, '5': 1.043, '6': 1.502, '7': 2.044, '8': 2.670, '9': 3.400, '10': 4.303, '11': 5.313
  };

  const weightLb = (rebarData[size] || 0) * Number(length);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Weight</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{weightLb.toFixed(2)}<span className="text-xl ml-1">lbs</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">{(weightLb * 0.453592).toFixed(2)} kg</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Rebar Size (US #)</label>
          <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all">
            {Object.keys(rebarData).map(s => <option key={s} value={s}>#{s} ({(Number(s)*0.125).toFixed(3)}")</option>)}
          </select>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Total Length (ft)</label>
          <input type="number" value={length} onChange={e => setLength(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};
