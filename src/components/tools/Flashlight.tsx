import { useState, useRef, useEffect } from 'react';

export default function Flashlight() {
  const [isOn, setIsOn] = useState(false);
  const trackRef = useRef<MediaStreamTrack | null>(null);

  useEffect(() => {
    return () => {
      // Clean up track on unmount
      if (trackRef.current) {
        trackRef.current.stop();
      }
    };
  }, []);

  const toggleFlashlight = async () => {
    try {
      if (!isOn) {
        // Request access to torch/flashlight
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const track = stream.getVideoTracks()[0];
        // @ts-expect-error Torch constraints exist in some browsers
        await track.applyConstraints({ advanced: [{ torch: true }] });
        trackRef.current = track;
        setIsOn(true);
      } else {
        if (trackRef.current) {
          // @ts-expect-error Turn off torch
          await trackRef.current.applyConstraints({ advanced: [{ torch: false }] }).catch(() => {});
          trackRef.current.stop();
          trackRef.current = null;
        }
        setIsOn(false);
      }
    } catch (err) {
      alert('Flashlight not accessible or unsupported on this device.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h2 className="text-2xl font-bold mb-8">Flashlight Module</h2>
      <button 
        onClick={toggleFlashlight}
        className={`w-32 h-32 rounded-full ${isOn ? 'bg-yellow-400' : 'bg-gray-700'} transition-colors`}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
}
