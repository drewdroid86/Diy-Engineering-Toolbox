import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const TokenCounterTool = () => {
  const [text, setText] = useState('');

  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const estTokens = Math.ceil(charCount / 4);

  const primaryLimit = 1000000;
  const usagePct = Math.min(100, (estTokens / primaryLimit) * 100);
  const needleRotation = -90 + (usagePct / 100) * 180;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col items-center gap-6">
        <div className="relative h-40 flex items-center justify-center overflow-hidden">
          <svg width="240" height="140" viewBox="0 0 240 140" className="overflow-visible">
            <path d="M 30 120 A 90 90 0 0 1 210 120" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" opacity="0.05" />
            <path d="M 30 120 A 90 90 0 0 1 138 30" fill="none" stroke="#00e676" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
            <path d="M 138 30 A 90 90 0 0 1 195 65" fill="none" stroke="#ffd600" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
            <path d="M 195 65 A 90 90 0 0 1 210 120" fill="none" stroke="#ff1744" strokeWidth="12" strokeLinecap="round" opacity="0.1" />
            <motion.path d="M 30 120 A 90 90 0 0 1 210 120" fill="none" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={282.7 - (usagePct / 100 * 282.7)} opacity="0.2" />
            {/* Ticks */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(p => {
              const ang = -180 + (p * 180 / 100);
              const x1 = 120 + 80 * Math.cos(ang * Math.PI / 180);
              const y1 = 120 + 80 * Math.sin(ang * Math.PI / 180);
              const x2 = 120 + 95 * Math.cos(ang * Math.PI / 180);
              const y2 = 120 + 95 * Math.sin(ang * Math.PI / 180);
              return <line key={p} x1={x1} y1={y1} x2={x2} y2={y2} stroke={p > 85 ? "#ff1744" : p > 60 ? "#ffd600" : "#ffffff"} strokeWidth="1.5" opacity="0.2" />;
            })}
            <motion.line x1="120" y1="120" x2="120" y2="40" stroke="#000" strokeWidth="4" strokeLinecap="round" animate={{ rotate: needleRotation + 2 }} style={{ originX: "120px", originY: "120px" }} transition={{ type: "spring", damping: 12, stiffness: 80 }} opacity="0.3" />
            <motion.line x1="120" y1="120" x2="120" y2="40" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" animate={{ rotate: needleRotation }} style={{ originX: "120px", originY: "120px" }} transition={{ type: "spring", damping: 12, stiffness: 80 }} />
            <circle cx="120" cy="120" r="10" fill="#1a1a2e" stroke="#2a2a3a" strokeWidth="2" />
            <circle cx="120" cy="120" r="4" fill="#00e5ff" />
          </svg>
          <div className="absolute bottom-2 text-center">
            <h2 className="text-3xl font-black text-white">{usagePct.toFixed(1)}%</h2>
            <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Total Fill</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: 'Characters', val: charCount.toLocaleString() },
            { label: 'Words', val: wordCount.toLocaleString() },
            { label: 'Sentences', val: sentenceCount.toLocaleString() },
            { label: '~ Tokens', val: estTokens.toLocaleString(), accent: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1a1a2e]/50 border border-[#2a2a3a] rounded-2xl p-4 flex flex-col items-center">
              <p className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-xl font-black ${stat.accent ? 'text-accent' : 'text-white'}`}>{stat.val}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Prompt Text</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" placeholder="Paste your prompt or text here..." />
      </div>
    </div>
  );
};
