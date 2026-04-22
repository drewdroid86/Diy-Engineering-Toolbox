import React, { useState, useMemo } from 'react';

export const RegexTesterTool = () => {
  const [pattern, setRegexPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const re = new RegExp(pattern, flags);
      const found = Array.from(testString.matchAll(re));
      return { matches: found, error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : String(e) };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-4">
        <div className="flex justify-around items-center">
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Matches</p>
            <h2 className="text-4xl font-black text-[#00e5ff]">{matches.length}</h2>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Pattern</label>
          <div className="flex bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl items-center px-4 focus-within:border-[#00e5ff] focus-within:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all">
            <span className="text-gray-600 font-mono">/</span>
            <input value={pattern} onChange={e => setRegexPattern(e.target.value)} className="flex-1 bg-transparent py-4 px-2 text-[#ffffff] text-sm font-mono outline-none" placeholder="[a-z]+" />
            <span className="text-gray-600 font-mono">/</span>
            <input value={flags} onChange={e => setFlags(e.target.value)} className="w-12 bg-transparent py-4 text-accent text-sm font-mono outline-none text-center" placeholder="g" />
          </div>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Test String</label>
          <textarea value={testString} onChange={e => setTestString(e.target.value)} rows={4} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" />
        </div>
        {error && <p className="text-[10px] font-mono text-red-400 px-1">{error}</p>}
      </div>
    </div>
  );
};
