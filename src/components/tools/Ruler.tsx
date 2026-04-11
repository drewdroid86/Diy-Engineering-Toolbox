import { useState, useLayoutEffect } from 'react';

export default function Ruler() {
  const [ppi, setPpi] = useState(96);

  useLayoutEffect(() => {
    const div = document.createElement('div');
    div.style.width = '1in';
    div.style.visibility = 'hidden';
    div.style.position = 'absolute';
    document.body.appendChild(div);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPpi(div.offsetWidth);
    document.body.removeChild(div);
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-slate-50 min-h-screen text-slate-800">
      <h2 className="text-3xl font-bold mb-6 tracking-tight">Digital Ruler</h2>
      <div className="w-full overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-lg p-6">
        <div style={{ width: `${ppi * 10}px` }} className="h-32 bg-slate-100 flex items-end border-b-4 border-slate-900">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex-1 border-l border-slate-400 h-1/2 relative">
              <span className="absolute -top-6 left-1 text-sm font-medium">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-500 italic">Align object with the bottom edge.</p>
    </div>
  );
}
