import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const RpmSpeedTool = () => {
  const [mode, setMode] = useState<'vehicle' | 'pulley'>('vehicle');
  const [v1, setV1] = useState('60'); // MPH or Pulley 1 RPM
  const [v2, setV2] = useState('25'); // Tire Dia or Pulley 1 Dia
  const [v3, setV3] = useState('3.73'); // Ratio or Pulley 2 Dia

  const speed = Number(v1) || 0;
  const tire = Number(v2) || 1;
  const ratio = Number(v3) || 1;

  const vehicleRpm = (speed * ratio * 336) / tire;
  const pulleyRpm = (speed * tire) / ratio;
  
  const finalRpm = mode === 'vehicle' ? vehicleRpm : pulleyRpm;
  const normalizedRpm = Math.min(8000, finalRpm);
  const rotation = -90 + (normalizedRpm / 8000) * 180;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex bg-[#1a1a2e] p-1 rounded-2xl border border-[#2a2a3a]">
          <button 
            onClick={() => setMode('vehicle')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'vehicle' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}
          >
            Vehicle Drive
          </button>
          <button 
            onClick={() => setMode('pulley')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${mode === 'pulley' ? 'bg-accent text-bg-dark shadow-lg shadow-accent/20' : 'text-[#aaaacc] hover:text-gray-300'}`}
          >
            Pulley System
          </button>
        </div>
        
        <div className="relative h-44 flex items-center justify-center overflow-hidden pt-8">
          <svg width="240" height="150" viewBox="0 0 200 120" className="text-accent overflow-visible">
            <defs>
              <filter id="rpmGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background Arch */}
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#2a2a3a" strokeWidth="8" strokeLinecap="round" />
            
            {/* Redline Zone */}
            <path d="M 157.5 43.5 A 80 80 0 0 1 180 100" fill="none" stroke="#ff1744" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
            
            {/* Ticks */}
            {Array.from({ length: 41 }).map((_, i) => {
              const ang = -180 + (i * 180 / 40);
              const isMajor = i % 5 === 0;
              const isRedline = i > 35;
              const x1 = 100 + 78 * Math.cos(ang * Math.PI / 180);
              const y1 = 100 + 78 * Math.sin(ang * Math.PI / 180);
              const x2 = 100 + (isMajor ? 92 : 86) * Math.cos(ang * Math.PI / 180);
              const y2 = 100 + (isMajor ? 92 : 86) * Math.sin(ang * Math.PI / 180);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={isRedline ? '#ff1744' : 'currentColor'} strokeWidth={isMajor ? 2 : 1} opacity={isMajor ? 0.6 : 0.2} />;
            })}

            {/* Labels */}
            {[0, 2, 4, 6, 8].map(v => {
              const ang = -180 + (v * 180 / 8);
              const x = 100 + 60 * Math.cos(ang * Math.PI / 180);
              const y = 100 + 60 * Math.sin(ang * Math.PI / 180);
              return <text key={v} x={x} y={y} fill={v >= 7 ? '#ff1744' : '#aaaacc'} fontSize="9" fontWeight="black" textAnchor="middle" alignmentBaseline="middle">{v}</text>;
            })}

            {/* Needle */}
            <motion.g
              animate={{ rotate: rotation }}
              style={{ originX: "100px", originY: "100px" }}
              transition={{ type: "spring", damping: 12, stiffness: 80 }}
            >
              <line
                x1="100" y1="100" x2="100" y2="25"
                stroke={normalizedRpm > 7000 ? '#ff1744' : '#00e5ff'}
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#rpmGlow)"
              />
              <circle cx="100" cy="100" r="10" fill="#1a1a2e" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="4" fill={normalizedRpm > 7000 ? '#ff1744' : '#00e5ff'} />
            </motion.g>
          </svg>
          
          <div className="absolute bottom-2 text-center flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <motion.h2 key={Math.round(finalRpm)} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-4xl font-black text-white">{Math.round(finalRpm)}</motion.h2>
              <span className="text-xs font-bold text-[#aaaacc] tracking-tight">RPM</span>
            </div>
            <p className="text-[8px] font-black text-[#aaaacc] uppercase tracking-[0.3em] opacity-40 mt-1">
              {mode === 'vehicle' ? 'Chassis Speed' : 'Gear Velocity'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {mode === 'vehicle' ? (
          <>
            <div className="relative">
              <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Speed <span className="text-[#00e5ff]">(MPH)</span></label>
              <input type="number" value={v1} onChange={e => setV1(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Tire Dia <span className="text-[#00e5ff]">(in)</span></label>
                <input type="number" value={v2} onChange={e => setV2(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Final Ratio</label>
                <input type="number" value={v3} onChange={e => setV3(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Drive RPM</label>
              <input type="number" value={v1} onChange={e => setV1(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Drive Dia</label>
                <input type="number" value={v2} onChange={e => setV2(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Driven Dia</label>
                <input type="number" value={v3} onChange={e => setV3(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] outline-none transition-all" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
