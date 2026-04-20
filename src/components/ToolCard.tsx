import React, { useState } from 'react';
import { Tool } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  isPinned: boolean;
  onTogglePin: (e: React.MouseEvent) => void;
  onClick: () => void;
  variant?: 'icon' | 'preview';
}

export const ToolCard = React.forwardRef<HTMLDivElement, ToolCardProps>(
  ({ tool, isPinned, onTogglePin, onClick, variant = 'icon' }, ref) => {
    const [showPin, setShowPin] = useState(false);

    if (variant === 'preview') {
      return (
        <motion.div
          ref={ref}
          layout
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="shrink-0 w-[150px] h-[90px] rounded-2xl p-3 flex flex-col justify-between cursor-pointer relative overflow-hidden group border border-white/5"
          style={{ backgroundColor: `${tool.color}15` }}
        >
          <div className="flex justify-between items-start">
            <span className="text-xl">{tool.icon}</span>
            {isPinned && <Pin className="w-3 h-3 text-accent fill-accent" />}
          </div>
          <span className="text-[10px] font-bold text-white uppercase tracking-tight line-clamp-1">
            {tool.name}
          </span>
          <div 
            className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full w-0"
            style={{ backgroundColor: tool.color }}
          />
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowPin(!showPin);
        }}
        className="flex flex-col items-center gap-1.5 cursor-pointer group relative w-full"
      >
        {/* Icon Launcher Style */}
        <div 
          className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform duration-200 group-active:scale-90"
          style={{ 
            backgroundColor: `${tool.color}15`,
            border: `1px solid ${tool.color}10`
          }}
        >
          {tool.icon}
        </div>

        {/* Tool Name */}
        <span className="text-[10px] font-medium text-gray-300 text-center leading-tight line-clamp-2 px-0.5 w-full">
          {tool.name}
        </span>

        {/* Pin Overlay */}
        <AnimatePresence>
          {(showPin || isPinned) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(e);
              }}
              className={`absolute -top-1 -right-1 p-1 rounded-full shadow-lg z-10 ${isPinned ? 'bg-accent text-bg-dark' : 'bg-gray-800 text-white'}`}
            >
              <Pin className="w-2.5 h-2.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
