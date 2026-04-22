import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

export const HashGeneratorTool = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<{ input: string; results: Record<string, string> } | null>(null);

  useEffect(() => {
    let active = true;
    if (!input) {
      return;
    }

    const generate = async () => {
      const encoders = ['SHA-1', 'SHA-256', 'SHA-512'];
      const results: Record<string, string> = {};
      
      for (const algo of encoders) {
        const msgUint8 = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        results[algo] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
      if (active) setHashes({ input, results });
    };

    generate();
    return () => { active = false; };
  }, [input]);

  const displayedHashes = (hashes && hashes.input === input) ? hashes.results : {};

  return (
    <div className="flex flex-col gap-6 w-full">
      {Object.entries(displayedHashes).length > 0 && (
        <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-5">
          {Object.entries(displayedHashes).map(([algo, hash]) => (
            <div key={algo} className="flex flex-col gap-1.5 group">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{algo}</span>
                <button onClick={() => navigator.clipboard.writeText(hash)} className="text-gray-500 hover:text-white transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="bg-black/30 p-3 rounded-xl font-mono text-[10px] text-white/80 break-all leading-tight border border-white/5">
                {hash}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" placeholder="Enter text to hash..." />
      </div>
    </div>
  );
};
