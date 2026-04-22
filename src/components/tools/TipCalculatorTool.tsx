import React, { useState } from 'react';

export const TipCalculatorTool = () => {
  const [bill, setBill] = useState('50');
  const [pct, setPct] = useState('18');
  const [people, setPeople] = useState('1');

  const b = Number(bill) || 0;
  const p = Number(pct) || 0;
  const n = Number(people) || 1;

  const tip = b * (p / 100);
  const total = b + tip;
  const perPerson = total / n;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Per Person</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${perPerson.toFixed(2)}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Total Tip: ${tip.toFixed(2)}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Bill Amount ($)</label>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Tip (%)</label>
            <input type="number" value={pct} onChange={e => setPct(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Split (#)</label>
            <input type="number" value={people} onChange={e => setPeople(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
