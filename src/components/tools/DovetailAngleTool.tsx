import React, { useState } from 'react';

export const DovetailAngleTool = () => {
  const [ratio, setRatio] = useState('1:6');
  const ratios: Record<string, string> = {
    '1:6': '9.5° (Softwoods)',
    '1:7': '8.1° (General)',
    '1:8': '7.1° (Hardwoods)',
    '1:10': '5.7° (Dense/Exotic)',
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Recommended Angle</p>
          <h2 className="text-3xl font-black text-[#00e5ff]">{ratios[ratio]}</h2>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-4">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Select Slope Ratio</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(ratios).map(r => (
            <button key={r} onClick={() => setRatio(r)} className={`py-4 rounded-2xl text-sm font-black transition-all ${ratio === r ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'bg-[#1a1a2e] border border-[#2a2a3a] text-gray-400'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
