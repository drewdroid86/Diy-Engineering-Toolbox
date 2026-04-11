import { useState, useEffect } from 'react';

export default function AngleModule() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Use alpha for compass/angle orientation
      setAngle(event.alpha ? Math.round(event.alpha) : 0);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Angle Module</h2>
      <div className="w-64 h-64 border-4 border-yellow-500 rounded-full flex items-center justify-center">
        <div style={{ transform: `rotate(${angle}deg)` }} className="w-1 h-32 bg-yellow-500 origin-bottom transition-transform" />
      </div>
      <p className="mt-4 text-2xl">{angle}°</p>
    </div>
  );
}
