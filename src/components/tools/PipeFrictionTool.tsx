import React, { useState } from 'react';

export const PipeFrictionTool = () => {
  const [flow, setFlow] = useState('100'); // GPM
  const [diameter, setDiameter] = useState('2'); // inches
  const [length, setLength] = useState('100'); // feet
  const [material, setMaterial] = useState('140'); // C-Factor

  const g = Number(flow);
  const d = Number(diameter);
  const l = Number(length);
  const c = Number(material);

  // Hazen-Williams Head Loss (feet of water)
  // hf = 0.002083 * L * (100/C)^1.85 * (gpm^1.85 / d^4.8655)
  const headLoss = 0.002083 * l * Math.pow(100 / c, 1.852) * (Math.pow(g, 1.852) / Math.pow(d, 4.8655));
  const psiLoss = headLoss * 0.4335;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Head Loss</p>
            <h3 className="text-xl font-black text-white">{headLoss.toFixed(2)} <span className="text-[10px] text-gray-500">ft</span></h3>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Pressure Drop</p>
            <h3 className="text-xl font-black text-accent">{psiLoss.toFixed(2)} <span className="text-[10px] text-gray-500">psi</span></h3>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Flow (GPM)</label>
            <input type="number" value={flow} onChange={e => setFlow(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Diameter (in)</label>
            <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Length (ft)</label>
            <input type="number" value={length} onChange={e => setLength(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Material C-Factor</label>
            <select value={material} onChange={e => setMaterial(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white text-sm outline-none appearance-none focus:border-accent">
              <option value="150">PVC / Plastic (150)</option>
              <option value="140">New Steel (140)</option>
              <option value="120">Copper (120)</option>
              <option value="100">Cast Iron (100)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
