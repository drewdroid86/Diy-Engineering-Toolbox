import React, { useState } from 'react';
import { Home } from './views/Home';
import { Settings } from './views/Settings';
import { ToolDetail } from './views/ToolDetail';
import { BottomNav } from './components/BottomNav';
import { Tool } from './types';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeTab, setActiveTab] = useState('home');

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
