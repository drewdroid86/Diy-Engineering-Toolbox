import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';

export const PasswordGenTool = () => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [seed, setSeed] = useState(0);

  const password = useMemo(() => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    let res = "";
    for (let i = 0; i < length; i++) {
      res += charset.charAt(array[i] % charset.length);
    }
    return res;
  }, [length, useUpper, useNumbers, useSymbols, seed]);

  const generate = () => setSeed(s => s + 1);

  const strength = length < 8 ? 'Weak' : length < 12 ? 'Fair' : length < 16 ? 'Good' : 'Strong';

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{strength} Password</span>
          <button onClick={() => navigator.clipboard.writeText(password)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>
        </div>
        <div className="bg-black/30 p-4 rounded-2xl font-mono text-sm text-white/90 break-all leading-tight border border-white/5 text-center min-h-[60px] flex items-center justify-center">
          {password}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between px-1">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest">Length: {length}</label>
          </div>
          <input type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-accent" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'Uppercase', val: useUpper, set: setUseUpper },
            { label: 'Numbers', val: useNumbers, set: setUseNumbers },
            { label: 'Symbols', val: useSymbols, set: setUseSymbols },
          ].map(opt => (
            <button key={opt.label} onClick={() => opt.set(!opt.val)} className={`flex justify-between items-center px-4 py-3 rounded-xl border transition-all ${opt.val ? 'bg-accent/10 border-accent/30 text-white' : 'bg-[#1a1a2e] border-[#2a2a3a] text-gray-500'}`}>
              <span className="text-xs font-bold uppercase">{opt.label}</span>
              {opt.val ? <Check className="w-4 h-4 text-accent" /> : <div className="w-4 h-4" />}
            </button>
          ))}
        </div>
        <button onClick={generate} className="mt-2 py-4 bg-accent text-bg-dark rounded-2xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-accent/20 active:scale-95 transition-all">Regenerate</button>
      </div>
    </div>
  );
};
