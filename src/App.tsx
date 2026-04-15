/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Zap, Ruler, Calculator, Settings, Info, ArrowLeft, Star, Search } from 'lucide-react';
import { ResistorColorCodeCalculator } from './components/ResistorColorCodeCalculator';
import { OhmsLawCalculator } from './components/OhmsLawCalculator';
import { UnitConverter } from './components/UnitConverter';
import { VoltageDividerCalculator } from './components/VoltageDividerCalculator';
import { LEDResistorCalculator } from './components/LEDResistorCalculator';
import { GearRatioCalculator } from './components/GearRatioCalculator';
import { ConcreteVolumeCalculator } from './components/ConcreteVolumeCalculator';
import { SlopeCalculator } from './components/SlopeCalculator';

type ToolCategory = 'Electrical' | 'Mechanical' | 'General' | 'Civil';

const TOOLS: Record<ToolCategory, { name: string; icon: React.ReactNode; description: string }[]> = {
  Electrical: [
    { name: "Ohm's Law", icon: <Zap className="w-5 h-5" />, description: 'Calculate Voltage, Current, or Resistance.' },
    { name: 'Resistor Color Code', icon: <Zap className="w-5 h-5" />, description: 'Determine resistor values from color bands.' },
    { name: 'Voltage Divider', icon: <Zap className="w-5 h-5" />, description: 'Calculate output voltage from a voltage divider.' },
    { name: 'LED Resistor', icon: <Zap className="w-5 h-5" />, description: 'Calculate the required resistor for an LED.' },
  ],
  Mechanical: [
    { name: 'Torque Converter', icon: <Ruler className="w-5 h-5" />, description: 'Convert between different torque units.' },
    { name: 'Gear Ratio', icon: <Settings className="w-5 h-5" />, description: 'Calculate gear ratios.' },
  ],
  Civil: [
      { name: 'Concrete Volume', icon: <Calculator className="w-5 h-5" />, description: 'Calculate volume of concrete needed.' },
      { name: 'Slope Calculator', icon: <Ruler className="w-5 h-5" />, description: 'Calculate slope from rise and run.' },
  ],
  General: [
    { name: 'Unit Converter', icon: <Calculator className="w-5 h-5" />, description: 'Convert between various engineering units.' },
  ],
};

const FORMULAS: Record<ToolCategory, { name: string; formula: string }[]> = {
  Electrical: [
      { name: "Ohm's Law", formula: 'V = I * R' },
      { name: 'Power', formula: 'P = V * I' },
      { name: 'Voltage Divider', formula: 'Vout = Vin * (R2 / (R1 + R2))' },
  ],
  Mechanical: [
      { name: 'Torque', formula: 'T = F * r' },
      { name: 'Gear Ratio', formula: 'Ratio = Teeth_Out / Teeth_In' },
  ],
  Civil: [
      { name: 'Stress', formula: 'σ = F / A' },
      { name: 'Slope', formula: 'Slope = Rise / Run' },
  ],
  General: [],
};

const toolComponents: Record<string, React.ReactNode> = {
  "Ohm's Law": <OhmsLawCalculator />,
  "Resistor Color Code": <ResistorColorCodeCalculator />,
  "Unit Converter": <UnitConverter />,
  "Voltage Divider": <VoltageDividerCalculator />,
  "LED Resistor": <LEDResistorCalculator />,
  "Gear Ratio": <GearRatioCalculator />,
  "Concrete Volume": <ConcreteVolumeCalculator />,
  "Slope Calculator": <SlopeCalculator />,
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('Electrical');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [pinnedTools, setPinnedTools] = useState<string[]>(["Ohm's Law"]);
  const [searchQuery, setSearchQuery] = useState('');

  const togglePin = (toolName: string) => {
    setPinnedTools(prev => prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]);
  };

  const renderTool = () => {
    if (selectedTool && toolComponents[selectedTool]) {
      return toolComponents[selectedTool];
    }
    return <p className="text-muted-foreground">Select a tool to begin.</p>;
  };

  return (
    <div className="min-h-screen font-sans bg-background text-text">
      <header className="p-6 border-b border-border flex justify-between items-center bg-card">
        <h1 className="text-2xl font-bold tracking-tight">Engineer's Toolbox</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 rounded-full bg-input focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button className="p-2 rounded-full hover:bg-muted"><Settings className="w-5 h-5" /></button>
          <button className="p-2 rounded-full hover:bg-muted"><Info className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 p-6 border-r border-border">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Frequently Used</h3>
          <ul className="space-y-2 mb-8">
            {pinnedTools.map(tool => <li key={tool} className="text-sm font-medium p-2 bg-card rounded-lg">{tool}</li>)}
          </ul>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">Categories</h3>
          <ul className="space-y-2">
            {(Object.keys(TOOLS) as ToolCategory[]).map((category) => (
              <li key={category}>
                <button onClick={() => { setSelectedCategory(category); setSelectedTool(null); }} className={`w-full text-left p-3 rounded-lg font-medium transition ${selectedCategory === category ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}>{category}</button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="flex-1 p-8">
          {selectedTool ? (
            <div>
              <button onClick={() => setSelectedTool(null)} className="flex items-center gap-2 text-muted-foreground hover:text-text mb-6"><ArrowLeft className="w-4 h-4" /> Back</button>
              {renderTool()}
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6">{selectedCategory} Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {TOOLS[selectedCategory].filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((tool) => (
                  <div key={tool.name} className="bg-card text-card-foreground p-6 rounded-xl shadow-lg border border-border hover:border-accent transition cursor-pointer relative">
                    <button onClick={() => togglePin(tool.name)} className="absolute top-2 right-2"><Star className={`w-5 h-5 ${pinnedTools.includes(tool.name) ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} /></button>
                    <div onClick={() => setSelectedTool(tool.name)}>
                      <div className="mb-4 text-accent">{tool.icon}</div>
                      <h3 className="text-lg font-medium">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="text-xl font-semibold mb-6">Formulas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchQuery ? Object.values(FORMULAS).flat() : FORMULAS[selectedCategory])
                  .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(f => (
                    <div key={f.name} className="bg-card text-card-foreground p-6 rounded-xl shadow-sm border border-border">
                      <h4 className="font-semibold">{f.name}</h4>
                      <p className="font-mono text-sm text-muted-foreground">{f.formula}</p>
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
