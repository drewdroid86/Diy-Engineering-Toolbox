/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Zap, Ruler, Calculator, Settings, Info, ArrowLeft, Star, Search, Scale, Thermometer, Gauge, Compass, Dice1, RefreshCcw, Volume2 } from 'lucide-react';

type ToolCategory = 'Electrical' | 'Mechanical' | 'General' | 'Civil';

const TOOLS: Record<ToolCategory, { name: string; icon: React.ReactNode; description: string }[]> = {
  Electrical: [
    { name: 'Ohm\'s Law', icon: <Zap className="w-5 h-5" />, description: 'Calculate Voltage, Current, or Resistance.' },
    { name: 'Resistor Color Code', icon: <Zap className="w-5 h-5" />, description: 'Determine resistor values from color bands.' },
  ],
  Mechanical: [
    { name: 'Torque Converter', icon: <Ruler className="w-5 h-5" />, description: 'Convert between different torque units.' },
    { name: '3D Bubble Level', icon: <Gauge className="w-5 h-5" />, description: 'Animated 3D bubble level.' },
    { name: 'Compass', icon: <Compass className="w-5 h-5" />, description: 'Animated compass heading.' },
    { name: 'Angle Calculator', icon: <Thermometer className="w-5 h-5" />, description: 'Compute angles from rise/run and convert units.' },
  ],
  Civil: [],
  General: [
    { name: 'Welcome', icon: <Info className="w-5 h-5" />, description: 'Get started with the toolbox.' },
    { name: 'Unit Converter', icon: <Calculator className="w-5 h-5" />, description: 'Convert between various engineering units.' },
    { name: 'Coin Flip', icon: <RefreshCcw className="w-5 h-5" />, description: 'Flip a virtual coin with animation.' },
    { name: 'Dice Roll', icon: <Dice1 className="w-5 h-5" />, description: 'Roll a six-sided die.' },
    { name: 'Noise Meter', icon: <Volume2 className="w-5 h-5" />, description: 'Simulate ambient noise levels.' },
    { name: 'Settle Account', icon: <Scale className="w-5 h-5" />, description: 'Split a bill and see who owes what.' },
  ],
};

const FORMULAS: Record<ToolCategory, { name: string; formula: string }[]> = {
  Electrical: [{ name: 'Ohm\'s Law', formula: 'V = I * R' }, { name: 'Power', formula: 'P = V * I' }],
  Mechanical: [{ name: 'Torque', formula: 'T = F * r' }],
  Civil: [{ name: 'Stress', formula: 'σ = F / A' }],
  General: [
    { name: 'Angle Conversion', formula: 'rad = deg × π / 180' },
    { name: 'Noise Level', formula: 'dB = 20 log10(p/p₀)' },
    { name: 'Share Split', formula: 'share = total / people' },
  ],
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('General');
  const [selectedTool, setSelectedTool] = useState<string | null>('Welcome');
  const [pinnedTools, setPinnedTools] = useState<string[]>(['Ohm\'s Law']);
  const [searchQuery, setSearchQuery] = useState('');

  const togglePin = (toolName: string) => {
    setPinnedTools(prev => prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]);
  };

