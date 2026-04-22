import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export const CaesarCipherTool = () => {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(13);

  const process = (str: string, s: number) => {
    return str.replace(/[a-z]/gi, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + s) % 26) + start);
    });
  };

  const result = process(text, shift);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Result (Shift {shift})</span>
          <button onClick={() => navigator.clipboard.writeText(result)} className="text-gray-500 hover:text-white transition-colors">
            <Copy className="w-3 h-3" />
          </button>
        </div>
        <div className="bg-black/30 p-4 rounded-2xl font-mono text-sm text-white/90 break-all leading-tight border border-white/5 min-h-[80px]">
          {result || 'Waiting for input...'}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            rows={4} 
            className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] transition-all resize-none" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Shift Amount: {shift}</label>
          <input 
            type="range" 
            min="1" 
            max="25" 
            value={shift} 
            onChange={e => setShift(parseInt(e.target.value))} 
            className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-accent" 
          />
        </div>
      </div>
    </div>
  );
};
