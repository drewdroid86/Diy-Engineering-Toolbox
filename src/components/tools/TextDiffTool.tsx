import React, { useState } from 'react';

export const TextDiffTool = () => {
  const [t1, setT1] = useState('');
  const [t2, setT2] = useState('');

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Text A</label>
          <textarea value={t1} onChange={e => setT1(e.target.value)} rows={6} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl p-3 text-white text-xs outline-none focus:border-[#00e5ff] resize-none" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Text B</label>
          <textarea value={t2} onChange={e => setT2(e.target.value)} rows={6} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl p-3 text-white text-xs outline-none focus:border-[#00e5ff] resize-none" />
        </div>
      </div>
      <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4">
        <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-2">Analysis</p>
        <div className="text-[10px] font-mono text-white/70 space-y-1">
          <p>Chars: {t1.length} vs {t2.length} ({Math.abs(t1.length - t2.length)} diff)</p>
          <p>Words: {t1.split(/\s+/).filter(Boolean).length} vs {t2.split(/\s+/).filter(Boolean).length}</p>
          <p>Status: {t1 === t2 ? 'Identical' : 'Different'}</p>
        </div>
      </div>
    </div>
  );
};
