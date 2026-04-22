import React, { useState, useEffect } from 'react';
import { Home } from './views/Home';
import { Settings } from './views/Settings';
import { ToolDetail } from './views/ToolDetail';
import { BottomNav } from './components/BottomNav';
import { Tool } from './types';
import { TOOLS } from './data';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  // Migration logic for tool IDs
  useEffect(() => {
    const validIds = new Set(TOOLS.map(t => t.id));
    
    ['pinned_tools', 'recent_tools'].forEach(key => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const ids = JSON.parse(saved);
          if (Array.isArray(ids)) {
            const filtered = ids.filter(id => validIds.has(id));
            if (filtered.length !== ids.length) {
              localStorage.setItem(key, JSON.stringify(filtered));
            }
          }
        } catch (e) {
          console.error(`Failed to migrate ${key}`, e);
        }
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark font-sans overflow-x-hidden">
      <div className="mx-auto max-w-7xl min-h-screen relative w-full px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'settings' ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Settings />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Home onOpenTool={(tool) => setSelectedTool(tool)} />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {selectedTool && (
            <ToolDetail 
              tool={selectedTool} 
              onClose={() => setSelectedTool(null)} 
            />
          )}
        </AnimatePresence>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default App;
