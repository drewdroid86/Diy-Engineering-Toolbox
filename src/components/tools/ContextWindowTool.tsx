import React from 'react';
import { motion } from 'framer-motion';

export const ContextWindowTool = () => {
  const models = [
    { name: 'Gemini 1.5 Pro', limit: 2000000 },
    { name: 'Gemini 1.5 Flash', limit: 1000000 },
    { name: 'Claude 3.5', limit: 200000 },
    { name: 'GPT-4o', limit: 128000 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex flex-col gap-5">
          {models.map(m => (
            <div key={m.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between px-1">
                <span className="text-[10px] font-black text-white uppercase tracking-tight">{m.name}</span>
                <span className="text-[10px] font-bold text-accent">{(m.limit / 1000).toLocaleString()}k</span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: `${(m.limit / 2000000) * 100}%` }} className="h-full bg-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
