import React, { useState } from 'react';

export const BreakEvenTool = () => {
  const [fixed, setFixed] = useState('5000');
  const [variable, setVariable] = useState('25');
  const [price, setPrice] = useState('75');

  const f = Number(fixed) || 0;
  const v = Number(variable) || 0;
  const p = Number(price) || 1;

  const units = p > v ? Math.ceil(f / (p - v)) : 0;
  const revenue = units * p;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Units to Break Even</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{units.toLocaleString()}</h2>
        </div>
        <div className="bg-[#1a1a2e]/50 p-4 rounded-2xl border border-[#2a2a3a] text-center">
          <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Break Even Revenue</p>
          <p className="text-2xl font-black text-white">${revenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Fixed Costs (Total)</label>
          <input type="number" value={fixed} onChange={e => setFixed(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Var. Cost <span className="text-[#00e5ff]">/ Unit</span></label>
            <input type="number" value={variable} onChange={e => setVariable(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Price <span className="text-[#00e5ff]">/ Unit</span></label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};
