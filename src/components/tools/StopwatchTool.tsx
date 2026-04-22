import React, { useState, useEffect } from 'react';

export const StopwatchTool = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (running) {
      interval = setInterval(() => setTime(prev => prev + 10), 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const msecs = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-10 border border-accent/20 text-center">
        <h2 className="text-6xl font-black text-white font-mono">{formatTime(time)}</h2>
      </div>
      <div className="flex gap-4">
        <button onClick={() => setRunning(!running)} className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${running ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-accent text-bg-dark'}`}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => { if (running) setLaps([time, ...laps]); else { setTime(0); setLaps([]); } }} className="flex-1 py-4 rounded-2xl bg-white/5 text-white font-black uppercase tracking-widest border border-white/10">
          {running ? 'Lap' : 'Reset'}
        </button>
      </div>
      {laps.length > 0 && (
        <div className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] max-h-48 overflow-y-auto p-4 flex flex-col gap-2">
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-xl">
              <span className="text-[10px] font-black text-gray-500 uppercase">Lap {laps.length - i}</span>
              <span className="text-sm font-mono text-white">{formatTime(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
