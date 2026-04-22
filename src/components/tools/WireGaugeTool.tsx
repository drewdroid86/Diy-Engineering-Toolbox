import React, { useState } from 'react';

export const WireGaugeTool = () => {
  const [awg, setAwg] = useState('22');
  const gauges: Record<string, { dia: number, amp: number }> = {
    '4': { dia: 5.189, amp: 60 },
    '6': { dia: 4.115, amp: 37 },
    '8': { dia: 3.264, amp: 24 },
    '10': { dia: 2.588, amp: 15 },
    '12': { dia: 2.053, amp: 9.3 },
    '14': { dia: 1.628, amp: 5.9 },
    '16': { dia: 1.291, amp: 3.7 },
    '18': { dia: 1.024, amp: 2.3 },
    '20': { dia: 0.812, amp: 1.5 },
    '22': { dia: 0.644, amp: 0.92 },
    '24': { dia: 0.511, amp: 0.577 },
    '26': { dia: 0.405, amp: 0.361 },
  };

  const selected = gauges[awg] || gauges['22'];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Max Ampacity</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{selected.amp}A</h2>
          <p className="text-sm font-bold text-white/60 mt-1">Chassis Wiring</p>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Select AWG Size</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(gauges).map(g => (
              <button key={g} onClick={() => setAwg(g)} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${awg === g ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'bg-[#1a1a2e] border border-[#2a2a3a] text-gray-400'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 font-bold uppercase">Diameter</span>
            <span className="text-lg font-black text-white">{selected.dia} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
