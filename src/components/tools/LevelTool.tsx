import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePersistence } from '../../hooks/usePersistence';
import { Target, RefreshCcw, Maximize2 } from 'lucide-react';

export const LevelTool = () => {
  const [data, setData] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [offsets, setOffsets] = usePersistence('level_offsets', { alpha: 0, beta: 0, gamma: 0 });
  const [mode, setMode] = useState<'inclinometer' | 'bubble'>('inclinometer');

  useEffect(() => {
    const handleMotion = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null && e.alpha !== null) {
        setData({
          alpha: e.alpha,
          beta: e.beta,
          gamma: e.gamma
        });
      }
    };
    
    // Request permission for iOS if needed
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleMotion);
          }
        });
    } else {
      window.addEventListener('deviceorientation', handleMotion);
    }

    return () => window.removeEventListener('deviceorientation', handleMotion);
  }, []);

  const calibrate = () => {
    setOffsets({
      alpha: data.alpha,
      beta: data.beta,
      gamma: data.gamma
    });
  };

  const resetCalibration = () => {
    setOffsets({ alpha: 0, beta: 0, gamma: 0 });
  };

  const x = data.gamma - offsets.gamma;
  const y = data.beta - offsets.beta;

  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="flex gap-2 p-1 bg-black/20 rounded-2xl border border-white/5">
        <button 
          onClick={() => setMode('inclinometer')}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'inclinometer' ? 'bg-accent text-bg-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
        >
          Inclinometer
        </button>
        <button 
          onClick={() => setMode('bubble')}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'bubble' ? 'bg-accent text-bg-dark shadow-lg' : 'text-gray-500 hover:text-white'}`}
        >
          Bubble Level
        </button>
      </div>

      <div className="relative w-72 h-72 rounded-[48px] bg-[#1a1a2e] border-4 border-[#2a2a3a] flex items-center justify-center shadow-2xl overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} 
        />

        {mode === 'inclinometer' ? (
          <>
            <div className="relative w-56 h-56 rounded-full border border-white/5 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: y }}
                className="w-1.5 h-48 bg-accent rounded-full shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              />
              <div className="absolute w-full h-px bg-white/10" />
              <div className="absolute w-px h-full bg-white/10" />
            </div>
          </>
        ) : (
          <>
            <div className="relative w-56 h-56 rounded-full border-2 border-white/10 flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full border border-accent/30" />
              <motion.div 
                animate={{ 
                  x: Math.max(-100, Math.min(100, x * 4)),
                  y: Math.max(-100, Math.min(100, y * 4))
                }}
                className="w-10 h-10 rounded-full bg-accent/20 border-2 border-accent shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center"
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
              >
                <div className="w-2 h-2 rounded-full bg-white/80" />
              </motion.div>
            </div>
          </>
        )}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#0f0f14]/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-3xl font-black text-white tabular-nums">
              {mode === 'inclinometer' ? Math.abs(Math.round(y)) : Math.round(Math.sqrt(x*x + y*y))}°
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full px-4">
        <div className="bg-[#1a1a2e] p-4 rounded-3xl border border-gray-800/50 flex flex-col items-center gap-1">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">X-Axis</span>
          <span className="text-lg font-bold text-white tabular-nums">{Math.round(x)}°</span>
        </div>
        <div className="bg-[#1a1a2e] p-4 rounded-3xl border border-gray-800/50 flex flex-col items-center gap-1">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Y-Axis</span>
          <span className="text-lg font-bold text-white tabular-nums">{Math.round(y)}°</span>
        </div>
      </div>

      <div className="flex gap-4 w-full px-4">
        <button 
          onClick={calibrate}
          className="flex-1 bg-accent text-bg-dark py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-accent/20"
        >
          <Target className="w-4 h-4" /> Calibrate
        </button>
        <button 
          onClick={resetCalibration}
          className="p-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 active:scale-95 transition-all"
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.3em] text-center max-w-[200px] leading-loose">
        Place on flat surface and press calibrate for high precision
      </p>
    </div>
  );
};
