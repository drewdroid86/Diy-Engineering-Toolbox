import React, { useState, useMemo } from 'react';
import { Copy } from 'lucide-react';

export const UrlEncoderTool = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');

  const { output, error } = useMemo(() => {
    if (!input) {
      return { output: '', error: false };
    }
    try {
      const res = mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
      return { output: res, error: false };
    } catch {
      return { output: '', error: true };
    }
  }, [input, mode]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex bg-[#1a1a2e] p-1 rounded-2xl border border-[#2a2a3a]">
          <button onClick={() => setMode('encode')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'encode' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'decode' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>Decode</button>
        </div>
        <div className="relative">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Output</span>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>}
          </div>
          <div className={`bg-black/30 p-4 rounded-2xl font-mono text-xs break-all min-h-[100px] border ${error ? 'border-red-500/50 text-red-200' : 'border-white/5 text-white/90'}`}>
            {error ? 'Invalid input for URL decoding' : output || 'Waiting for input...'}
          </div>
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" />
      </div>
    </div>
  );
};
