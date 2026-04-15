/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Zap, Ruler, Calculator, Settings, Info, ArrowLeft, Star, Search, MessageSquare, Menu, X } from 'lucide-react';
import { ResistorColorCodeCalculator } from './components/ResistorColorCodeCalculator';
import { OhmsLawCalculator } from './components/OhmsLawCalculator';
import { UnitConverter } from './components/UnitConverter';
import { VoltageDividerCalculator } from './components/VoltageDividerCalculator';
import { LEDResistorCalculator } from './components/LEDResistorCalculator';
import { GearRatioCalculator } from './components/GearRatioCalculator';
import { ConcreteVolumeCalculator } from './components/ConcreteVolumeCalculator';
import { SlopeCalculator } from './components/SlopeCalculator';
import { callGemini } from './lib/gemini';

type ToolCategory = 'All' | 'Electrical' | 'Mechanical' | 'General' | 'Civil' | 'AI Assistant';

const ALL_TOOLS: { name: string; icon: React.ReactNode; description: string; category: Exclude<ToolCategory, 'All'> }[] = [
  { name: "Ohm's Law", icon: <Zap className="w-6 h-6" />, description: 'Calculate V, I, or R', category: 'Electrical' },
  { name: 'Resistor Color Code', icon: <Zap className="w-6 h-6" />, description: 'Read resistor bands', category: 'Electrical' },
  { name: 'Voltage Divider', icon: <Zap className="w-6 h-6" />, description: 'Calculate output voltage', category: 'Electrical' },
  { name: 'LED Resistor', icon: <Zap className="w-6 h-6" />, description: 'Calculate LED resistor', category: 'Electrical' },
  { name: 'Torque Calculator', icon: <Ruler className="w-6 h-6" />, description: 'Calculate torque', category: 'Mechanical' },
  { name: 'Gear Ratio', icon: <Settings className="w-6 h-6" />, description: 'Calculate gear ratios', category: 'Mechanical' },
  { name: 'Unit Converter', icon: <Calculator className="w-6 h-6" />, description: 'Convert units', category: 'General' },
  { name: 'Concrete Volume', icon: <Calculator className="w-6 h-6" />, description: 'Calculate concrete', category: 'Civil' },
  { name: 'Slope Calculator', icon: <Ruler className="w-6 h-6" />, description: 'Calculate slope', category: 'Civil' },
  { name: 'Gemini Assistant', icon: <MessageSquare className="w-6 h-6" />, description: 'Ask AI questions', category: 'AI Assistant' },
];

const GeminiAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const reply = await callGemini(newMessages);
      setMessages([...newMessages, { role: 'model', content: reply }]);
    } catch (err: any) {
      setMessages([...newMessages, { role: 'model', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border flex flex-col h-[600px]">
      <h3 className="text-2xl font-bold mb-6">Gemini Engineering Assistant</h3>
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-4 rounded-lg ${m.role === 'user' ? 'bg-accent/20 border border-accent/30 ml-8' : 'bg-muted border border-border mr-8'}`}>
            <p className="font-bold mb-1 text-xs uppercase tracking-widest text-accent">{m.role === 'user' ? 'You' : 'Gemini'}</p>
            <p className="text-sm whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && <p className="text-muted-foreground italic animate-pulse">Gemini is thinking...</p>}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Ask anything about formulas, materials, or engineering concepts.</p>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask an engineering question..." 
          className="flex-1 p-3 bg-input text-foreground rounded-lg focus:outline-none border border-border focus:border-accent" 
        />
        <button onClick={sendMessage} disabled={loading} className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-6 rounded-lg transition disabled:opacity-50">Send</button>
      </div>
    </div>
  );
};

const TorqueCalculator = () => {
  const [force, setForce] = useState('');
  const [distance, setDistance] = useState('');
  const [angle, setAngle] = useState('90');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const f = parseFloat(force);
    const d = parseFloat(distance);
    const a = parseFloat(angle);
    if (isNaN(f) || isNaN(d) || isNaN(a)) {
      setResult(null);
      return;
    }
    const rad = (a * Math.PI) / 180;
    setResult(f * d * Math.sin(rad));
  };

  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
      <h3 className="text-2xl font-bold mb-6">Torque Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wider">Force (N)</label>
          <input type="number" value={force} onChange={(e) => setForce(e.target.value)} placeholder="Force (N)" className="w-full p-3 bg-input text-foreground border border-border rounded-lg" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wider">Distance (m)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Distance (m)" className="w-full p-3 bg-input text-foreground border border-border rounded-lg" />
        </div>
        <div>
          <label className="block text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wider">Angle (deg)</label>
          <input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} placeholder="90" className="w-full p-3 bg-input text-foreground border border-border rounded-lg" />
        </div>
      </div>
      <button onClick={calculate} className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-6 rounded-lg transition w-full">Calculate</button>
      {result !== null && (
        <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-xl text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-1">Calculated Torque</p>
          <p className="text-4xl font-bold">{result.toFixed(2)} Nm</p>
        </div>
      )}
    </div>
  );
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
  "Torque Calculator": <TorqueCalculator />,
  "Gemini Assistant": <GeminiAssistant />,
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
    <div className="relative min-h-screen font-sans text-white overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.16),transparent_30%)] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-48 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent opacity-70" />
      <header className="relative z-10 p-8 bg-slate-950/70 border-b border-slate-800 backdrop-blur-xl shadow-[0_25px_100px_rgba(15,23,42,0.35)]">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Engineer's Toolbox</h1>
            <p className="mt-4 max-w-2xl text-slate-300 text-sm sm:text-base">A playful engineering workspace with tools, formulas, and AI-powered help that feels interactive and alive.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-[320px]">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-full bg-slate-900/90 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700" />
            </div>
            <button className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/85 px-4 py-3 text-slate-200 transition hover:border-cyan-400 hover:text-white">Settings</button>
            <button className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/85 px-4 py-3 text-slate-200 transition hover:border-cyan-400 hover:text-white">Info</button>
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="card-3d rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">Instant calculations</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Fast tool switching</h2>
            <p className="mt-3 text-slate-400">Jump between electrical, civil, and mechanical solvers with a single click.</p>
          </div>
          <div className="card-3d rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">AI guidance</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Gemini-powered help</h2>
            <p className="mt-3 text-slate-400">Ask questions, get formulas, and verify designs without leaving the app.</p>
          </div>
          <div className="card-3d rounded-[28px] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">Modern UI</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Interactive dashboard</h2>
            <p className="mt-3 text-slate-400">Sleek layouts, hover motion, and responsive components give it a polished feel.</p>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="w-72 p-6 border-r border-slate-800 h-[calc(100vh-96px)] overflow-y-auto sticky top-[96px] bg-slate-950/70 backdrop-blur-xl shadow-lg">
          <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4 tracking-wider">Frequently Used</h3>
          <ul className="space-y-3 mb-8">
            {pinnedTools.map(tool => (
              <li key={tool}>
                <button 
                  onClick={() => setSelectedTool(tool)}
                  className="w-full text-left text-sm font-semibold p-3 bg-slate-900/75 border border-slate-800 rounded-3xl shadow-sm transition hover:border-cyan-400/50 hover:bg-slate-900/95"
                >
                  {tool}
                </button>
              </li>
            ))}
          </ul>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4 tracking-wider">Categories</h3>
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
              <button onClick={() => setSelectedTool(null)} className="flex items-center gap-2 text-muted-foreground hover:text-text mb-6 transition"><ArrowLeft className="w-4 h-4" /> Back to Toolbox</button>
              <div className="max-w-4xl mx-auto">
                {renderTool()}
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-accent rounded-full" />
                {selectedCategory} Tools
              </h2>
              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] mb-12">
                <div className="card-3d rounded-[32px] border border-slate-800 bg-slate-900/85 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.35)]">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Interactive launchpad</p>
                  <h2 className="mt-5 text-3xl font-semibold text-white">Try the toolbox in one click</h2>
                  <p className="mt-4 text-slate-400 leading-relaxed">Pick a tool, explore formulas, or ask Gemini anything. The interface responds instantly with hover motion and clear category navigation.</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {['Ohm\'s Law', 'Torque Calculator', 'Gemini Assistant'].map((tool) => (
                      <button key={tool} onClick={() => setSelectedTool(tool)} className="rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-900">{tool}</button>
                    ))}
                  </div>
                </div>
                <div className="card-3d rounded-[28px] border border-slate-800 bg-slate-900/85 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.25)]">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Experience</p>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-5">
                      <p className="text-sm text-slate-400">Live navigation between categories</p>
                      <p className="mt-2 text-lg font-semibold text-white">Electrical, Mechanical, Civil, and AI tools in one place.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-5">
                      <p className="text-sm text-slate-400">Hover animations and depth</p>
                      <p className="mt-2 text-lg font-semibold text-white">Cards respond with tilt, glow, and smooth motion.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-5">
                      <p className="text-sm text-slate-400">AI assistance built in</p>
                      <p className="mt-2 text-lg font-semibold text-white">Ask questions directly in the app for instant engineering support.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {TOOLS[selectedCategory].filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((tool) => (
                  <div key={tool.name} className="card-3d bg-slate-900/80 text-card-foreground p-6 rounded-[28px] shadow-2xl border border-slate-700/70 hover:border-cyan-400/40 transition-transform duration-500 cursor-pointer relative group">
                    <button onClick={() => togglePin(tool.name)} className="absolute top-3 right-3 p-2 opacity-0 group-hover:opacity-100 transition"><Star className={`w-5 h-5 ${pinnedTools.includes(tool.name) ? 'fill-yellow-400 text-yellow-400 opacity-100' : 'text-slate-400'}`} /></button>
                    <div onClick={() => setSelectedTool(tool.name)}>
                      <div className="mb-4 text-cyan-300 bg-cyan-500/10 w-14 h-14 flex items-center justify-center rounded-3xl shadow-inner shadow-cyan-500/10">{tool.icon}</div>
                      <h3 className="text-xl font-semibold group-hover:text-cyan-300 transition">{tool.name}</h3>
                      <p className="text-sm text-slate-400 mt-3 leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-border rounded-full" />
                Engineering Formulas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchQuery ? Object.values(FORMULAS).flat() : FORMULAS[selectedCategory])
                  .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(f => (
                    <div key={f.name} className="card-3d bg-slate-900/60 text-card-foreground p-6 rounded-[24px] shadow-xl border border-slate-700/50">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-2">{f.name}</h4>
                      <p className="font-mono text-lg text-cyan-300">{f.formula}</p>
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
