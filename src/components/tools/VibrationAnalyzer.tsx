import { useState, useEffect, useRef } from 'react';
import { ToolCard, MetricDisplay, Scene3DContainer } from '../ui/ToolComponents';

export default function VibrationAnalyzer() {
  const [peak, setPeak] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 1024;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const update = () => {
          analyser.getByteFrequencyData(dataArray);
          let max = 0;
          for (let i = 0; i < dataArray.length; i++) if (dataArray[i] > max) max = dataArray[i];
          setPeak(max);
          requestAnimationFrame(update);
        };
        update();
      } catch (e) { console.error(e); }
    };
    start();
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-slate-200">Vibration Analyzer</h2>
      
      <Scene3DContainer>
        <div className="absolute bottom-0 w-full flex items-end justify-center gap-1 h-32 p-4">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="bg-emerald-500 rounded-t w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
              style={{ height: `${(peak / 255) * 80 + 10}%` }} 
            />
          ))}
        </div>
      </Scene3DContainer>

      <ToolCard className="mt-6 text-center">
        <MetricDisplay label="Peak Amplitude" value={peak.toString()} />
      </ToolCard>
    </div>
  );
}
