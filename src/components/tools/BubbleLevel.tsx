import { useState, useEffect } from 'react';
import { ToolCard, MetricDisplay, Scene3DContainer } from '../ui/ToolComponents';

export default function BubbleLevel() {
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setPitch(event.beta ? Math.round(event.beta) : 0);
      setRoll(event.gamma ? Math.round(event.gamma) : 0);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-slate-200">Professional Level</h2>

      <Scene3DContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-40 h-40 border-2 border-slate-700 rounded-full flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-950" />
            <div 
              className="w-12 h-12 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-transform duration-100 ease-out"
              style={{ transform: `translate(${roll * 1.5}px, ${pitch * 1.5}px)` }}
            />
          </div>
        </div>
      </Scene3DContainer>

      <ToolCard className="mt-6 grid grid-cols-2 gap-4">
        <MetricDisplay label="Pitch" value={pitch.toString()} unit="°" />
        <MetricDisplay label="Roll" value={roll.toString()} unit="°" />
      </ToolCard>
    </div>
  );
}