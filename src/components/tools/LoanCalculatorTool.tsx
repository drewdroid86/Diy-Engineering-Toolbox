import React, { useState } from 'react';
import { Info, Activity, CreditCard } from 'lucide-react';

export const LoanCalculatorTool = () => {
  const [amount, setAmount] = useState('250000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('30');

  const p = Number(amount) || 0;
  const annualRate = Number(rate) / 100;
  const r = annualRate / 12;
  const n = (Number(years) || 1) * 12;

  const payment = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
  const totalPaid = payment * n;
  const totalInterest = totalPaid - p;

  const interestRatio = (totalInterest / totalPaid) * 100;
  const principalRatio = (p / totalPaid) * 100;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Monthly Payment</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${Math.round(payment).toLocaleString()}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Total: ${Math.round(totalPaid).toLocaleString()}</p>
        </div>

        {/* Breakdown Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
            <span className="text-white/40">Principal</span>
            <span className="text-accent">Interest</span>
          </div>
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden flex border border-white/5">
            <div className="h-full bg-white/20" style={{ width: `${principalRatio}%` }} />
            <div className="h-full bg-accent" style={{ width: `${interestRatio}%` }} />
          </div>
          <div className="flex justify-between items-center text-[9px] font-bold text-gray-500">
            <span>{Math.round(principalRatio)}%</span>
            <span>{Math.round(interestRatio)}%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Loan Amount ($)</label>
          <div className="relative">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-12 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Duration (Years)</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a2e] p-6 rounded-3xl border border-gray-800/50">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-accent" />
          <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Loan Insights</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Total Interest Paid</span>
            <span className="text-xs font-bold text-white">${Math.round(totalInterest).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Daily Interest</span>
            <span className="text-xs font-bold text-white">${((totalInterest / (Number(years) * 365)) || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