const ResistorColorCodeCalculator = () => {
  const [band1, setBand1] = useState(0);
  const [band2, setBand2] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [tolerance, setTolerance] = useState(5);

  const colors = [
    { name: 'Black', value: 0 },
    { name: 'Brown', value: 1 },
    { name: 'Red', value: 2 },
    { name: 'Orange', value: 3 },
    { name: 'Yellow', value: 4 },
    { name: 'Green', value: 5 },
    { name: 'Blue', value: 6 },
    { name: 'Violet', value: 7 },
    { name: 'Gray', value: 8 },
    { name: 'White', value: 9 },
  ];

  const resistance = ((band1 * 10 + band2) * multiplier);

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Resistor Color Code</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-[#8E9299] mb-2">Band 1</label>
          <select onChange={(e) => setBand1(parseInt(e.target.value))} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg">
            {colors.map(c => <option key={c.name} value={c.value}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[#8E9299] mb-2">Band 2</label>
          <select onChange={(e) => setBand2(parseInt(e.target.value))} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg">
            {colors.map(c => <option key={c.name} value={c.value}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[#8E9299] mb-2">Multiplier</label>
          <select onChange={(e) => setMultiplier(Math.pow(10, parseInt(e.target.value)))} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg">
            {colors.map(c => <option key={c.name} value={c.value}>10^{c.value}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[#8E9299] mb-2">Tolerance</label>
          <select onChange={(e) => setTolerance(parseInt(e.target.value))} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg">
            <option value={1}>Brown (1%)</option>
            <option value={2}>Red (2%)</option>
            <option value={5}>Gold (5%)</option>
            <option value={10}>Silver (10%)</option>
          </select>
        </div>
      </div>
      <p className="text-2xl font-bold mt-8">Resistance: {resistance} Ω ±{tolerance}%</p>
    </div>
  );
};

const OhmsLawCalculator = () => {
  const [v, setV] = useState('');
  const [i, setI] = useState('');
  const [r, setR] = useState('');

  const calculate = (changed: 'v' | 'i' | 'r', val: string) => {
    const vNum = changed === 'v' ? parseFloat(val) : parseFloat(v);
    const iNum = changed === 'i' ? parseFloat(val) : parseFloat(i);
    const rNum = changed === 'r' ? parseFloat(val) : parseFloat(r);

    if (changed === 'v') {
      setV(val);
      if (!isNaN(iNum) && iNum !== 0) setR((vNum / iNum).toString());
      else if (!isNaN(rNum) && rNum !== 0) setI((vNum / rNum).toString());
    } else if (changed === 'i') {
      setI(val);
      if (!isNaN(vNum)) setR((vNum / iNum).toString());
      else if (!isNaN(rNum)) setV((iNum * rNum).toString());
    } else if (changed === 'r') {
      setR(val);
      if (!isNaN(vNum)) setI((vNum / rNum).toString());
      else if (!isNaN(iNum)) setV((iNum * rNum).toString());
    }
  };

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Ohm's Law Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-[#8E9299] mb-2">Voltage (V)</label>
          <input type="number" value={v} onChange={(e) => calculate('v', e.target.value)} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg" />
        </div>
        <div>
          <label className="block text-[#8E9299] mb-2">Current (I)</label>
          <input type="number" value={i} onChange={(e) => calculate('i', e.target.value)} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg" />
        </div>
        <div>
          <label className="block text-[#8E9299] mb-2">Resistance (R)</label>
          <input type="number" value={r} onChange={(e) => calculate('r', e.target.value)} className="w-full p-3 bg-[#E6E6E6] text-[#151619] rounded-lg" />
        </div>
      </div>
    </div>
  );
};

const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<'Length' | 'Mass' | 'Volume' | 'Temperature' | 'Pressure'>('Length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');

  const units: Record<string, string[]> = {
    Length: ['meters', 'feet', 'inches', 'miles', 'kilometers'],
    Mass: ['kg', 'lbs', 'grams', 'ounces'],
    Volume: ['liters', 'gallons', 'milliliters', 'cups'],
    Temperature: ['celsius', 'fahrenheit', 'kelvin'],
    Pressure: ['pascal', 'psi', 'bar', 'atm'],
  };

  const conversionFactors: Record<string, number> = {
    meters: 1, feet: 3.28084, inches: 39.3701, miles: 0.000621371, kilometers: 0.001,
    kg: 1, lbs: 2.20462, grams: 1000, ounces: 35.274,
    liters: 1, gallons: 0.264172, milliliters: 1000, cups: 4.22675,
    pascal: 1, psi: 0.000145038, bar: 0.00001, atm: 0.00000986923,
  };

  const convert = (val: number, from: string, to: string) => {
    if (category === 'Temperature') {
      let celsius = 0;
      if (from === 'celsius') celsius = val;
      else if (from === 'fahrenheit') celsius = (val - 32) * 5 / 9;
      else if (from === 'kelvin') celsius = val - 273.15;

      if (to === 'celsius') return celsius;
      if (to === 'fahrenheit') return (celsius * 9 / 5) + 32;
      if (to === 'kelvin') return celsius + 273.15;
      return val;
    }
    return val * (conversionFactors[to] / conversionFactors[from]);
  };

  const result = !isNaN(parseFloat(value)) ? convert(parseFloat(value), fromUnit, toUnit).toFixed(4) : '0.0000';

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Unit Converter</h3>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <select value={category} onChange={(e) => { setCategory(e.target.value as any); setFromUnit(units[e.target.value][0]); setToUnit(units[e.target.value][1]); }} className="p-3 bg-[#E6E6E6] text-[#151619] rounded-lg">
          {Object.keys(units).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="p-3 bg-[#E6E6E6] text-[#151619] rounded-lg" />
        <div className="flex gap-2">
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="p-3 bg-[#E6E6E6] text-[#151619] rounded-lg flex-1">
            {units[category].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="p-3 bg-[#E6E6E6] text-[#151619] rounded-lg flex-1">
            {units[category].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xl font-bold">Result: {result} {toUnit}</p>
    </div>
  );
};

const CoinFlip = () => {
  const [result, setResult] = useState<string>('Flip the coin');
  const [flipping, setFlipping] = useState(false);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setResult(Math.random() < 0.5 ? 'Heads' : 'Tails');
      setFlipping(false);
    }, 800);
  };

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Coin Flip</h3>
      <p className="text-[#8E9299]">Tap the coin to see heads or tails.</p>
      <div style={{ perspective: 700 }} className="mt-8 flex justify-center">
        <div className={`w-36 h-36 rounded-full bg-gradient-to-br from-slate-100 to-yellow-300 shadow-2xl flex items-center justify-center text-2xl font-bold text-[#151619] transition-transform ${flipping ? 'animate-spin' : ''}`}>
          {flipping ? 'Flipping' : result}
        </div>
      </div>
      <button onClick={flip} disabled={flipping} className="mt-8 w-full px-6 py-3 bg-[#FF4444] text-white rounded-lg hover:bg-[#e33a3a] transition disabled:opacity-60">
        {flipping ? 'Flipping...' : 'Flip Coin'}
      </button>
    </div>
  );
};

const DiceRoll = () => {
  const [value, setValue] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 700);
  };

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Dice Roll</h3>
      <p className="text-[#8E9299]">Roll a six-sided die and see the animated result.</p>
      <div className="mt-8 flex justify-center">
        <div className={`w-36 h-36 rounded-3xl bg-white text-[#151619] text-6xl font-bold flex items-center justify-center shadow-xl transition-transform ${rolling ? 'animate-bounce' : ''}`}>
          {value || '?'}
        </div>
      </div>
      <button onClick={roll} disabled={rolling} className="mt-8 w-full px-6 py-3 bg-[#FF4444] text-white rounded-lg hover:bg-[#e33a3a] transition disabled:opacity-60">
        {rolling ? 'Rolling...' : 'Roll Die'}
      </button>
    </div>
  );
};

const NoiseMeter = () => {
  const [level, setLevel] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(30 + Math.round(Math.random() * 80));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const width = Math.min(100, (level / 120) * 100);
  const label = level > 85 ? 'Very loud' : level > 70 ? 'Loud' : level > 50 ? 'Moderate' : 'Quiet';

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Noise Meter</h3>
      <p className="text-[#8E9299]">Simulated ambient noise level.</p>
      <div className="mt-8 space-y-4">
        <div className="h-4 w-full bg-[#E6E6E6] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-600" style={{ width: `${width}%` }} />
        </div>
        <div className="flex justify-between text-sm text-[#8E9299]">
          <span>{label}</span>
          <span>{level} dB</span>
        </div>
      </div>
    </div>
  );
};

const SettleAccount = () => {
  const [total, setTotal] = useState('');
  const [paid, setPaid] = useState('');
  const [people, setPeople] = useState('2');

  const totalNum = parseFloat(total);
  const paidNum = parseFloat(paid);
  const count = Math.max(1, parseInt(people, 10) || 1);
  const share = !isNaN(totalNum) ? totalNum / count : 0;
  const balance = !isNaN(paidNum) ? paidNum - share : 0;

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Settle Account</h3>
      <div className="grid grid-cols-1 gap-4">
        <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="Total amount" className="p-3 rounded-lg text-[#151619] bg-[#E6E6E6]" />
        <input type="number" value={paid} onChange={(e) => setPaid(e.target.value)} placeholder="Amount you paid" className="p-3 rounded-lg text-[#151619] bg-[#E6E6E6]" />
        <input type="number" min="1" value={people} onChange={(e) => setPeople(e.target.value)} placeholder="Number of people" className="p-3 rounded-lg text-[#151619] bg-[#E6E6E6]" />
      </div>
      <div className="mt-8 bg-white text-[#151619] p-6 rounded-xl shadow-inner">
        <p className="font-semibold">Each person owes</p>
        <p className="text-4xl font-bold mt-2">${share.toFixed(2)}</p>
        <p className="mt-4 text-sm text-[#8E9299]">{!isNaN(balance) ? (balance >= 0 ? `You paid $${balance.toFixed(2)} more than your share.` : `You owe $${Math.abs(balance).toFixed(2)}.`) : 'Enter amounts to settle the bill.'}</p>
      </div>
    </div>
  );
};

