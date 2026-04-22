import React, { useState } from 'react';

export const UnitConverterTool = () => {
  const [val, setVal] = useState('1');
  const [type, setType] = useState<'len' | 'mass' | 'temp'>('len');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  const units: Record<string, Record<string, number>> = {
    len: { m: 1, ft: 3.28084, in: 39.3701, cm: 100, mm: 1000, yd: 1.09361, mi: 0.000621371 },
    mass: { kg: 1, lb: 2.20462, oz: 35.274, g: 1000, ton: 0.001 },
  };

  const convert = () => {
    const v = Number(val) || 0;
    if (type === 'temp') {
      if (fromUnit === 'C' && toUnit === 'F') return (v * 9/5) + 32;
      if (fromUnit === 'F' && toUnit === 'C') return (v - 32) * 5/9;
      if (fromUnit === 'C' && toUnit === 'K') return v + 273.15;
      if (fromUnit === 'K' && toUnit === 'C') return v - 273.15;
      return v;
    }
    const base = v / units[type][fromUnit];
    return base * units[type][toUnit];
  };

  const result = convert();

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex bg-[#1a1a2e] p-1 rounded-2xl border border-[#2a2a3a]">
          {(['len', 'mass', 'temp'] as const).map(t => (
            <button key={t} onClick={() => { setType(t); setFromUnit(t === 'temp' ? 'C' : Object.keys(units[t])[0]); setToUnit(t === 'temp' ? 'F' : Object.keys(units[t])[1]); }} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${type === t ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>{t}</button>
          ))}
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Conversion Result</p>
          <h2 className="text-4xl font-black text-white">{result.toFixed(4)} <span className="text-xl text-accent">{toUnit}</span></h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Value to Convert</label>
          <input type="number" value={val} onChange={e => setVal(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">From</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none">
              {type === 'temp' ? ['C', 'F', 'K'].map(u => <option key={u} value={u}>{u}</option>) : Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">To</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none">
              {type === 'temp' ? ['C', 'F', 'K'].map(u => <option key={u} value={u}>{u}</option>) : Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
