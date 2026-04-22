import React, { useState } from 'react';

export const GearRatioTool = () => {
  const [drive, setDrive] = useState('10');
  const [driven, setDriven] = useState('40');
  const [inputRpm, setInputRpm] = useState('3000');

  const d1 = Number(drive) || 1;
  const d2 = Number(driven) || 1;
  const irpm = Number(inputRpm) || 0;
  
  const ratio = d2 / d1;
  const outRpm = irpm / ratio;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-around items-center">
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Gear Ratio</p>
            <h2 className="text-3xl font-black text-[#00e5ff]">{ratio.toFixed(2)}:1</h2>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Output RPM</p>
            <h2 className="text-3xl font-black text-white">{Math.round(outRpm)}</h2>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Drive Gear Teeth</label>
            <input type="number" value={drive} onChange={e => setDrive(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Driven Gear Teeth</label>
            <input type="number" value={driven} onChange={e => setDriven(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input RPM</label>
          <input type="number" value={inputRpm} onChange={e => setInputRpm(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};
