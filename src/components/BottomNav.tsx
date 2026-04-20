import React from 'react';
import { Home, Wrench, Settings, History, Bookmark, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tools', icon: Wrench, label: 'Tools' },
    { id: 'pinned', icon: Bookmark, label: 'Pinned' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0f0f14]/90 backdrop-blur-xl border-t border-gray-800 z-40">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center min-w-[50px] outline-none"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -top-[13px] w-8 h-[2px] bg-accent shadow-[0_0_8px_#00e5ff]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <motion.div
                animate={{ 
                  y: isActive ? -2 : 0,
                  color: isActive ? '#00e5ff' : '#4b5563'
                }}
                className="relative"
              >
                <tab.icon className="w-6 h-6" />
              </motion.div>

              <motion.span
                initial={false}
                animate={{ 
                  opacity: isActive ? 1 : 0.5,
                  scale: isActive ? 1 : 0.9,
                  height: 'auto',
                  marginTop: 6
                }}
                className={`text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-accent' : 'text-gray-600'} overflow-hidden`}
              >
                {tab.label}
              </motion.span>            </button>
          );
        })}
      </div>
    </div>
  );
};
