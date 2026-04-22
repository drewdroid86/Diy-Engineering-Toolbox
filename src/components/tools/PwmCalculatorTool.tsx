import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const PwmCalculatorTool = () => {
  const [freq, setFreq] = useState('1000');
  const [duty, setDuty] = useState('50');

  const f = Number(freq) || 1;
  const d = Number(duty) || 0;
  const period = 1000 / f; // ms
  const onTime = period * (d / 100);
  const offTime = period - onTime;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">On / Off Timing</p>
          <h2 className="text-3xl font-black text-[#00e5ff]">{onTime.toFixed(3)}ms / {offTime.toFixed(3)}ms</h2>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-4">
        <div className="relative h-20 bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center">
          <motion.div animate={{ width: `${d}%` }} className="h-full bg-accent/40 border-r-2 border-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Frequency (Hz)</label>
            <input type="number" value={freq} onChange={e => setFreq(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Duty Cycle (%)</label>
            <input type="number" value={duty} onChange={e => setDuty(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};
