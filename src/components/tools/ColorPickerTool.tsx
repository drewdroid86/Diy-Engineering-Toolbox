import React, { useState } from 'react';

export const ColorPickerTool = () => {
  const [hex, setHex] = useState('#00e5ff');

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="h-40 rounded-3xl shadow-2xl transition-colors duration-300 border-4 border-[#2a2a3a]" style={{ backgroundColor: hex }} />
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Hex Color</label>
          <div className="flex gap-2">
            <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-14 bg-transparent border-none cursor-pointer" />
            <input value={hex} onChange={e => setHex(e.target.value)} className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl px-5 text-[#ffffff] text-lg font-mono outline-none focus:border-[#00e5ff]" />
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">RGB</span>
          <span className="text-sm font-mono text-white">{hexToRgb(hex)}</span>
        </div>
      </div>
    </div>
  );
};
