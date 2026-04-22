import React, { useState } from 'react';

export const BeamLoadTool = () => {
  const [load, setLoad] = useState('1000');
  const [span, setSpan] = useState('12');
  const [e, setE] = useState('29000000'); // Modulus of Elasticity (psi) - Steel
  const [i, setI] = useState('100'); // Moment of Inertia (in^4)

  const w = Number(load);
  const l = Number(span) * 12; // convert ft to in
  const modE = Number(e);
  const momI = Number(i);

  // Simple beam with point load at center
  const maxMoment = (w * l) / 4;
  const maxDeflection = (w * Math.pow(l, 3)) / (48 * modE * momI);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Max Moment</p>
            <h3 className="text-xl font-black text-white">{Math.round(maxMoment / 12).toLocaleString()} <span className="text-[10px] text-gray-500">ft-lb</span></h3>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Max Deflection</p>
            <h3 className="text-xl font-black text-accent">{maxDeflection.toFixed(3)} <span className="text-[10px] text-gray-500">in</span></h3>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Center Point Load (lb)</label>
          <input type="number" value={load} onChange={e => setLoad(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white font-medium outline-none focus:border-accent" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Span Length (ft)</label>
          <input type="number" value={span} onChange={e => setSpan(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white font-medium outline-none focus:border-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Modulus (E) <span className="text-[8px] lowercase">psi</span></label>
            <input type="number" value={e} onChange={e => setE(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white text-sm outline-none focus:border-accent" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Inertia (I) <span className="text-[8px] lowercase">in⁴</span></label>
            <input type="number" value={i} onChange={e => setI(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white text-sm outline-none focus:border-accent" />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        <p className="text-[9px] text-gray-500 font-medium italic text-center">
          Note: Simplified calculation for center point load on a simple beam. For distributed loads or complex supports, consult structural engineering tables.
        </p>
      </div>
    </div>
  );
};
