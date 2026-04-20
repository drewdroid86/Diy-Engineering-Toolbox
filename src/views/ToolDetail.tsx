import React, { useState, useEffect } from 'react';
import { Tool } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, MoreVertical, RefreshCcw, Copy, Check, Clock } from 'lucide-react';
import { GeminiAssistant } from '../components/GeminiAssistant';
import { SearchBar } from '../components/SearchBar';
import { SearchBar } from '../components/SearchBar';

interface ToolDetailProps {
  tool: Tool;
  onClose: () => void;
}

const OhmsLawTool = () => {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');
  const [p, setP] = useState<number | null>(null);
  const [lastChanged, setLastChanged] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    if (value !== '' && isNaN(Number(value))) return;

    if (field === 'v') setV(value);
    if (field === 'i') setI(value);
    if (field === 'r') setR(value);

    setLastChanged(prev => {
      const filtered = prev.filter(f => f !== field);
      return [field, ...filtered].slice(0, 2);
    });
  };

  useEffect(() => {
    const vn = Number(v);
    const inum = Number(i);
    const rn = Number(r);

    if (v && i && lastChanged[0] !== 'r') {
      const res = vn / inum;
      setR(res.toFixed(2).replace(/\.00$/, ''));
    } else if (v && r && lastChanged[0] !== 'i') {
      const cur = vn / rn;
      setI(cur.toFixed(2).replace(/\.00$/, ''));
    } else if (i && r && lastChanged[0] !== 'v') {
      const vol = inum * rn;
      setV(vol.toFixed(2).replace(/\.00$/, ''));
    }

    if (v && i) {
      setP(Number(v) * Number(i));
    } else {
      setP(null);
    }
  }, [v, i, r, lastChanged]);

  const reset = () => {
    setV('');
    setI('');
    setR('');
    setP(null);
    setLastChanged([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Power Output</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{p !== null ? `${p.toFixed(2)}W` : '---'}</h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Voltage (V)</label>
          <input type="number" value={v} onChange={e => handleInputChange('v', e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Current (A)</label>
          <input type="number" value={i} onChange={e => handleInputChange('i', e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Resistance (Ω)</label>
          <input type="number" value={r} onChange={e => handleInputChange('r', e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
      <button onClick={reset} className="mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 active:scale-95 transition-all">
        <RefreshCcw className="w-5 h-5" /> Reset Values
      </button>
    </div>
  );
};

const ResistorCodeTool = () => {
  const [band1, setBand1] = useState('black');
  const [band2, setBand2] = useState('black');
  const [multiplier, setMultiplier] = useState('black');
  const [tolerance, setTolerance] = useState('brown');

  const colors: Record<string, { val: number, mult: number, tol?: number, hex: string }> = {
    black: { val: 0, mult: 1, hex: '#000000' },
    brown: { val: 1, mult: 10, tol: 1, hex: '#8B4513' },
    red: { val: 2, mult: 100, tol: 2, hex: '#FF0000' },
    orange: { val: 3, mult: 1000, hex: '#FFA500' },
    yellow: { val: 4, mult: 10000, hex: '#FFFF00' },
    green: { val: 5, mult: 100000, tol: 0.5, hex: '#008000' },
    blue: { val: 6, mult: 1000000, tol: 0.25, hex: '#0000FF' },
    violet: { val: 7, mult: 10000000, tol: 0.1, hex: '#EE82EE' },
    gray: { val: 8, mult: 100000000, tol: 0.05, hex: '#808080' },
    white: { val: 9, mult: 1000000000, hex: '#FFFFFF' },
    gold: { val: -1, mult: 0.1, tol: 5, hex: '#FFD700' },
    silver: { val: -1, mult: 0.01, tol: 10, hex: '#C0C0C0' },
  };

  const resistance = (colors[band1].val * 10 + colors[band2].val) * colors[multiplier].mult;
  const tolVal = colors[tolerance].tol;

  const formatRes = (r: number) => {
    if (r >= 1000000) return (r / 1000000).toFixed(1) + 'M Ω';
    if (r >= 1000) return (r / 1000).toFixed(1) + 'k Ω';
    return r + ' Ω';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Resistance Value</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{formatRes(resistance)}</h2>
          <p className="text-sm font-bold text-white/60 mt-1">±{tolVal}% Tolerance</p>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-4">
        <div className="flex justify-between items-center bg-gray-700/20 p-4 rounded-2xl">
          {[band1, band2, multiplier, tolerance].map((c, i) => (
            <div key={i} className="w-4 h-12 rounded-sm shadow-inner" style={{ backgroundColor: colors[c].hex }} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Band 1</label>
            <select value={band1} onChange={e => setBand1(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).filter(c => colors[c].val >= 0).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Band 2</label>
            <select value={band2} onChange={e => setBand2(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).filter(c => colors[c].val >= 0).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Multiplier</label>
            <select value={multiplier} onChange={e => setMultiplier(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Tolerance</label>
            <select value={tolerance} onChange={e => setTolerance(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] focus:ring-0 outline-none">
              {Object.keys(colors).filter(c => colors[c].tol).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const PwmCalculatorTool = () => {
  const [freq, setFreq] = useState('1000');
  const [duty, setDuty] = useState('50');

  const f = Number(freq) || 1;
  const d = Number(duty) || 0;
  const period = 1000 / f; // ms
  const onTime = period * (d / 100);
  const offTime = period - onTime;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">On / Off Timing</p>
          <h2 className="text-3xl font-black text-[#00e5ff]">{onTime.toFixed(3)}ms / {offTime.toFixed(3)}ms</h2>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-4">
        <div className="relative h-20 bg-black/40 rounded-xl overflow-hidden border border-white/5 flex items-center">
          <motion.div animate={{ width: `${d}%` }} className="h-full bg-accent/40 border-r-2 border-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Frequency (Hz)</label>
            <input type="number" value={freq} onChange={e => setFreq(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Duty Cycle (%)</label>
            <input type="number" value={duty} onChange={e => setDuty(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CapacitorCalcTool = () => {
  const [r, setR] = useState('1000');
  const [c, setC] = useState('100');

  const rv = Number(r) || 0;
  const cv = Number(c) || 0;
  const tau = (rv * cv) / 1000000; // seconds (assuming uF)

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Time Constant (τ)</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{tau.toFixed(4)}s</h2>
          <p className="text-sm font-bold text-white/60 mt-1">Full Charge ≈ {(tau * 5).toFixed(3)}s</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Resistance (Ω)</label>
          <input type="number" value={r} onChange={e => setR(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Capacitance (μF)</label>
          <input type="number" value={c} onChange={e => setC(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const WireGaugeTool = () => {
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

const TorqueCalculatorTool = () => {
  const [force, setForce] = useState('10');
  const [distance, setDistance] = useState('0.5');
  const [unit, setUnit] = useState<'Nm' | 'ftlbf' | 'inlbf'>('Nm');

  const f = Number(force) || 0;
  const d = Number(distance) || 0;
  const torqueNm = f * d;

  const conversions: Record<string, number> = {
    'Nm': 1,
    'ftlbf': 0.73756,
    'inlbf': 8.8507,
  };

  const result = torqueNm * conversions[unit];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Resulting Torque</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{result.toFixed(2)}<span className="text-xl ml-1">{unit}</span></h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Force (N)</label>
          <input type="number" value={force} onChange={e => setForce(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Distance (m)</label>
          <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Output Unit</label>
          <div className="flex gap-2">
            {['Nm', 'ftlbf', 'inlbf'].map(u => (
              <button key={u} onClick={() => setUnit(u as any)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${unit === u ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'bg-[#1a1a2e] border border-[#2a2a3a] text-gray-400'}`}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GearRatioTool = () => {
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

const RpmSpeedTool = () => {
  const [mode, setMode] = useState<'vehicle' | 'pulley'>('vehicle');
  const [v1, setV1] = useState('60'); // MPH or Pulley 1 RPM
  const [v2, setV2] = useState('25'); // Tire Dia or Pulley 1 Dia
  const [v3, setV3] = useState('3.73'); // Ratio or Pulley 2 Dia

  const speed = Number(v1) || 0;
  const tire = Number(v2) || 1;
  const ratio = Number(v3) || 1;

  const vehicleRpm = (speed * ratio * 336) / tire;
  const pulleyRpm = (speed * tire) / ratio;
  
  const finalRpm = mode === 'vehicle' ? vehicleRpm : pulleyRpm;
  const normalizedRpm = Math.min(8000, finalRpm);
  const rotation = -90 + (normalizedRpm / 8000) * 180;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex bg-[#1a1a2e] p-1 rounded-2xl border border-[#2a2a3a]">
          <button 
            onClick={() => setMode('vehicle')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'vehicle' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}
          >
            Vehicle Drive
          </button>
          <button 
            onClick={() => setMode('pulley')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'pulley' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}
          >
            Pulley System
          </button>
        </div>
        
        <div className="relative h-44 flex items-center justify-center overflow-hidden pt-8">
          <svg width="240" height="150" viewBox="0 0 200 120" className="text-accent overflow-visible">
            <defs>
              <filter id="rpmGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background Arch */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#2a2a3a" strokeWidth="8" strokeLinecap="round" />
            
            {/* Redline Zone */}
            <path d="M 157.5 43.5 A 80 80 0 0 1 180 100" fill="none" stroke="#ff1744" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
            
            {/* Ticks */}
            {Array.from({ length: 41 }).map((_, i) => {
              const ang = -180 + (i * 180 / 40);
              const isMajor = i % 5 === 0;
              const isRedline = i > 35;
              const x1 = 100 + 78 * Math.cos(ang * Math.PI / 180);
              const y1 = 100 + 78 * Math.sin(ang * Math.PI / 180);
              const x2 = 100 + (isMajor ? 92 : 86) * Math.cos(ang * Math.PI / 180);
              const y2 = 100 + (isMajor ? 92 : 86) * Math.sin(ang * Math.PI / 180);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isRedline ? '#ff1744' : 'currentColor'} strokeWidth={isMajor ? 2 : 1} opacity={isMajor ? 0.6 : 0.2} />;
            })}

            {/* Labels */}
            {[0, 2, 4, 6, 8].map(v => {
              const ang = -180 + (v * 180 / 8);
              const x = 100 + 60 * Math.cos(ang * Math.PI / 180);
              const y = 100 + 60 * Math.sin(ang * Math.PI / 180);
              return <text key={v} x={x} y={y} fill={v >= 7 ? '#ff1744' : '#aaaacc'} fontSize="9" fontWeight="black" textAnchor="middle" alignmentBaseline="middle">{v}</text>;
            })}

            {/* Needle */}
            <motion.g
              animate={{ rotate: rotation }}
              style={{ originX: "100px", originY: "100px" }}
              transition={{ type: "spring", damping: 12, stiffness: 80 }}
            >
              <line
                x1="100" y1="100" x2="100" y2="25"
                stroke={normalizedRpm > 7000 ? '#ff1744' : '#00e5ff'}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#rpmGlow)"
              />
              <circle cx="100" cy="100" r="10" fill="#1a1a2e" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="4" fill={normalizedRpm > 7000 ? '#ff1744' : '#00e5ff'} />
            </motion.g>
          </svg>
          
          <div className="absolute bottom-2 text-center flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <motion.h2 key={Math.round(finalRpm)} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-4xl font-black text-white">{Math.round(finalRpm)}</motion.h2>
              <span className="text-xs font-bold text-[#aaaacc] tracking-tight">RPM</span>
            </div>
            <p className="text-[8px] font-black text-[#aaaacc] uppercase tracking-[0.3em] opacity-40 mt-1">
              {mode === 'vehicle' ? 'Chassis Speed' : 'Gear Velocity'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {mode === 'vehicle' ? (
          <>
            <div className="relative">
              <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Speed <span className="text-[#00e5ff]">(MPH)</span></label>
              <input type="number" value={v1} onChange={e => setV1(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Tire Dia <span className="text-[#00e5ff]">(in)</span></label>
                <input type="number" value={v2} onChange={e => setV2(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Final Ratio</label>
                <input type="number" value={v3} onChange={e => setV3(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Drive RPM</label>
              <input type="number" value={v1} onChange={e => setV1(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Drive Dia</label>
                <input type="number" value={v2} onChange={e => setV2(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Driven Dia</label>
                <input type="number" value={v3} onChange={e => setV3(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SpringRateTool = () => {
  const [wire, setWire] = useState('2');
  const [coil, setCoil] = useState('20');
  const [active, setActive] = useState('5');

  const d = Number(wire) || 1;
  const D = Number(coil) || 1;
  const n = Number(active) || 1;
  const G = 80000; // Shear modulus for steel in MPa

  const rateNmm = (G * Math.pow(d, 4)) / (8 * Math.pow(D, 3) * n);
  const rateLbIn = rateNmm * 5.710147;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Spring Rate</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{rateLbIn.toFixed(2)}<span className="text-xl ml-1">lb/in</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">{rateNmm.toFixed(2)} N/mm</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Wire Diameter (mm)</label>
          <input type="number" value={wire} onChange={e => setWire(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Coil Diameter (mm)</label>
          <input type="number" value={coil} onChange={e => setCoil(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Active Coils</label>
          <input type="number" value={active} onChange={e => setActive(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const ConcreteCalcTool = () => {
  const [l, setL] = useState('10');
  const [w, setW] = useState('10');
  const [d, setD] = useState('4');

  const length = Number(l) || 0;
  const width = Number(w) || 0;
  const depth = Number(d) || 0;

  const cubicFeet = (length * width * (depth / 12));
  const cubicYards = cubicFeet / 27;
  const bags60 = cubicFeet / 0.45;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Volume</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{cubicYards.toFixed(2)}<span className="text-xl ml-1">yd³</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">≈ {Math.ceil(bags60)} Bags (60lb)</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Length (ft)</label>
            <input type="number" value={l} onChange={e => setL(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Width (ft)</label>
            <input type="number" value={w} onChange={e => setW(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Thickness (in)</label>
          <input type="number" value={d} onChange={e => setD(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const SlopeGradeTool = () => {
  const [rise, setRise] = useState('1');
  const [run, setRun] = useState('12');

  const r = Number(rise) || 0;
  const n = Number(run) || 1;
  
  const angle = (Math.atan(r / n) * 180) / Math.PI;
  const percent = (r / n) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-around items-center text-center">
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Angle</p>
            <h2 className="text-3xl font-black text-[#00e5ff]">{angle.toFixed(1)}°</h2>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Grade</p>
            <h2 className="text-3xl font-black text-white">{percent.toFixed(1)}%</h2>
          </div>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-6">
        <div className="relative h-24 bg-black/20 rounded-xl overflow-hidden border border-white/5">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d={`M 10 35 L 90 35 L 90 ${35 - (r/n * 30)} Z`} fill="none" stroke="#00e5ff" strokeWidth="1" />
            <path d={`M 10 35 L 90 ${35 - (r/n * 30)}`} fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Rise</label>
            <input type="number" value={rise} onChange={e => setRise(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Run</label>
            <input type="number" value={run} onChange={e => setRun(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardFootTool = () => {
  const [t, setT] = useState('1');
  const [w, setW] = useState('6');
  const [l, setL] = useState('8');
  const [qty, setQty] = useState('1');

  const thick = Number(t) || 0;
  const width = Number(w) || 0;
  const length = Number(l) || 0;
  const count = Number(qty) || 1;

  const bf = (thick * width * length) / 12 * count;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Board Feet</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{bf.toFixed(2)}<span className="text-xl ml-1">BF</span></h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Thickness (in)</label>
            <input type="number" value={t} onChange={e => setT(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Width (in)</label>
            <input type="number" value={w} onChange={e => setW(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Length (ft)</label>
            <input type="number" value={l} onChange={e => setL(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Quantity</label>
            <input type="number" value={qty} onChange={e => setQty(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FinishCoverageTool = () => {
  const [area, setArea] = useState('100');
  const [coverage, setCoverage] = useState('350');
  const [coats, setCoats] = useState('2');

  const a = Number(area) || 0;
  const c = Number(coverage) || 1;
  const n = Number(coats) || 1;

  const totalGallons = (a / c) * n;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Finish Required</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{totalGallons.toFixed(2)}<span className="text-xl ml-1">Gallons</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">≈ {Math.ceil(totalGallons * 4)} Quarts</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Total Area (sq ft)</label>
          <input type="number" value={area} onChange={e => setArea(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Coverage (sq ft/gal)</label>
            <input type="number" value={coverage} onChange={e => setCoverage(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Number of Coats</label>
            <input type="number" value={coats} onChange={e => setCoats(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

const DovetailAngleTool = () => {
  const [ratio, setRatio] = useState('1:6');
  const ratios: Record<string, string> = {
    '1:6': '9.5° (Softwoods)',
    '1:7': '8.1° (General)',
    '1:8': '7.1° (Hardwoods)',
    '1:10': '5.7° (Dense/Exotic)',
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Recommended Angle</p>
          <h2 className="text-3xl font-black text-[#00e5ff]">{ratios[ratio]}</h2>
        </div>
      </div>
      <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a] flex flex-col gap-4">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Select Slope Ratio</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(ratios).map(r => (
            <button key={r} onClick={() => setRatio(r)} className={`py-4 rounded-2xl text-sm font-black transition-all ${ratio === r ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'bg-[#1a1a2e] border border-[#2a2a3a] text-gray-400'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const JsonFormatterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {output && !error && (
        <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Formatted Output</p>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-accent hover:text-white transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <pre className="text-xs text-white overflow-x-auto p-4 bg-black/40 rounded-xl font-mono leading-relaxed max-h-[300px]">
            {output}
          </pre>
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 rounded-3xl p-6 border border-red-500/20">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Syntax Error</p>
          <p className="text-xs text-red-200 font-mono">{error}</p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Raw JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm font-mono outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" placeholder='{"key": "value"}' />
        </div>
        <button onClick={format} className="py-4 bg-accent text-bg-dark rounded-2xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-accent/20 active:scale-95 transition-all">Format JSON</button>
      </div>
    </div>
  );
};

const RegexTesterTool = () => {
  const [pattern, setRegexPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError(null);
      return;
    }
    try {
      const re = new RegExp(pattern, flags);
      const found = Array.from(testString.matchAll(re));
      setMatches(found);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
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

const HashGeneratorTool = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = async () => {
    const encoders = ['SHA-1', 'SHA-256', 'SHA-512'];
    const results: Record<string, string> = {};
    
    for (const algo of encoders) {
      const msgUint8 = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      results[algo] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    setHashes(results);
  };

  useEffect(() => {
    if (input) generate();
    else setHashes({});
  }, [input]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {Object.entries(hashes).length > 0 && (
        <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-5">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="flex flex-col gap-1.5 group">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{algo}</span>
                <button onClick={() => navigator.clipboard.writeText(hash)} className="text-gray-500 hover:text-white transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className="bg-black/30 p-3 rounded-xl font-mono text-[10px] text-white/80 break-all leading-tight border border-white/5">
                {hash}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" placeholder="Enter text to hash..." />
      </div>
    </div>
  );
};

const TimestampConverterTool = () => {
  const [now, setNow] = useState(Date.now());
  const [input, setInput] = useState(Math.floor(Date.now() / 1000).toString());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const d = new Date(Number(input) * 1000);
  const isValid = !isNaN(d.getTime());

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-accent/10 pb-4">
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Current Epoch</span>
          </div>
          <h3 className="text-lg font-black text-white font-mono">{Math.floor(now / 1000)}</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-[#1a1a2e]/50 p-4 rounded-2xl border border-[#2a2a3a]">
            <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Local Time</p>
            <p className="text-sm font-black text-white">{isValid ? d.toLocaleString() : 'Invalid Timestamp'}</p>
          </div>
          <div className="bg-[#1a1a2e]/50 p-4 rounded-2xl border border-[#2a2a3a]">
            <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">ISO 8601</p>
            <p className="text-sm font-black text-white">{isValid ? d.toISOString() : '---'}</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Unix Timestamp (seconds)</label>
        <div className="flex gap-2">
          <input type="number" value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          <button onClick={() => setInput(Math.floor(Date.now() / 1000).toString())} className="px-5 bg-white/5 rounded-2xl text-white hover:bg-white/10 active:scale-95 transition-all">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Base64Tool = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError(false);
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError(false);
    } catch {
      setError(true);
      setOutput('');
    }
  }, [input, mode]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex bg-[#1a1a2e] p-1 rounded-2xl border border-[#2a2a3a]">
          <button onClick={() => setMode('encode')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'encode' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'decode' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>Decode</button>
        </div>
        <div className="relative">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Output</span>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>}
          </div>
          <div className={`bg-black/30 p-4 rounded-2xl font-mono text-xs break-all min-h-[100px] border ${error ? 'border-red-500/50 text-red-200' : 'border-white/5 text-white/90'}`}>
            {error ? 'Invalid input for Base64 decoding' : output || 'Waiting for input...'}
          </div>
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" />
      </div>
    </div>
  );
};

const TokenCounterTool = () => {
  const [text, setText] = useState('');

  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const estTokens = Math.ceil(charCount / 4);

  const models = [
    { name: 'GPT-4 / o1', limit: 128000 },
    { name: 'Claude 3.5', limit: 200000 },
    { name: 'Gemini 1.5 Pro', limit: 1000000 },
  ];

  const primaryLimit = 1000000;
  const usagePct = Math.min(100, (estTokens / primaryLimit) * 100);
  const needleRotation = -90 + (usagePct / 100) * 180;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col items-center gap-6">
        <div className="relative h-40 flex items-center justify-center overflow-hidden">
          <svg width="240" height="140" viewBox="0 0 240 140" className="overflow-visible">
            <path d="M 30 120 A 90 90 0 0 1 210 120" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" opacity="0.05" />
            <path d="M 30 120 A 90 90 0 0 1 138 30" fill="none" stroke="#00e676" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
            <path d="M 138 30 A 90 90 0 0 1 195 65" fill="none" stroke="#ffd600" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
            <path d="M 195 65 A 90 90 0 0 1 210 120" fill="none" stroke="#ff1744" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
            <motion.path d="M 30 120 A 90 90 0 0 1 210 120" fill="none" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={282.7 - (usagePct / 100 * 282.7)} opacity="0.2" />
            {/* Ticks */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(p => {
              const ang = -180 + (p * 180 / 100);
              const x1 = 120 + 80 * Math.cos(ang * Math.PI / 180);
              const y1 = 120 + 80 * Math.sin(ang * Math.PI / 180);
              const x2 = 120 + 95 * Math.cos(ang * Math.PI / 180);
              const y2 = 120 + 95 * Math.sin(ang * Math.PI / 180);
              return <line key={p} x1={x1} y1={y1} x2={x2} y2={y2} stroke={p > 85 ? "#ff1744" : p > 60 ? "#ffd600" : "#ffffff"} strokeWidth="1.5" opacity="0.2" />;
            })}
            <motion.line x1="120" y1="120" x2="120" y2="40" stroke="#000" strokeWidth="4" strokeLinecap="round" animate={{ rotate: needleRotation + 2 }} style={{ originX: "120px", originY: "120px" }} transition={{ type: "spring", damping: 12, stiffness: 80 }} opacity="0.3" />
            <motion.line x1="120" y1="120" x2="120" y2="40" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" animate={{ rotate: needleRotation }} style={{ originX: "120px", originY: "120px" }} transition={{ type: "spring", damping: 12, stiffness: 80 }} />
            <circle cx="120" cy="120" r="10" fill="#1a1a2e" stroke="#2a2a3a" strokeWidth="2" />
            <circle cx="120" cy="120" r="4" fill="#00e5ff" />
          </svg>
          <div className="absolute bottom-2 text-center">
            <h2 className="text-3xl font-black text-white">{usagePct.toFixed(1)}%</h2>
            <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Total Fill</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: 'Characters', val: charCount.toLocaleString() },
            { label: 'Words', val: wordCount.toLocaleString() },
            { label: 'Sentences', val: sentenceCount.toLocaleString() },
            { label: '~ Tokens', val: estTokens.toLocaleString(), accent: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1a2e]/50 border border-[#2a2a3a] rounded-2xl p-4 flex flex-col items-center">
              <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-xl font-black ${stat.accent ? 'text-accent' : 'text-white'}`}>{stat.val}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Prompt Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" placeholder="Paste your prompt or text here..." />
      </div>
    </div>
  );
};

const PromptCostTool = () => {
  const [inputTokens, setInputTokens] = useState('1000');
  const [outputTokens, setOutputTokens] = useState('500');
  const [modelId, setModelId] = useState('gpt4o');

  const models = [
    { id: 'gpt4o', name: 'GPT-4o', input: 5.0, output: 15.0 },
    { id: 'gpt4o-mini', name: 'GPT-4o Mini', input: 0.15, output: 0.6 },
    { id: 'claude35', name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
    { id: 'gemini15pro', name: 'Gemini 1.5 Pro', input: 3.5, output: 10.5 },
  ];

  const m = models.find(m => m.id === modelId) || models[0];
  const cost = ((Number(inputTokens) / 1000000) * m.input) + ((Number(outputTokens) / 1000000) * m.output);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Estimated Cost</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${cost.toFixed(4)}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Per Request</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Model Selection</label>
          <select value={modelId} onChange={e => setModelId(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-sm focus:border-[#00e5ff] outline-none">
            {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Tokens</label>
            <input type="number" value={inputTokens} onChange={e => setInputTokens(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Output Tokens</label>
            <input type="number" value={outputTokens} onChange={e => setOutputTokens(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ContextWindowTool = () => {
  const models = [
    { name: 'Gemini 1.5 Pro', limit: 2000000 },
    { name: 'Gemini 1.5 Flash', limit: 1000000 },
    { name: 'Claude 3.5', limit: 200000 },
    { name: 'GPT-4o', limit: 128000 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex flex-col gap-5">
          {models.map(m => (
            <div key={m.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between px-1">
                <span className="text-[10px] font-black text-white uppercase tracking-tight">{m.name}</span>
                <span className="text-[10px] font-bold text-accent">{(m.limit / 1000).toLocaleString()}k</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(m.limit / 2000000) * 100}%` }} className="h-full bg-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ModelComparisonTable = () => {
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

const UnitConverterTool = () => {
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
          {['len', 'mass', 'temp'].map(t => (
            <button key={t} onClick={() => { setType(t as any); setFromUnit(t === 'temp' ? 'C' : Object.keys(units[t])[0]); setToUnit(t === 'temp' ? 'F' : Object.keys(units[t])[1]); }} className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${type === t ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>{t}</button>
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

const RebarWeightTool = () => {
  const [size, setSize] = useState('4');
  const [length, setLength] = useState('20');

  const rebarData: Record<string, number> = {
    '3': 0.376, '4': 0.668, '5': 1.043, '6': 1.502, '7': 2.044, '8': 2.670, '9': 3.400, '10': 4.303, '11': 5.313
  };

  const weightLb = (rebarData[size] || 0) * Number(length);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Weight</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{weightLb.toFixed(2)}<span className="text-xl ml-1">lbs</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">{(weightLb * 0.453592).toFixed(2)} kg</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Rebar Size (US #)</label>
          <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all">
            {Object.keys(rebarData).map(s => <option key={s} value={s}>#{s} ({(Number(s)*0.125).toFixed(3)}")</option>)}
          </select>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Total Length (ft)</label>
          <input type="number" value={length} onChange={e => setLength(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const FlowRateTool = () => {
  const [diameter, setDiameter] = useState('2');
  const [velocity, setVelocity] = useState('5');

  const d = Number(diameter) / 12; // feet
  const v = Number(velocity); // ft/s
  const area = Math.PI * Math.pow(d / 2, 2);
  const flowCFS = area * v;
  const flowGPM = flowCFS * 448.831;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Flow Rate</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{flowGPM.toFixed(1)}<span className="text-xl ml-1">GPM</span></h2>
          <p className="text-sm font-bold text-white/60 mt-1">{flowCFS.toFixed(3)} ft³/s</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Pipe Inner Diameter (in)</label>
          <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Flow Velocity (ft/s)</label>
          <input type="number" value={velocity} onChange={e => setVelocity(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none transition-all" />
        </div>
      </div>
    </div>
  );
};

const ShelfSagTool = () => {
  const [load, setLoad] = useState('50');
  const [span, setSpan] = useState('36');
  const [thick, setThick] = useState('0.75');
  const [depth, setDepth] = useState('12');
  const [species, setSpecies] = useState('pine');

  const speciesData: Record<string, number> = {
    pine: 1200000, oak: 1800000, walnut: 1700000, mdf: 500000, plywood: 1000000
  };

  const w = Number(load);
  const L = Number(span);
  const t = Number(thick);
  const d = Number(depth);
  const E = speciesData[species];

  const deflection = (5 * w * Math.pow(L, 3)) / (384 * E * (d * Math.pow(t, 3) / 12));

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Estimated Sag</p>
          <h2 className={`text-4xl font-black ${deflection > 0.03 ? 'text-[#ff1744]' : 'text-[#00e5ff]'}`}>
            {deflection.toFixed(4)}<span className="text-xl ml-1">in</span>
          </h2>
          <p className="text-xs font-bold text-white/60 mt-1">
            {deflection > 0.03 ? 'Noticeable sagging expected' : 'Acceptable deflection'}
          </p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Load (lbs)</label>
            <input type="number" value={load} onChange={e => setLoad(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Span (in)</label>
            <input type="number" value={span} onChange={e => setSpan(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Thickness (in)</label>
            <input type="number" value={thick} onChange={e => setThick(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Depth (in)</label>
            <input type="number" value={depth} onChange={e => setDepth(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Material Species</label>
          <select value={species} onChange={e => setSpecies(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none">
            {Object.keys(speciesData).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

const LevelTool = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMotion = (e: DeviceOrientationEvent) => {
      if (e.beta !== null) setAngle(e.beta);
    };
    window.addEventListener('deviceorientation', handleMotion);
    return () => window.removeEventListener('deviceorientation', handleMotion);
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-10">
      <div className="relative w-64 h-64 rounded-full border-4 border-[#2a2a3a] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: angle }}
          className="w-1 h-48 bg-accent rounded-full"
          transition={{ type: 'spring', damping: 20 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#0f0f14] px-4 py-2 rounded-xl border border-white/10">
            <h2 className="text-3xl font-black text-white">{Math.abs(Math.round(angle))}°</h2>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Inclinometer Mode</p>
    </div>
  );
};

const StopwatchTool = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => setTime(prev => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const msecs = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-10 border border-accent/20 text-center">
        <h2 className="text-6xl font-black text-white font-mono">{formatTime(time)}</h2>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setRunning(!running)} className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${running ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-accent text-bg-dark'}`}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => { if (running) setLaps([time, ...laps]); else { setTime(0); setLaps([]); } }} className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-black uppercase tracking-widest border border-white/10">
          {running ? 'Lap' : 'Reset'}
        </button>
      </div>
      {laps.length > 0 && (
        <div className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] max-h-48 overflow-y-auto p-4 flex flex-col gap-2">
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-xl">
              <span className="text-[10px] font-black text-gray-500 uppercase">Lap {laps.length - i}</span>
              <span className="text-sm font-mono text-white">{formatTime(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FlashlightTool = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (on) {
      document.body.style.backgroundColor = '#ffffff';
    } else {
      document.body.style.backgroundColor = '';
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [on]);

  return (
    <div className={`flex flex-col items-center justify-center py-20 transition-all duration-500 ${on ? 'bg-white rounded-3xl' : ''}`}>
      <button 
        onClick={() => setOn(!on)}
        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${on ? 'bg-gray-100 shadow-2xl scale-110' : 'bg-[#1a1a2e] border border-[#2a2a3a]'}`}
      >
        <RefreshCcw className={`w-12 h-12 ${on ? 'text-bg-dark rotate-180' : 'text-accent'} transition-transform duration-500`} />
      </button>
      <p className={`mt-8 text-xs font-black uppercase tracking-[0.3em] ${on ? 'text-bg-dark' : 'text-gray-500'}`}>
        {on ? 'System Max Output' : 'Flashlight Off'}
      </p>
    </div>
  );
};

const LoanCalculatorTool = () => {
  const [amount, setAmount] = useState('250000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('30');

  const p = Number(amount) || 0;
  const r = (Number(rate) / 100) / 12;
  const n = (Number(years) || 1) * 12;

  const payment = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Monthly Payment</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${Math.round(payment).toLocaleString()}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Total: ${(payment * n).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Loan Amount ($)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Interest Rate (%)</label>
            <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Duration (Years)</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CompoundInterestTool = () => {
  const [p, setP] = useState('10000');
  const [r, setR] = useState('8');
  const [t, setT] = useState('10');

  const principal = Number(p) || 0;
  const rate = (Number(r) || 0) / 100;
  const time = Number(t) || 0;
  const amount = principal * Math.pow(1 + rate, time);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Future Value</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${Math.round(amount).toLocaleString()}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Growth: +${Math.round(amount - principal).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Initial Deposit ($)</label>
          <input type="number" value={p} onChange={e => setP(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Ann. Rate (%)</label>
            <input type="number" value={r} onChange={e => setR(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Years</label>
            <input type="number" value={t} onChange={e => setT(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TipCalculatorTool = () => {
  const [bill, setBill] = useState('50');
  const [pct, setPct] = useState('18');
  const [people, setPeople] = useState('1');

  const b = Number(bill) || 0;
  const p = Number(pct) || 0;
  const n = Number(people) || 1;

  const tip = b * (p / 100);
  const total = b + tip;
  const perPerson = total / n;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Per Person</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${perPerson.toFixed(2)}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Total Tip: ${tip.toFixed(2)}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Bill Amount ($)</label>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Tip (%)</label>
            <input type="number" value={pct} onChange={e => setPct(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Split (#)</label>
            <input type="number" value={people} onChange={e => setPeople(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CurrencyReferenceTool = () => {
  const rates = [
    { code: 'EUR', name: 'Euro', val: 0.94 },
    { code: 'GBP', name: 'Pound', val: 0.81 },
    { code: 'JPY', name: 'Yen', val: 154.5 },
    { code: 'CAD', name: 'CAD', val: 1.37 },
    { code: 'AUD', name: 'AUD', val: 1.55 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 text-center">Reference: 1 USD Equals</p>
        <div className="flex flex-col gap-3">
          {rates.map(r => (
            <div key={r.code} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-10 text-xs font-black text-white">{r.code}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{r.name}</span>
              </div>
              <span className="text-sm font-black text-accent">{r.val.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InvoiceEstimatorTool = () => {
  const [rate, setRate] = useState('75');
  const [hours, setHours] = useState('40');
  const [tax, setTax] = useState('15');

  const r = Number(rate) || 0;
  const h = Number(hours) || 0;
  const t = Number(tax) || 0;
  const sub = r * h;
  const total = sub * (1 + (t / 100));

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Invoice Total</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${total.toLocaleString()}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Subtotal: ${sub.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Hourly Rate ($)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Total Hours</label>
            <input type="number" value={hours} onChange={e => setHours(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Tax (%)</label>
            <input type="number" value={tax} onChange={e => setTax(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

const RoiCalculatorTool = () => {
  const [initial, setInitial] = useState('1000');
  const [current, setCurrent] = useState('1500');

  const i = Number(initial) || 1;
  const c = Number(current) || 0;
  const roi = ((c - i) / i) * 100;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Total Return</p>
          <h2 className={`text-4xl font-black ${roi >= 0 ? 'text-[#00e676]' : 'text-[#ff1744]'}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
          </h2>
          <p className="text-sm font-bold text-white/60 mt-1">Profit: ${(c - i).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Invested ($)</label>
          <input type="number" value={initial} onChange={e => setInitial(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Current ($)</label>
          <input type="number" value={current} onChange={e => setCurrent(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
        </div>
      </div>
    </div>
  );
};

const BudgetSplitterTool = () => {
  const [income, setIncome] = useState('5000');

  const inc = Number(income) || 0;
  const data = [
    { label: 'Needs (50%)', val: inc * 0.5, color: '#00e5ff' },
    { label: 'Wants (30%)', val: inc * 0.3, color: '#ec4899' },
    { label: 'Savings (20%)', val: inc * 0.2, color: '#00e676' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-4">
        {data.map(d => (
          <div key={d.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-black text-white uppercase tracking-tight">{d.label}</span>
              <span className="text-sm font-black" style={{ color: d.color }}>${Math.round(d.val).toLocaleString()}</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full" style={{ width: d.label.includes('50') ? '50%' : d.label.includes('30') ? '30%' : '20%', backgroundColor: d.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Monthly Take-Home Income</label>
        <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
      </div>
    </div>
  );
};

const BreakEvenTool = () => {
  const [fixed, setFixed] = useState('5000');
  const [variable, setVariable] = useState('25');
  const [price, setPrice] = useState('75');

  const f = Number(fixed) || 0;
  const v = Number(variable) || 0;
  const p = Number(price) || 1;

  const units = p > v ? Math.ceil(f / (p - v)) : 0;
  const revenue = units * p;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Units to Break Even</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">{units.toLocaleString()}</h2>
        </div>
        <div className="bg-[#1a1a2e]/50 p-4 rounded-2xl border border-[#2a2a3a] text-center">
          <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Break Even Revenue</p>
          <p className="text-2xl font-black text-white">${revenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Fixed Costs (Total)</label>
          <input type="number" value={fixed} onChange={e => setFixed(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Var. Cost <span className="text-[#00e5ff]">/ Unit</span></label>
            <input type="number" value={variable} onChange={e => setVariable(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Price <span className="text-[#00e5ff]">/ Unit</span></label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

const UrlEncoderTool = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError(false);
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError(false);
    } catch {
      setError(true);
      setOutput('');
    }
  }, [input, mode]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex bg-[#1a1a2e] p-1 rounded-2xl border border-[#2a2a3a]">
          <button onClick={() => setMode('encode')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'encode' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'decode' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}>Decode</button>
        </div>
        <div className="relative">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Output</span>
            {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>}
          </div>
          <div className={`bg-black/30 p-4 rounded-2xl font-mono text-xs break-all min-h-[100px] border ${error ? 'border-red-500/50 text-red-200' : 'border-white/5 text-white/90'}`}>
            {error ? 'Invalid input for URL decoding' : output || 'Waiting for input...'}
          </div>
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" />
      </div>
    </div>
  );
};

const ChmodCalcTool = () => {
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

const HttpStatusCodesTool = () => {
  const codes = [
    { code: 200, name: 'OK', desc: 'Standard response for successful HTTP requests.' },
    { code: 201, name: 'Created', desc: 'The request has been fulfilled, resulting in the creation of a new resource.' },
    { code: 204, name: 'No Content', desc: 'The server successfully processed the request and is not returning any content.' },
    { code: 400, name: 'Bad Request', desc: 'The server cannot or will not process the request due to an apparent client error.' },
    { code: 401, name: 'Unauthorized', desc: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.' },
    { code: 403, name: 'Forbidden', desc: 'The request contained valid data and was understood by the server, but the server is refusing action.' },
    { code: 404, name: 'Not Found', desc: 'The requested resource could not be found but may be available in the future.' },
    { code: 405, name: 'Method Not Allowed', desc: 'A request method is not supported for the requested resource.' },
    { code: 500, name: 'Internal Server Error', desc: 'A generic error message, given when an unexpected condition was encountered.' },
    { code: 502, name: 'Bad Gateway', desc: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.' },
    { code: 503, name: 'Service Unavailable', desc: 'The server cannot handle the request (because it is overloaded or down for maintenance).' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {codes.map((c) => (
        <div key={c.code} className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${c.code < 300 ? 'bg-green-500/20 text-green-400' : c.code < 500 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              {c.code}
            </span>
            <h3 className="text-white font-bold text-sm">{c.name}</h3>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  );
};

const CurlBuilderTool = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/data');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [data, setData] = useState('');

  const curl = `curl -X ${method} "${url}" ${headers ? `-H "${headers}"` : ''} ${data ? `-d '${data}'` : ''}`.trim().replace(/\s+/g, ' ');

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Generated cURL</span>
          <button onClick={() => navigator.clipboard.writeText(curl)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>
        </div>
        <pre className="bg-black/30 p-4 rounded-2xl font-mono text-[10px] text-white/90 break-all leading-tight border border-white/5 whitespace-pre-wrap">
          {curl}
        </pre>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none">
              {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none" placeholder="https://api.com" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Header</label>
          <input value={headers} onChange={e => setHeaders(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none" placeholder="Key: Value" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Data (for POST/PUT)</label>
          <textarea value={data} onChange={e => setData(e.target.value)} rows={3} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none font-mono" placeholder='{"id": 1}' />
        </div>
      </div>
    </div>
  );
};

const PasswordGenTool = () => {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let res = "";
    for (let i = 0; i < length; i++) {
      res += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(res);
  };

  useEffect(generate, [length, useUpper, useNumbers, useSymbols]);

  const strength = length < 8 ? 'Weak' : length < 12 ? 'Fair' : length < 16 ? 'Good' : 'Strong';

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{strength} Password</span>
          <button onClick={() => navigator.clipboard.writeText(password)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>
        </div>
        <div className="bg-black/30 p-4 rounded-2xl font-mono text-sm text-white/90 break-all leading-tight border border-white/5 text-center min-h-[60px] flex items-center justify-center">
          {password}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between px-1">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest">Length: {length}</label>
          </div>
          <input type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-accent" />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'Uppercase', val: useUpper, set: setUseUpper },
            { label: 'Numbers', val: useNumbers, set: setUseNumbers },
            { label: 'Symbols', val: useSymbols, set: setUseSymbols },
          ].map(opt => (
            <button key={opt.label} onClick={() => opt.set(!opt.val)} className={`flex justify-between items-center px-4 py-3 rounded-xl border transition-all ${opt.val ? 'bg-accent/10 border-accent/30 text-white' : 'bg-[#1a1a2e] border-[#2a2a3a] text-gray-500'}`}>
              <span className="text-xs font-bold uppercase">{opt.label}</span>
              {opt.val ? <Check className="w-4 h-4 text-accent" /> : <div className="w-4 h-4" />}
            </button>
          ))}
        </div>
        <button onClick={generate} className="mt-2 py-4 bg-accent text-bg-dark rounded-2xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-accent/20 active:scale-95 transition-all">Regenerate</button>
      </div>
    </div>
  );
};

const JwtTool = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      setHeader('');
      setPayload('');
      setError(false);
      return;
    }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error();
      setHeader(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
      setError(false);
    } catch {
      setError(true);
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">JWT Token</label>
        <textarea value={token} onChange={e => setToken(e.target.value)} rows={4} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-xs font-mono outline-none focus:border-[#00e5ff] transition-all resize-none" placeholder="Paste eyJhbG..." />
      </div>
      {error && <p className="text-[10px] text-red-400 px-1 font-mono">Invalid JWT format</p>}
      {!error && header && (
        <div className="grid gap-4">
          <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4">
            <p className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-2">Header</p>
            <pre className="text-[10px] font-mono text-white/80 overflow-x-auto">{header}</pre>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4">
            <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-2">Payload</p>
            <pre className="text-[10px] font-mono text-white/80 overflow-x-auto">{payload}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

const CaesarCipherTool = () => {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(13);

  const process = (str: string, s: number) => {
    return str.replace(/[a-z]/gi, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + s) % 26) + start);
    });
  };

  const result = process(text, shift);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Result (Shift {shift})</span>
          <button onClick={() => navigator.clipboard.writeText(result)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>
        </div>
        <div className="bg-black/30 p-4 rounded-2xl font-mono text-sm text-white/90 break-all leading-tight border border-white/5 min-h-[80px]">
          {result || 'Waiting for input...'}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] transition-all resize-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Shift Amount: {shift}</label>
          <input type="range" min="1" max="25" value={shift} onChange={e => setShift(parseInt(e.target.value))} className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-accent" />
        </div>
      </div>
    </div>
  );
};

const ColorPickerTool = () => {
  const [hex, setHex] = useState('#00e5ff');

  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="h-40 rounded-3xl shadow-2xl transition-colors duration-300 border-4 border-[#2a2a3a]" style={{ backgroundColor: hex }} />
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Hex Color</label>
          <div className="flex gap-2">
            <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-14 bg-transparent border-none cursor-pointer" />
            <input value={hex} onChange={e => setHex(e.target.value)} className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl px-5 text-[#ffffff] text-lg font-mono outline-none focus:border-[#00e5ff]" />
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 flex justify-between items-center">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">RGB</span>
          <span className="text-sm font-mono text-white">{hexToRgb(hex)}</span>
        </div>
      </div>
    </div>
  );
};

const GradientGenTool = () => {
  const [c1, setC1] = useState('#00e5ff');
  const [c2, setC2] = useState('#6366f1');
  const [angle, setAngle] = useState(135);

  const css = `linear-gradient(${angle}deg, ${c1}, ${c2})`;

  return (
    <div className="flex flex-col gap-6">
      <div className="h-40 rounded-3xl border-4 border-[#2a2a3a]" style={{ background: css }} />
      <div className="bg-black/30 p-4 rounded-2xl font-mono text-[10px] text-accent/80 break-all leading-tight border border-white/5 flex justify-between items-center">
        <code>background: {css};</code>
        <button onClick={() => navigator.clipboard.writeText(`background: ${css};`)} className="text-gray-500 hover:text-white"><Copy className="w-3 h-3" /></button>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-full h-12 bg-transparent border-none cursor-pointer" />
          <input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-full h-12 bg-transparent border-none cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Angle: {angle}°</label>
          <input type="range" min="0" max="360" value={angle} onChange={e => setAngle(parseInt(e.target.value))} className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-accent" />
        </div>
      </div>
    </div>
  );
};

const TextDiffTool = () => {
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

const MimeTypesTool = () => {
  const mimeTypes = [
    { ext: '.json', type: 'application/json' },
    { ext: '.js', type: 'application/javascript' },
    { ext: '.html', type: 'text/html' },
    { ext: '.css', type: 'text/css' },
    { ext: '.png', type: 'image/png' },
    { ext: '.jpg', type: 'image/jpeg' },
    { ext: '.svg', type: 'image/svg+xml' },
    { ext: '.pdf', type: 'application/pdf' },
    { ext: '.zip', type: 'application/zip' },
    { ext: '.txt', type: 'text/plain' },
  ];

  return (
    <div className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] overflow-hidden">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#1a1a2e] border-b border-[#2a2a3a]">
          <tr>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">Extension</th>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">MIME Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2a2a3a]/50">
          {mimeTypes.map(m => (
            <tr key={m.ext} className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-white">{m.ext}</td>
              <td className="p-4 text-accent font-mono">{m.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TermuxRefTool = () => {
  const [search, setSearch] = useState('');
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const sections = [
    {
      title: 'Package Management',
      color: '#00e5ff',
      commands: [
        { cmd: 'pkg update && pkg upgrade', desc: 'Update repositories and packages' },
        { cmd: 'pkg install <name>', desc: 'Install a new package' },
        { cmd: 'pkg uninstall <name>', desc: 'Remove a package' },
        { cmd: 'pkg list-installed', desc: 'List all installed packages' },
        { cmd: 'pkg search <query>', desc: 'Search for available packages' },
      ]
    },
    {
      title: 'File System',
      color: '#00e676',
      commands: [
        { cmd: '~/ = /data/data/com.termux/files/home', desc: 'Default home directory' },
        { cmd: '/sdcard or ~/storage/shared', desc: 'Internal Android storage' },
        { cmd: 'termux-setup-storage', desc: 'Grant storage permissions' },
        { cmd: 'ls, cd, cp, mv, rm, mkdir, cat, nano', desc: 'Standard Unix file operations' },
      ]
    },
    {
      title: 'Development',
      color: '#d1c4e9',
      commands: [
        { cmd: 'pkg install nodejs-lts', desc: 'Install Node.js (LTS version)' },
        { cmd: 'pkg install python', desc: 'Install Python 3' },
        { cmd: 'pkg install git', desc: 'Install Git version control' },
        { cmd: 'npm install -g <package>', desc: 'Install global NPM package' },
        { cmd: 'pip install <package> --break-system-packages', desc: 'Install Python package' },
      ]
    },
    {
      title: 'Networking',
      color: '#ff9800',
      commands: [
        { cmd: 'pkg install curl wget nmap', desc: 'Install essential network tools' },
        { cmd: 'curl -X POST url -d \'data\'', desc: 'Perform HTTP POST request' },
        { cmd: 'wget https://example.com/file', desc: 'Download a file from URL' },
        { cmd: 'nmap -sV 192.168.1.1', desc: 'Scan for open ports and services' },
      ]
    },
    {
      title: 'Proot / Distro',
      color: '#ff1744',
      commands: [
        { cmd: 'pkg install proot-distro', desc: 'Install Linux distro manager' },
        { cmd: 'proot-distro install debian', desc: 'Install Debian Linux' },
        { cmd: 'proot-distro login debian', desc: 'Enter Debian shell' },
        { cmd: 'proot-distro list', desc: 'List available distributions' },
      ]
    },
    {
      title: 'ADB & Shizuku',
      color: '#ffd600',
      commands: [
        { cmd: 'pkg install android-tools', desc: 'Install ADB and Fastboot' },
        { cmd: 'adb devices', desc: 'List connected ADB devices' },
        { cmd: 'adb shell', desc: 'Enter remote Android shell' },
        { cmd: 'rish', desc: 'Shizuku shell (requires Shizuku app)' },
        { cmd: 'adb install app.apk', desc: 'Install APK via ADB' },
        { cmd: 'adb push file /sdcard/', desc: 'Send file to Android storage' },
      ]
    },
    {
      title: 'Process Management',
      color: '#2979ff',
      commands: [
        { cmd: 'jobs, bg, fg', desc: 'Manage background jobs' },
        { cmd: 'kill <pid>', desc: 'Terminate process by ID' },
        { cmd: 'pkill <name>', desc: 'Terminate process by name' },
        { cmd: 'Ctrl+C', desc: 'Stop current process' },
        { cmd: 'Ctrl+Z', desc: 'Suspend current process' },
      ]
    },
    {
      title: 'Tips & Shortcuts',
      color: '#f06292',
      commands: [
        { cmd: 'Volume Up', desc: 'Equivalent to Special key' },
        { cmd: 'Ctrl+A', desc: 'Move cursor to start of line' },
        { cmd: 'Ctrl+E', desc: 'Move cursor to end of line' },
        { cmd: 'Ctrl+U', desc: 'Clear the entire line' },
        { cmd: 'Long press', desc: 'Open context/paste menu' },
        { cmd: '~/.bashrc', desc: 'Config file for aliases' },
        { cmd: 'alias ll=\'ls -la\'', desc: 'Create a custom shortcut' },
      ]
    }
  ];

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 800);
  };

  const filteredSections = sections.map(s => ({
    ...s,
    commands: s.commands.filter(c => 
      c.cmd.toLowerCase().includes(search.toLowerCase()) || 
      c.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(s => s.commands.length > 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <SearchBar value={search} onChange={setSearch} placeholder="Search commands..." />
      </div>

      <div className="flex flex-col gap-3">
        {filteredSections.map((section, sIdx) => (
          <div key={section.title} className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] overflow-hidden">
            <button 
              onClick={() => setOpenSection(openSection === sIdx ? null : sIdx)}
              className="w-full px-6 py-4 flex items-center justify-between transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: section.color }} />
                <h3 className="text-[11px] font-black uppercase tracking-widest" style={{ color: section.color }}>{section.title}</h3>
              </div>
              <motion.div animate={{ rotate: openSection === sIdx ? 180 : 0 }}>
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {(openSection === sIdx || search) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 pb-4 overflow-hidden"
                >
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {section.commands.map((c, cIdx) => {
                      const id = `${sIdx}-${cIdx}`;
                      return (
                        <button 
                          key={id}
                          onClick={() => handleCopy(c.cmd, id)}
                          className="w-full text-left p-3 rounded-2xl bg-black/20 border border-white/5 hover:border-accent/30 transition-all group relative overflow-hidden"
                        >
                          <AnimatePresence>
                            {copiedIndex === id && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-accent/10 pointer-events-none"
                              />
                            )}
                          </AnimatePresence>
                          <div className="flex justify-between items-start mb-1">
                            <code className="text-[11px] font-mono text-white/90 break-all leading-tight">{c.cmd}</code>
                            {copiedIndex === id ? (
                              <Check className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                            ) : (
                              <Copy className="w-3 h-3 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                            )}
                          </div>
                          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">{c.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onClose }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderContent = () => {
    switch (tool.id) {
      case 'ohms-law':
        return <OhmsLawTool />;
      case 'resistor-code':
        return <ResistorCodeTool />;
      case 'pwm-calc':
        return <PwmCalculatorTool />;
      case 'capacitor-calc':
        return <CapacitorCalcTool />;
      case 'wire-gauge':
        return <WireGaugeTool />;
      case 'bolt-torque':
        return <TorqueCalculatorTool />;
      case 'gear-ratio':
        return <GearRatioTool />;
      case 'pressure-calc':
        return <RpmSpeedTool />;
      case 'beam-deflection':
        return <SpringRateTool />;
      case 'concrete-mix':
        return <ConcreteCalcTool />;
      case 'slope-grade':
        return <SlopeGradeTool />;
      case 'board-foot':
        return <BoardFootTool />;
      case 'miter-cut':
        return <FinishCoverageTool />;
      case 'screw-pilot':
        return <DovetailAngleTool />;
      case 'regex-tester':
        return <JsonFormatterTool />;
      case 'jwt-decoder':
        return <RegexTesterTool />;
      case 'crontab-guide':
        return <TimestampConverterTool />;
      case 'hash-generator':
        return <HashGeneratorTool />;
      case 'token-counter':
        return <TokenCounterTool />;
      case 'prompt-optimizer':
        return <PromptCostTool />;
      case 'embedding-view':
        return <ContextWindowTool />;
      case 'model-comparison':
        return <ModelComparisonTable />;
      case 'loan-calc':
        return <LoanCalculatorTool />;
      case 'compound-interest':
        return <CompoundInterestTool />;
      case 'tip-calc':
        return <TipCalculatorTool />;
      case 'currency-convert':
        return <CurrencyReferenceTool />;
      case 'invoice-calc':
        return <InvoiceEstimatorTool />;
      case 'roi-calc':
        return <RoiCalculatorTool />;
      case 'budget-split':
        return <BudgetSplitterTool />;
      case 'break-even':
        return <BreakEvenTool />;
      case 'model-compare':
        return <Base64Tool />;
      case 'url-encoder':
        return <UrlEncoderTool />;
      case 'chmod-calc':
        return <ChmodCalcTool />;
      case 'http-status':
        return <HttpStatusCodesTool />;
      case 'curl-builder':
        return <CurlBuilderTool />;
      case 'mime-types':
        return <MimeTypesTool />;
      case 'password-gen':
        return <PasswordGenTool />;
      case 'jwt-tool':
        return <JwtTool />;
      case 'caesar-cipher':
        return <CaesarCipherTool />;
      case 'color-picker':
        return <ColorPickerTool />;
      case 'gradient-gen':
        return <GradientGenTool />;
      case 'text-diff':
        return <TextDiffTool />;
      case 'termux-ref':
        return <TermuxRefTool />;
      case 'c3':
        return <RebarWeightTool />;
      case 'c4':
        return <FlowRateTool />;
      case 'w4':
        return <ShelfSagTool />;
      case 'g1':
        return <UnitConverterTool />;
      case 'g2':
        return <LevelTool />;
      case 'g3':
        return <StopwatchTool />;
      case 'g4':
        return <FlashlightTool />;
      case 'gemini-assistant':
        return <GeminiAssistant />;
      default:
        return (
          <div className="bg-card-dark rounded-3xl p-8 border border-gray-800/50 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-2"
              style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
            >
              {tool.icon}
            </div>
            <h2 className="text-xl font-bold text-white">Logic Placeholder</h2>
            <p className="text-gray-400 text-sm max-w-[240px]">
              The specific interactive logic for the <span className="text-white font-medium">{tool.name}</span> tool will be implemented here.
            </p>
            
            <div className="w-full h-32 bg-[#1a1a2e]/50 rounded-2xl border border-dashed border-gray-800 mt-4 flex items-center justify-center">
              <span className="text-gray-600 text-xs font-mono tracking-tighter">TOOL_CONTENT_AREA</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="fixed inset-0 z-50 bg-[#0f0f14] flex flex-col mx-auto shadow-2xl"
    >
      <div className="h-[3px] w-full" style={{ backgroundColor: tool.color }} />
      
      <header className="flex items-center justify-between px-4 py-5 border-b border-gray-800/50 bg-[#0f0f14]/80 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-base font-black text-white leading-none mb-1">{tool.name}</h1>
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: tool.color }}>
              {tool.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 active:scale-95 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 active:scale-95 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8"
        >
          <motion.div variants={item}>
            {renderContent()}
          </motion.div>

          <motion.div variants={item} className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-[#2a2a3a]/50" />
              <h3 className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-[0.2em]">Documentation</h3>
              <div className="h-px flex-1 bg-[#2a2a3a]/50" />
            </div>
            <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a]/50">
              <p className="text-gray-400 text-sm leading-relaxed italic">
                {tool.longDescription}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};
