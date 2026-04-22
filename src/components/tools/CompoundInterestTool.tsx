import React, { useState } from 'react';
import { TrendingUp, PieChart, Calendar } from 'lucide-react';

export const CompoundInterestTool = () => {
  const [p, setP] = useState('10000');
  const [r, setR] = useState('8');
  const [t, setT] = useState('10');
  const [n, setN] = useState('12'); // Compounding frequency

  const principal = Number(p) || 0;
  const rate = (Number(r) || 0) / 100;
  const time = Number(t) || 0;
  const frequency = Number(n) || 12;
  
  const amount = principal * Math.pow(1 + (rate / frequency), frequency * time);
  const interest = amount - principal;

  // Generate data for a simple chart
  const steps = 5;
  const chartData = Array.from({ length: steps + 1 }, (_, i) => {
    const year = Math.round((time / steps) * i);
    const val = principal * Math.pow(1 + (rate / frequency), frequency * year);
    return { year, val };
  });

  const maxVal = chartData[chartData.length - 1].val;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Future Value</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${Math.round(amount).toLocaleString()}</h2>
          <div className="flex justify-center gap-4 mt-2">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Principal: ${principal.toLocaleString()}</p>
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Interest: ${Math.round(interest).toLocaleString()}</p>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between h-24 gap-2 px-2 mt-4">
          {chartData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-accent/20 rounded-t-lg border-t border-accent/30 transition-all group-hover:bg-accent/40"
                style={{ height: `${(d.val / maxVal) * 100}%` }}
              />
              <span className="text-[8px] font-bold text-gray-500">{d.year}y</span>
            </div>
          ))}
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

        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Compounding Frequency</label>
          <select 
            value={n} 
            onChange={e => setN(e.target.value)} 
            className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-sm focus:border-[#00e5ff] outline-none appearance-none"
          >
            <option value="1">Annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>
    </div>
  );
};
