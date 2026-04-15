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
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-8 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">Gemini Assistant</h2>
        <p className="text-gray-600 mt-2">Ask any engineering question</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
            <MessageSquare className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg">No messages yet. Ask a question to get started.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
              <p className="text-sm whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500 italic animate-pulse">Gemini is thinking...</p>}
      </div>

      <div className="p-8 border-t border-gray-200">
        <div className="flex gap-3">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask an engineering question..." 
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={sendMessage} disabled={loading} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50">Send</button>
        </div>
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="p-8 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900">Torque Calculator</h2>
        <p className="text-gray-600 mt-2">Calculate torque from force, distance, and angle</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Force (N)</label>
            <input type="number" value={force} onChange={(e) => setForce(e.target.value)} placeholder="Enter force" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Distance (m)</label>
            <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Enter distance" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Angle (°)</label>
            <input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} placeholder="90" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <button onClick={calculate} className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">Calculate</button>
        {result !== null && (
          <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-sm text-gray-600 font-semibold uppercase">Torque</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{result.toFixed(2)} Nm</p>
          </div>
        )}
      </div>
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
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedTools, setPinnedTools] = useState<string[]>(["Ohm's Law"]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const togglePin = (toolName: string) => {
    setPinnedTools(prev => prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]);
  };

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories: ToolCategory[] = ['All', 'Electrical', 'Mechanical', 'Civil', 'General', 'AI Assistant'];

  if (selectedTool && toolComponents[selectedTool]) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button 
              onClick={() => setSelectedTool(null)}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tools
            </button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {toolComponents[selectedTool]}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Engineer's Toolbox</h1>
              <p className="text-gray-600 mt-1">Quick calculations for electrical, mechanical, and civil engineering</p>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="pb-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search tools..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className={`pb-6 flex flex-wrap gap-2 ${mobileMenuOpen ? 'block' : 'hidden lg:flex'}`}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setMobileMenuOpen(false); }}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === cat 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {pinnedTools.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pinnedTools.map(toolName => {
                const tool = ALL_TOOLS.find(t => t.name === toolName);
                return tool ? (
                  <div
                    key={tool.name}
                    onClick={() => setSelectedTool(tool.name)}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-blue-500 bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition">
                        {tool.icon}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); togglePin(tool.name); }}
                        className="text-yellow-400"
                      >
                        <Star className="w-5 h-5 fill-yellow-400" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{tool.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
                  </div>
                ) : null;
              })}
            </div>
          </section>
        )}

        {/* Tools Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {searchQuery ? `Search Results (${filteredTools.length})` : 'All Tools'}
          </h2>
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No tools found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  onClick={() => setSelectedTool(tool.name)}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-blue-500 bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition">
                      {tool.icon}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); togglePin(tool.name); }}
                      className={pinnedTools.includes(tool.name) ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}
                    >
                      <Star className={`w-5 h-5 ${pinnedTools.includes(tool.name) ? 'fill-yellow-400' : ''}`} />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
                  <span className="inline-block mt-4 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
