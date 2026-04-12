import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const ToolCard: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-3xl shadow-2xl ${className}`}>
    {children}
  </div>
);

export const MetricDisplay: React.FC<{ label: string; value: string; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl font-mono text-white font-bold tracking-tighter drop-shadow-lg">
      {value}
      {unit && <span className="text-xl text-slate-500 ml-1">{unit}</span>}
    </div>
    <div className="text-xs text-slate-400 uppercase tracking-[0.2em] mt-1">{label}</div>
  </div>
);

export const Scene3DContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative w-full h-[300px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%)]" />
    {children}
  </div>
);
