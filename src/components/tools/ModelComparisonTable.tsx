import React from 'react';

export const ModelComparisonTable = () => {
  return (
    <div className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] overflow-hidden">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#1a1a2e] border-b border-[#2a2a3a]">
          <tr>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">Model</th>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">Context</th>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">Price (In)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2a2a3a]/50">
          {[
            { n: 'o1-pro', c: '128k', p: '$15' },
            { n: 'Gemini 1.5', c: '2M', p: '$3.5' },
            { n: 'Claude 3.5', c: '200k', p: '$3' },
            { n: 'GPT-4o', c: '128k', p: '$5' },
          ].map(r => (
            <tr key={r.n} className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-white">{r.n}</td>
              <td className="p-4 text-[#aaaacc] font-mono">{r.c}</td>
              <td className="p-4 text-accent font-bold">{r.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
