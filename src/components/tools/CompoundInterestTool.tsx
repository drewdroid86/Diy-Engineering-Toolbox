import React, { useState } from 'react';

export const CompoundInterestTool = () => {
  const [p, setP] = useState('10000');
  const [r, setR] = useState('8');
  const [t, setT] = useState('10');

  const principal = Number(p) || 0;
  const rate = (Number(r) || 0) / 100;
  const time = Number(t) || 0;
  const amount = principal * Math.pow(1 + rate, time);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Future Value</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${Math.round(amount).toLocaleString()}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Growth: +${Math.round(amount - principal).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Initial Deposit ($)</label>
          <input type="number" value={p} onChange={e => setP(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Ann. Rate (%)</label>
            <input type="number" value={r} onChange={e => setR(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Years</label>
            <input type="number" value={t} onChange={e => setT(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
