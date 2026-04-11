import { useState } from 'react';

export default function Calculators() {
  const [inputs, setInputs] = useState({ force: '', distance: '', angle: 90 });
  const [result, setResult] = useState<number | null>(null);

  const calculateTorque = () => {
    const { force, distance, angle } = inputs;
    const rad = (Number(angle) * Math.PI) / 180;
    setResult(Number(force) * Number(distance) * Math.sin(rad));
  };

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Torque Calculator</h2>
      <div className="space-y-4">
        <input type="number" placeholder="Force (N)" className="block w-full p-4 rounded-lg bg-slate-800 border border-slate-700" onChange={(e) => setInputs({...inputs, force: e.target.value})} />
        <input type="number" placeholder="Distance (m)" className="block w-full p-4 rounded-lg bg-slate-800 border border-slate-700" onChange={(e) => setInputs({...inputs, distance: e.target.value})} />
        <input type="number" placeholder="Angle (deg, default 90)" className="block w-full p-4 rounded-lg bg-slate-800 border border-slate-700" onChange={(e) => setInputs({...inputs, angle: Number(e.target.value) || 90})} />
        <button onClick={calculateTorque} className="bg-blue-600 hover:bg-blue-500 transition-colors p-4 w-full rounded-lg font-bold text-lg">Calculate</button>
      </div>
      {result !== null && (
        <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-blue-500/30">
          <p className="text-sm text-slate-400">Calculated Result:</p>
          <p className="text-4xl font-mono">{result.toFixed(2)} <span className="text-xl">Nm</span></p>
        </div>
      )}
    </div>
  );
}
