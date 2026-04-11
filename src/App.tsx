/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Zap, Ruler, Calculator, Settings, Info, ArrowLeft, Star, Search, Scale, Thermometer, Gauge } from 'lucide-react';

type ToolCategory = 'Electrical' | 'Mechanical' | 'General' | 'Civil';

const TOOLS: Record<ToolCategory, { name: string; icon: React.ReactNode; description: string }[]> = {
  Electrical: [
    { name: 'Ohm\'s Law', icon: <Zap className="w-5 h-5" />, description: 'Calculate Voltage, Current, or Resistance.' },
    { name: 'Resistor Color Code', icon: <Zap className="w-5 h-5" />, description: 'Determine resistor values from color bands.' },
  ],
  Mechanical: [
    { name: 'Torque Converter', icon: <Ruler className="w-5 h-5" />, description: 'Convert between different torque units.' },
  ],
  Civil: [],
  General: [
    { name: 'Unit Converter', icon: <Calculator className="w-5 h-5" />, description: 'Convert between various engineering units.' },
  ],
};

const FORMULAS: Record<ToolCategory, { name: string; formula: string }[]> = {
  Electrical: [{ name: 'Ohm\'s Law', formula: 'V = I * R' }, { name: 'Power', formula: 'P = V * I' }],
  Mechanical: [{ name: 'Torque', formula: 'T = F * r' }],
  Civil: [{ name: 'Stress', formula: 'σ = F / A' }],
  General: [],
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('Electrical');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [pinnedTools, setPinnedTools] = useState<string[]>(['Ohm\'s Law']);
  const [searchQuery, setSearchQuery] = useState('');

  const togglePin = (toolName: string) => {
    setPinnedTools(prev => prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]);
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
  const renderTool = () => {
    if (selectedTool === 'Ohm\'s Law') {
      return <OhmsLawCalculator />;
    } else if (selectedTool === 'Unit Converter') {
      return <UnitConverter />;
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
