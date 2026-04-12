import { useState } from 'react';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [type, setType] = useState('in2cm');

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return;

    switch (type) {
      case 'in2cm': setResult(num * 2.54); break;
      case 'cm2in': setResult(num / 2.54); break;
      case 'lb2kg': setResult(num * 0.453592); break;
      case 'kg2lb': setResult(num / 0.453592); break;
      default: setResult(null);
    }
  };

  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Unit Converter</h2>
      <div className="space-y-4">
        <select 
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="in2cm">Inches to CM</option>
          <option value="cm2in">CM to Inches</option>
          <option value="lb2kg">Lbs to KG</option>
          <option value="kg2lb">KG to Lbs</option>
        </select>
        <input 
          type="number" 
          placeholder="Enter value" 
          className="block w-full p-4 rounded-lg bg-slate-800 border border-slate-700" 
          onChange={(e) => setValue(e.target.value)} 
        />
        <button 
          onClick={convert} 
          className="bg-emerald-600 hover:bg-emerald-500 transition-colors p-4 w-full rounded-lg font-bold text-lg"
        >
          Convert
        </button>
      </div>
      {result !== null && (
        <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-emerald-500/30">
          <p className="text-sm text-slate-400">Result:</p>
          <p className="text-4xl font-mono">{result.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}