const BubbleLevel3D = () => {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTilt(prev => {
        if (prev >= 18) return -18;
        return prev + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const bubbleX = tilt * 2;

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">3D Bubble Level</h3>
      <p className="text-[#8E9299]">Animated level showing a bubble moving with tilt.</p>
      <div style={{ perspective: 900 }} className="mt-10 flex justify-center">
        <div className="relative w-80 h-24 bg-[#CBD5E1] rounded-full shadow-inner" style={{ transform: `rotate(${tilt}deg)`, transition: 'transform 0.12s ease-out' }}>
          <div className="absolute inset-y-0 left-1/2 w-32 border border-white/50" />
          <div className="absolute top-1/2 left-1/2 h-14 w-14 rounded-full bg-cyan-400 shadow-2xl" style={{ transform: `translate(-50%, -50%) translateX(${bubbleX}px)` }} />
        </div>
      </div>
    </div>
  );
};

const CompassTool = () => {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeading(prev => (prev + Math.floor(Math.random() * 32) + 8) % 360);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Compass</h3>
      <p className="text-[#8E9299]">Animated heading indicator with a rotating needle.</p>
      <div className="mt-10 flex justify-center">
        <div className="relative w-72 h-72 rounded-full border-8 border-[#94A3B8] bg-[#F8FAFC] shadow-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full border-2 border-[#CBD5E1] bg-gradient-to-br from-white to-slate-200">
              <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.35em] text-[#64748B]">
                N E S W
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-24 w-1 bg-red-500 origin-bottom" style={{ transform: `rotate(${heading}deg)` }} />
                <div className="absolute h-24 w-1 bg-slate-500 origin-bottom" style={{ transform: `rotate(${heading + 180}deg)` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-[#E2E8F0]">
        <p className="text-sm uppercase tracking-[0.25em]">Heading</p>
        <p className="text-3xl font-bold">{heading}°</p>
      </div>
    </div>
  );
};

const AngleCalculator = () => {
  const [rise, setRise] = useState('');
  const [run, setRun] = useState('');
  const riseNum = parseFloat(rise);
  const runNum = parseFloat(run);
  const angle = !isNaN(riseNum) && !isNaN(runNum) && runNum !== 0 ? Math.atan2(riseNum, runNum) : NaN;
  const degrees = !isNaN(angle) ? angle * (180 / Math.PI) : NaN;
  const radians = !isNaN(angle) ? angle.toFixed(3) : '-';

  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-2xl font-bold mb-6">Angle Calculator</h3>
      <p className="text-[#8E9299]">Compute angle from rise/run and see degrees and radians.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <input type="number" value={rise} onChange={(e) => setRise(e.target.value)} placeholder="Rise" className="p-3 rounded-lg text-[#151619] bg-[#E6E6E6]" />
        <input type="number" value={run} onChange={(e) => setRun(e.target.value)} placeholder="Run" className="p-3 rounded-lg text-[#151619] bg-[#E6E6E6]" />
      </div>
      <div className="mt-8 bg-white text-[#151619] p-6 rounded-xl shadow-inner">
        <p className="text-sm text-[#64748B]">Angle</p>
        <p className="text-4xl font-bold mt-2">{isNaN(degrees) ? '-' : `${degrees.toFixed(2)}°`}</p>
        <p className="mt-2 text-sm text-[#64748B]">{`Radians: ${radians}`}</p>
      </div>
    </div>
  );
};

const Welcome = () => {
  return (
    <div className="bg-[#151619] text-white p-8 rounded-xl shadow-lg border border-[#8E9299]/20">
      <h3 className="text-3xl font-bold mb-6">Welcome to the DIY Engineering Toolbox!</h3>
      <p className="text-[#8E9299] mb-8">A collection of useful engineering calculators and fun tools. Browse by category or search for what you need.</p>

      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-semibold mb-3 text-[#FF4444]">Electrical Tools</h4>
          <ul className="space-y-2 text-[#8E9299]">
            <li>• Ohm's Law Calculator - Calculate voltage, current, or resistance</li>
            <li>• Resistor Color Code - Decode resistor band colors</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3 text-[#FF4444]">Mechanical Tools</h4>
          <ul className="space-y-2 text-[#8E9299]">
            <li>• Torque Converter - Convert between torque units</li>
            <li>• 3D Bubble Level - Animated level with moving bubble</li>
            <li>• Compass - Animated heading indicator</li>
            <li>• Angle Calculator - Compute angles from rise/run</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-3 text-[#FF4444]">General Tools</h4>
          <ul className="space-y-2 text-[#8E9299]">
            <li>• Unit Converter - Convert between engineering units</li>
            <li>• Coin Flip - Animated coin toss</li>
            <li>• Dice Roll - Roll a six-sided die</li>
            <li>• Noise Meter - Simulated ambient noise levels</li>
            <li>• Settle Account - Split bills and calculate shares</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 p-4 bg-[#E6E6E6] text-[#151619] rounded-lg">
        <p className="font-semibold">💡 Tip:</p>
        <p className="text-sm mt-1">Use the search bar to quickly find tools, or pin your favorites for easy access!</p>
      </div>
    </div>
  );
};

  const renderTool = () => {
    if (selectedTool === 'Welcome') {
      return <Welcome />;
    } else if (selectedTool === 'Ohm\'s Law') {
      return <OhmsLawCalculator />;
    } else if (selectedTool === 'Resistor Color Code') {
      return <ResistorColorCodeCalculator />;
    } else if (selectedTool === 'Unit Converter') {
      return <UnitConverter />;
    } else if (selectedTool === 'Coin Flip') {
      return <CoinFlip />;
    } else if (selectedTool === 'Dice Roll') {
      return <DiceRoll />;
    } else if (selectedTool === 'Noise Meter') {
      return <NoiseMeter />;
    } else if (selectedTool === 'Settle Account') {
      return <SettleAccount />;
    } else if (selectedTool === '3D Bubble Level') {
      return <BubbleLevel3D />;
    } else if (selectedTool === 'Compass') {
      return <CompassTool />;
    } else if (selectedTool === 'Angle Calculator') {
      return <AngleCalculator />;
    }
    return <p className="text-[#8E9299]">Select a tool to begin.</p>;
  };

  return (
    <div className="min-h-screen bg-[#E6E6E6] text-[#151619] font-sans">
      <header className="p-6 border-b border-[#8E9299]/20 flex justify-between items-center bg-white">
        <h1 className="text-2xl font-bold tracking-tight">Engineer's Toolbox</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8E9299]" />
            <input type="text" placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 rounded-full bg-[#E6E6E6] focus:outline-none" />
          </div>
          <button className="p-2 hover:bg-[#8E9299]/10 rounded-full"><Settings className="w-5 h-5" /></button>
          <button className="p-2 hover:bg-[#8E9299]/10 rounded-full"><Info className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 p-6 border-r border-[#8E9299]/20">
          <h3 className="text-sm font-semibold text-[#8E9299] uppercase mb-4">Frequently Used</h3>
          <ul className="space-y-2 mb-8">
            {pinnedTools.map(tool => <li key={tool} className="text-sm font-medium p-2 bg-white rounded-lg">{tool}</li>)}
          </ul>
          <h3 className="text-sm font-semibold text-[#8E9299] uppercase mb-4">Categories</h3>
          <ul className="space-y-2">
            {(Object.keys(TOOLS) as ToolCategory[]).map((category) => (
              <li key={category}>
                <button onClick={() => { setSelectedCategory(category); setSelectedTool(null); }} className={`w-full text-left p-3 rounded-lg font-medium transition ${selectedCategory === category ? 'bg-[#151619] text-white' : 'hover:bg-[#8E9299]/10'}`}>{category}</button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 p-8">
          {selectedTool ? (
            <div>
              <button onClick={() => setSelectedTool(null)} className="flex items-center gap-2 text-[#8E9299] hover:text-[#151619] mb-6"><ArrowLeft className="w-4 h-4" /> Back</button>
              {renderTool()}
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6">{selectedCategory} Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {TOOLS[selectedCategory].filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((tool) => (
                  <div key={tool.name} className="bg-[#151619] text-white p-6 rounded-xl shadow-lg border border-[#8E9299]/20 hover:border-[#FF4444]/50 transition cursor-pointer relative">
                    <button onClick={() => togglePin(tool.name)} className="absolute top-2 right-2"><Star className={`w-5 h-5 ${pinnedTools.includes(tool.name) ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} /></button>
                    <div onClick={() => setSelectedTool(tool.name)}>
                      <div className="mb-4 text-[#FF4444]">{tool.icon}</div>
                      <h3 className="text-lg font-medium">{tool.name}</h3>
                      <p className="text-sm text-[#8E9299] mt-2">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-6">Formulas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchQuery ? Object.values(FORMULAS).flat() : FORMULAS[selectedCategory])
                  .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(f => (
                    <div key={f.name} className="bg-white p-6 rounded-xl shadow-sm border border-[#8E9299]/20">
                      <h4 className="font-semibold">{f.name}</h4>
                      <p className="font-mono text-sm text-[#8E9299]">{f.formula}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
