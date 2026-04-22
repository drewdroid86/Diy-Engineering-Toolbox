import React, { useState } from 'react';

export const SlopeGradeTool = () => {
  const [rise, setRise] = useState('1');
  const [run, setRun] = useState('12');

  const r = Number(rise) || 0;
  const n = Number(run) || 1;
  
  const angle = (Math.atan(r / n) * 180) / Math.PI;
  const percent = (r / n) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-around items-center text-center">
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Angle</p>
            <h2 className="text-3xl font-black text-[#00e5ff]">{angle.toFixed(1)}°</h2>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Grade</p>
            <h2 className="text-3xl font-black text-white">{percent.toFixed(1)}%</h2>
          </div>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-6">
        <div className="relative h-24 bg-black/20 rounded-xl overflow-hidden border border-white/5">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d={`M 10 35 L 90 35 L 90 ${35 - (r/n * 30)} Z`} fill="none" stroke="#00e5ff" strokeWidth="1" />
            <path d={`M 10 35 L 90 ${35 - (r/n * 30)}`} fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Rise</label>
            <input type="number" value={rise} onChange={e => setRise(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Run</label>
            <input type="number" value={run} onChange={e => setRun(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};
