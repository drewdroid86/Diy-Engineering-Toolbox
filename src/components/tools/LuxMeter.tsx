import { useState, useEffect } from 'react';
import { ToolCard, MetricDisplay } from '../ui/ToolComponents';

export default function LuxMeter() {
  const [lux, setLux] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('AmbientLightSensor' in window) {
      try {
        const sensor = new (window as any).AmbientLightSensor();
        sensor.addEventListener('reading', () => setLux(sensor.illuminance));
        sensor.addEventListener('error', (e: any) => setError(e.error.message));
        sensor.start();
      } catch (err) {
        setError("Sensor initialization failed.");
      }
    } else {
      setError("Sensor not supported on this device.");
    }
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-slate-200">Ambient Lux Meter</h2>
      <ToolCard className="flex flex-col items-center py-12">
        <MetricDisplay 
          label="Illuminance" 
          value={lux !== null ? lux.toFixed(0) : '--'} 
          unit="lux" 
        />
        {error && <p className="text-orange-400 mt-6 text-sm">{error}</p>}
      </ToolCard>
    </div>
  );
}
