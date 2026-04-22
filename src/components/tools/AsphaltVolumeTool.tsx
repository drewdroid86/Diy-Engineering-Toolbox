import React, { useState } from 'react';

export const AsphaltVolumeTool = () => {
  const [area, setArea] = useState('1000'); // sq ft
  const [thickness, setThickness] = useState('2'); // inches
  const [density, setDensity] = useState('145'); // lb/cu ft (standard)

  const a = Number(area);
  const t = Number(thickness) / 12; // feet
  const d = Number(density);

  const totalVolume = a * t; // cu ft
  const totalWeightLb = totalVolume * d;
  const tonnage = totalWeightLb / 2000;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Volume</p>
            <h3 className="text-xl font-black text-white">{totalVolume.toFixed(2)} <span className="text-[10px] text-gray-500">ft³</span></h3>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Tonnage Required</p>
            <h3 className="text-xl font-black text-accent">{tonnage.toFixed(2)} <span className="text-[10px] text-gray-500">Tons</span></h3>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Surface Area (sq ft)</label>
          <input type="number" value={area} onChange={e => setArea(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white font-medium outline-none focus:border-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Thickness (in)</label>
            <input type="number" value={thickness} onChange={e => setThickness(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Density (lb/ft³)</label>
            <input type="number" value={density} onChange={e => setDensity(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        <p className="text-[9px] text-gray-500 font-medium italic text-center">
          Note: 145 lb/ft³ is a standard density for compacted hot mix asphalt. Check with your plant for specific mix design data.
        </p>
      </div>
    </div>
  );
};
