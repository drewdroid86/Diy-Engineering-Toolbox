import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export const GradientGenTool = () => {
  const [c1, setC1] = useState('#00e5ff');
  const [c2, setC2] = useState('#6366f1');
  const [angle, setAngle] = useState(135);

  const css = `linear-gradient(${angle}deg, ${c1}, ${c2})`;

  return (
    <div className="flex flex-col gap-6">
      <div className="h-40 rounded-3xl border-4 border-[#2a2a3a]" style={{ background: css }} />
      <div className="bg-black/30 p-4 rounded-2xl font-mono text-[10px] text-accent/80 break-all leading-tight border border-white/5 flex justify-between items-center">
        <code>background: {css};</code>
        <button onClick={() => navigator.clipboard.writeText(`background: ${css};`)} className="text-gray-500 hover:text-white">
          <Copy className="w-3 h-3" />
        </button>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-full h-12 bg-transparent border-none cursor-pointer" />
          <input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-full h-12 bg-transparent border-none cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Angle: {angle}°</label>
          <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(parseInt(e.target.value))} className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-accent" />
        </div>
      </div>
    </div>
  );
};
