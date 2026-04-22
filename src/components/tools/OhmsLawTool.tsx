import React, { useState } from 'react';
import { RefreshCcw } from 'lucide-react';

export const OhmsLawTool = () => {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');
  const [p, setP] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    if (value !== '' && isNaN(Number(value))) return;

    let nv = v;
    let ni = i;
    let nr = r;

    if (field === 'v') {
      setV(value);
      nv = value;
    }
    if (field === 'i') {
      setI(value);
      ni = value;
    }
    if (field === 'r') {
      setR(value);
      nr = value;
    }

    const vnum = Number(nv);
    const inum = Number(ni);
    const rnum = Number(nr);

    // Calculate third value if two are present
    if (field === 'v' || field === 'i') {
      if (nv && ni) {
        const res = vnum / inum;
        setR(res.toFixed(2).replace(/\.00$/, ''));
        setP(vnum * inum);
      } else {
        setP(null);
      }
    } else if (field === 'r') {
      if (nv && nr) {
        const res = vnum / rnum;
        setI(res.toFixed(2).replace(/\.00$/, ''));
      } else if (ni && nr) {
        const res = inum * rnum;
        setV(res.toFixed(2).replace(/\.00$/, ''));
      }
    }
  };

  const reset = () => {
    setV('');
    setI('');
    setR('');
    setP(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Power Output</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{p !== null ? `${p.toFixed(2)}W` : '---'}</h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Voltage (V)</label>
          <input type="number" value={v} onChange={e => handleInputChange('v', e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Current (A)</label>
          <input type="number" value={i} onChange={e => handleInputChange('i', e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Resistance (Ω)</label>
          <input type="number" value={r} onChange={e => handleInputChange('r', e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
      <button onClick={reset} className="mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 active:scale-95 transition-all">
        <RefreshCcw className="w-5 h-5" /> Reset Values
      </button>
    </div>
  );
};
