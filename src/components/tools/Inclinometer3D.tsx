import { useState, useEffect } from 'react';
import { ToolCard, MetricDisplay } from '../ui/ToolComponents';

export default function Inclinometer3D() {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    const handle = (e: DeviceOrientationEvent) => {
      setOrientation({
        alpha: Math.round(e.alpha || 0),
        beta: Math.round(e.beta || 0),
        gamma: Math.round(e.gamma || 0)
      });
    };
    window.addEventListener('deviceorientation', handle);
    return () => window.removeEventListener('deviceorientation', handle);
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-slate-200">3D Inclinometer</h2>
      <ToolCard className="grid grid-cols-1 gap-6">
        <MetricDisplay label="Yaw" value={orientation.alpha.toString()} unit="°" />
        <div className="h-px bg-slate-700 w-full" />
        <MetricDisplay label="Pitch" value={orientation.beta.toString()} unit="°" />
        <div className="h-px bg-slate-700 w-full" />
        <MetricDisplay label="Roll" value={orientation.gamma.toString()} unit="°" />
      </ToolCard>
    </div>
  );
}
