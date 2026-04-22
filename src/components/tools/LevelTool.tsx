import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LevelTool = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMotion = (e: DeviceOrientationEvent) => {
      if (e.beta !== null) setAngle(e.beta);
    };
    window.addEventListener('deviceorientation', handleMotion);
    return () => window.removeEventListener('deviceorientation', handleMotion);
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center py-10">
      <div className="relative w-64 h-64 rounded-full border-4 border-[#2a2a3a] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: angle }}
          className="w-1 h-48 bg-accent rounded-full"
          transition={{ type: 'spring', damping: 20 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#0f0f14] px-4 py-2 rounded-xl border border-white/10">
            <h2 className="text-3xl font-black text-white">{Math.abs(Math.round(angle))}°</h2>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Inclinometer Mode</p>
    </div>
  );
};
