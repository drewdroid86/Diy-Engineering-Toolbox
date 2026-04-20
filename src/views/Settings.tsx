import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Trash2, Info, ChevronRight } from 'lucide-react';

export const Settings: React.FC = () => {
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

        <motion.section variants={item} className="space-y-3">
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-2">About</h2>
          <div className="bg-[#1a1a24] rounded-3xl border border-gray-800 p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-accent flex items-center justify-center text-bg-dark font-black text-2xl shadow-xl shadow-accent/20">
              DIY
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Engineering Toolbox</h3>
              <p className="text-xs text-gray-500 mt-1">Version 1.0.4 - "Vite Core"</p>
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
