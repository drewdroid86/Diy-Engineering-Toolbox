import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Trash2, Info, ChevronRight, Key, Ruler, Database } from 'lucide-react';
import { usePersistence } from '../hooks/usePersistence';

export const Settings: React.FC = () => {
  const [openRouterKey, setOpenRouterKey] = usePersistence('api_key_openrouter', '');
  const [exchangeRateKey, setExchangeRateKey] = usePersistence('api_key_exchangerate', '');
  const [unitSystem, setUnitSystem] = usePersistence<'metric' | 'imperial'>('pref_unit_system', 'metric');
  const [precision, setPrecision] = usePersistence<number>('pref_precision', 2);

  const clearPins = () => {
    if (confirm('Clear all pinned tools?')) {
      localStorage.removeItem('pinned_tools');
      window.location.reload();
    }
  };

  const clearHistory = () => {
    if (confirm('Clear recent tool history?')) {
      localStorage.removeItem('recent_tools');
      window.location.reload();
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="px-4 py-6 pb-32">
      <header className="mb-8 px-2">
        <h1 className="text-2xl font-black text-white">Settings</h1>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">App Preferences</p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Appearance Section */}
        <motion.section variants={item} className="space-y-3">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Appearance</h2>
          <div className="bg-[#1a1a24] rounded-3xl border border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Dark Mode</p>
                  <p className="text-[10px] text-gray-500">Always on (Standard)</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-accent rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 px-6 opacity-40 grayscale pointer-events-none">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gray-800 flex items-center justify-center text-gray-500">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Light Mode</p>
                  <p className="text-[10px] text-gray-500">Coming soon</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-gray-800 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-600 rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Preferences Section */}
        <motion.section variants={item} className="space-y-3">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Measurement & Logic</h2>
          <div className="bg-[#1a1a24] rounded-3xl border border-gray-800 overflow-hidden divide-y divide-gray-800/50">
            <div className="p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Unit System</p>
                  <p className="text-[10px] text-gray-500">Default measurement standard</p>
                </div>
              </div>
              <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setUnitSystem('metric')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${unitSystem === 'metric' ? 'bg-accent text-bg-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  METRIC
                </button>
                <button 
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${unitSystem === 'imperial' ? 'bg-accent text-bg-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  IMP
                </button>
              </div>
            </div>
            <div className="p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <span className="text-sm font-black">.00</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Decimal Precision</p>
                  <p className="text-[10px] text-gray-500">Rounding for calculations</p>
                </div>
              </div>
              <select 
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="bg-black/20 text-accent text-xs font-bold py-2 px-3 rounded-xl border border-white/5 outline-none focus:border-accent"
              >
                <option value={1}>1 place</option>
                <option value={2}>2 places</option>
                <option value={3}>3 places</option>
                <option value={4}>4 places</option>
              </select>
            </div>
          </div>
        </motion.section>

        {/* API Keys Section */}
        <motion.section variants={item} className="space-y-3">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Live Data & APIs</h2>
          <div className="bg-[#1a1a24] rounded-3xl border border-gray-800 overflow-hidden divide-y divide-gray-800/50">
            <div className="p-4 px-6 space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">OpenRouter API Key</p>
                  <p className="text-[10px] text-gray-500">For live LLM pricing & tokens</p>
                </div>
              </div>
              <input 
                type="password"
                placeholder="sk-or-v1-..."
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                className="w-full bg-black/20 border border-gray-800 rounded-xl py-3 px-4 text-xs font-mono text-accent outline-none focus:border-accent/50 transition-all"
              />
            </div>
            <div className="p-4 px-6 space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">ExchangeRate API Key</p>
                  <p className="text-[10px] text-gray-500">For live currency reference</p>
                </div>
              </div>
              <input 
                type="password"
                placeholder="Enter API Key..."
                value={exchangeRateKey}
                onChange={(e) => setExchangeRateKey(e.target.value)}
                className="w-full bg-black/20 border border-gray-800 rounded-xl py-3 px-4 text-xs font-mono text-accent outline-none focus:border-accent/50 transition-all"
              />
            </div>
          </div>
        </motion.section>

        {/* Data Management Section */}
        <motion.section variants={item} className="space-y-3">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">Data Management</h2>
          <div className="bg-[#1a1a24] rounded-3xl border border-gray-800 overflow-hidden">
            <button 
              onClick={clearPins}
              className="w-full flex items-center justify-between p-4 px-6 border-b border-gray-800/50 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Clear Pinned Tools</p>
                  <p className="text-[10px] text-gray-500">Reset your favorites</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
            <button 
              onClick={clearHistory}
              className="w-full flex items-center justify-between p-4 px-6 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Clear Recent History</p>
                  <p className="text-[10px] text-gray-500">Wipe recent tool activity</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={item} className="space-y-3">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">About</h2>
          <div className="bg-[#1a1a24] rounded-3xl border border-gray-800 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-accent flex items-center justify-center text-bg-dark font-black text-2xl shadow-xl shadow-accent/20">
              DIY
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Engineering Toolbox</h3>
              <p className="text-xs text-gray-500 mt-1">Version 1.1.0 - "Upgrade Core"</p>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <Info className="w-3 h-3" /> System OK
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};
