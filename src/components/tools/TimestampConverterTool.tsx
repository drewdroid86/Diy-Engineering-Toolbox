import React, { useState, useEffect } from 'react';
import { Clock, RefreshCcw } from 'lucide-react';

export const TimestampConverterTool = () => {
  const [now, setNow] = useState(() => Date.now());
  const [input, setInput] = useState(() => Math.floor(Date.now() / 1000).toString());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const d = new Date(Number(input) * 1000);
  const isValid = !isNaN(d.getTime());

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-accent/10 pb-4">
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Current Epoch</span>
          </div>
          <h3 className="text-lg font-black text-white font-mono">{Math.floor(now / 1000)}</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#1a1a2e]/50 p-4 rounded-2xl border border-[#2a2a3a]">
            <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Local Time</p>
            <p className="text-sm font-black text-white">{isValid ? d.toLocaleString() : 'Invalid Timestamp'}</p>
          </div>
          <div className="bg-[#1a1a2e]/50 p-4 rounded-2xl border border-[#2a2a3a]">
            <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">ISO 8601</p>
            <p className="text-sm font-black text-white">{isValid ? d.toISOString() : '---'}</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Unix Timestamp (seconds)</label>
        <div className="flex gap-2">
          <input type="number" value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          <button onClick={() => setInput(Math.floor(Date.now() / 1000).toString())} className="px-5 bg-white/5 rounded-2xl text-white hover:bg-white/10 active:scale-95 transition-all">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
