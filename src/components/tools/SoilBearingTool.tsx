import React, { useState } from 'react';

export const SoilBearingTool = () => {
  const [load, setLoad] = useState('50000'); // lb
  const [soilType, setSoilType] = useState('3000'); // psf
  const [footingWidth, setFootingWidth] = useState('4'); // ft
  const [footingLength, setFootingLength] = useState('4'); // ft

  const p = Number(load);
  const q = Number(soilType);
  const b = Number(footingWidth);
  const l = Number(footingLength);

  const area = b * l;
  const actualBearing = p / area; // psf
  const factorOfSafety = q / actualBearing;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Actual Pressure</p>
            <h3 className="text-xl font-black text-white">{Math.round(actualBearing).toLocaleString()} <span className="text-[10px] text-gray-500">psf</span></h3>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Factor of Safety</p>
            <h3 className={`text-xl font-black ${factorOfSafety >= 3 ? 'text-green-500' : factorOfSafety >= 1 ? 'text-yellow-500' : 'text-red-500'}`}>
              {factorOfSafety.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Column Load (lb)</label>
          <input type="number" value={load} onChange={e => setLoad(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white font-medium outline-none focus:border-accent" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Allowable Soil Bearing (psf)</label>
          <select value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white text-sm outline-none appearance-none focus:border-accent">
            <option value="1500">Soft Clay (1500)</option>
            <option value="2000">Firm Clay / Silt (2000)</option>
            <option value="3000">Sand / Gravelly Sand (3000)</option>
            <option value="4000">Well-graded Sand (4000)</option>
            <option value="12000">Bedrock (12000+)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Footing Width (ft)</label>
            <input type="number" value={footingWidth} onChange={e => setFootingWidth(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Footing Length (ft)</label>
            <input type="number" value={footingLength} onChange={e => setFootingLength(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent" />
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
        <p className="text-[9px] text-gray-500 font-medium italic text-center">
          Note: This tool provides a gross pressure estimate. Always consult a geotechnical engineer for foundation design and local building code requirements.
        </p>
      </div>
    </div>
  );
};
