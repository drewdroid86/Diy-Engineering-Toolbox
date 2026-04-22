import React, { useState } from 'react';

export const CapacitorCalcTool = () => {
  const [r, setR] = useState('1000');
  const [c, setC] = useState('100');

  const rv = Number(r) || 0;
  const cv = Number(c) || 0;
  const tau = (rv * cv) / 1000000; // seconds (assuming uF)

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Time Constant (τ)</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{tau.toFixed(4)}s</h2>
          <p className="text-sm font-bold text-white/60 mt-1">Full Charge ≈ {(tau * 5).toFixed(3)}s</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Resistance (Ω)</label>
          <input type="number" value={r} onChange={e => setR(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Capacitance (μF)</label>
          <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};
