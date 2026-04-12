import { useState, useEffect, useRef } from 'react';
import { ToolCard, MetricDisplay } from '../ui/ToolComponents';

export default function DecibelMeter() {
  const [db, setDb] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateDb = () => {
          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
          setDb(Math.round(20 * Math.log10(sum / bufferLength + 1)));
          requestAnimationFrame(updateDb);
        };
        updateDb();
      } catch (err) {
        console.error("Audio access denied", err);
      }
    };
    startAudio();
  }, []);

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6 text-slate-200">Decibel Meter</h2>
      <ToolCard className="flex flex-col items-center py-12">
        <MetricDisplay label="Ambient Noise" value={db.toString()} unit="dB" />
      </ToolCard>
    </div>
  );
}
