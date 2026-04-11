import { useState, useEffect } from 'react';

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
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-2xl font-bold mb-8">Professional Level</h1>
      <div className="relative w-64 h-64 border-4 border-gray-600 rounded-full flex items-center justify-center">
        <div 
          className="w-12 h-12 bg-blue-500 rounded-full transition-transform duration-100 ease-out"
          style={{ transform: `translate(${roll * 2}px, ${pitch * 2}px)` }}
        />
      </div>
      <div className="mt-8 text-xl">
        <p>Pitch: {pitch}°</p>
        <p>Roll: {roll}°</p>
      </div>
    </div>
  );
}