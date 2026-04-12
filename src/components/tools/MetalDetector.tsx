import { useState, useEffect } from 'react';
import { ToolCard, MetricDisplay, Scene3DContainer } from '../ui/ToolComponents';

export default function MetalDetector() {
  const [magnitude, setMagnitude] = useState(0);

  useEffect(() => {
    const handleMagnetometer = (event: any) => {
      const { x, y, z } = event.reading;
      const mag = Math.sqrt(x * x + y * y + z * z);
      setMagnitude(Math.round(mag));
    };

    if ('Magnetometer' in window) {
      const mag = new (window as any).Magnetometer({ frequency: 60 });
      mag.addEventListener('reading', () => handleMagnetometer(mag));
      mag.start();
      return () => mag.stop();
    }
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-slate-200">Metal Detector</h2>
      
      <Scene3DContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48 rounded-full border-4 border-slate-700/50 flex items-center justify-center">
            <div className={`absolute w-32 h-32 rounded-full transition-all duration-300 ${magnitude > 50 ? 'bg-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.6)]' : 'bg-slate-700 shadow-[0_0_20px_rgba(30,41,59,0.5)]'}`} />
          </div>
        </div>
      </Scene3DContainer>

      <ToolCard className="mt-6 text-center">
        <MetricDisplay label="Magnetic Intensity" value={magnitude.toString()} unit="µT" />
        <p className="mt-4 text-xs text-slate-500 italic">Detecting fluctuations in magnetic field.</p>
      </ToolCard>
    </div>
  );
}
