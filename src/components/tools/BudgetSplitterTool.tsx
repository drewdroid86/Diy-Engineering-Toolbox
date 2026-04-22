import React, { useState } from 'react';

export const BudgetSplitterTool = () => {
  const [income, setIncome] = useState('5000');

  const inc = Number(income) || 0;
  const data = [
    { label: 'Needs (50%)', val: inc * 0.5, color: '#00e5ff' },
    { label: 'Wants (30%)', val: inc * 0.3, color: '#ec4899' },
    { label: 'Savings (20%)', val: inc * 0.2, color: '#00e676' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-4">
        {data.map(d => (
          <div key={d.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-white uppercase tracking-tight">{d.label}</span>
              <span className="text-sm font-black" style={{ color: d.color }}>${Math.round(d.val).toLocaleString()}</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full" style={{ width: d.label.includes('50') ? '50%' : d.label.includes('30') ? '30%' : '20%', backgroundColor: d.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Monthly Take-Home Income</label>
        <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
      </div>
    </div>
  );
};
