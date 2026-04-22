import React, { useState } from 'react';

export const InvoiceEstimatorTool = () => {
  const [rate, setRate] = useState('75');
  const [hours, setHours] = useState('40');
  const [tax, setTax] = useState('15');

  const r = Number(rate) || 0;
  const h = Number(hours) || 0;
  const t = Number(tax) || 0;
  const sub = r * h;
  const total = sub * (1 + (t / 100));

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Invoice Total</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${total.toLocaleString()}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Subtotal: ${sub.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Hourly Rate ($)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Total Hours</label>
            <input type="number" value={hours} onChange={e => setHours(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Tax (%)</label>
            <input type="number" value={tax} onChange={e => setTax(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
