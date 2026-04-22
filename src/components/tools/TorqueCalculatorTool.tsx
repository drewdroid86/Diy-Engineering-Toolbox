import React, { useState } from 'react';

export const TorqueCalculatorTool = () => {
  const [force, setForce] = useState('10');
  const [distance, setDistance] = useState('0.5');
  const [unit, setUnit] = useState<'Nm' | 'ftlbf' | 'inlbf'>('Nm');

  const f = Number(force) || 0;
  const d = Number(distance) || 0;
  const torqueNm = f * d;

  const conversions: Record<string, number> = {
    'Nm': 1,
    'ftlbf': 0.73756,
    'inlbf': 8.8507,
  };

  const result = torqueNm * conversions[unit];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Resulting Torque</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{result.toFixed(2)}<span className="text-xl ml-1">{unit}</span></h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Force (N)</label>
          <input type="number" value={force} onChange={e => setForce(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Distance (m)</label>
          <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Output Unit</label>
          <div className="flex gap-2">
            {(['Nm', 'ftlbf', 'inlbf'] as const).map(u => (
              <button key={u} onClick={() => setUnit(u)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${unit === u ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'bg-[#1a1a2e] border border-[#2a2a3a] text-gray-400'}`}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
