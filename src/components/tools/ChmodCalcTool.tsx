import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export const ChmodCalcTool = () => {
  const [owner, setOwner] = useState({ r: true, w: true, x: true });
  const [group, setGroup] = useState({ r: true, w: false, x: true });
  const [other, setOther] = useState({ r: true, w: false, x: true });

  const getOctal = (p: { r: boolean; w: boolean; x: boolean }) => 
    (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);

  const getSymbolic = (p: { r: boolean; w: boolean; x: boolean }) =>
    (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');

  const octal = `${getOctal(owner)}${getOctal(group)}${getOctal(other)}`;
  const symbolic = `${getSymbolic(owner)}${getSymbolic(group)}${getSymbolic(other)}`;

  const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-full h-12 rounded-xl flex items-center justify-center transition-all ${checked ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'bg-[#1a1a2e] text-gray-700 border border-[#2a2a3a]'}`}
    >
      <span className="text-xs font-black uppercase">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-around items-center bg-[#1a1a2e]/50 p-6 rounded-2xl border border-[#2a2a3a]">
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Octal</p>
            <h2 className="text-4xl font-black text-white font-mono">{octal}</h2>
          </div>
          <div className="h-12 w-px bg-[#2a2a3a]" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Symbolic</p>
            <h2 className="text-2xl font-black text-accent font-mono tracking-tight">{symbolic}</h2>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] overflow-hidden">
        <div className="grid grid-cols-4 bg-[#1a1a2e]/80 border-b border-[#2a2a3a]">
          <div className="p-3"></div>
          {['Read', 'Write', 'Exec'].map(l => <div key={l} className="p-3 text-center text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">{l}</div>)}
        </div>
        {[
          { id: 'Owner', state: owner, set: setOwner },
          { id: 'Group', state: group, set: setGroup },
          { id: 'Other', state: other, set: setOther },
        ].map(row => (
          <div key={row.id} className="grid grid-cols-4 items-center border-b border-[#2a2a3a]/50 last:border-0">
            <div className="p-4 text-[10px] font-black text-white uppercase tracking-widest bg-white/5">{row.id}</div>
            <div className="p-2"><Checkbox label="r" checked={row.state.r} onChange={() => row.set({ ...row.state, r: !row.state.r })} /></div>
            <div className="p-2"><Checkbox label="w" checked={row.state.w} onChange={() => row.set({ ...row.state, w: !row.state.w })} /></div>
            <div className="p-2"><Checkbox label="x" checked={row.state.x} onChange={() => row.set({ ...row.state, x: !row.state.x })} /></div>
          </div>
        ))}
      </div>

      <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10">
        <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-2 px-1">Quick Command</p>
        <div className="bg-black/40 p-3 rounded-xl font-mono text-xs text-gray-300 flex items-center justify-between">
          <code>chmod {octal} filename</code>
          <button onClick={() => navigator.clipboard.writeText(`chmod ${octal} filename`)} className="text-accent hover:text-white transition-colors">
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
