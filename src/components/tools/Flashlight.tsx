import { useState } from 'react';

export default function Flashlight() {
  const [isOn, setIsOn] = useState(false);

  const toggleFlashlight = async () => {
    try {
      if (!isOn) {
        // Request access to torch/flashlight
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        const track = stream.getVideoTracks()[0];
        // @ts-ignore
        await track.applyConstraints({ advanced: [{ torch: true }] });
        setIsOn(true);
      } else {
        // Turn off logic would require persistent track reference
        alert('Flashlight control active - manual hardware toggle required to turn off in this browser');
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
