import React from 'react';

export const CurrencyReferenceTool = () => {
  const rates = [
    { code: 'EUR', name: 'Euro', val: 0.94 },
    { code: 'GBP', name: 'Pound', val: 0.81 },
    { code: 'JPY', name: 'Yen', val: 154.5 },
    { code: 'CAD', name: 'CAD', val: 1.37 },
    { code: 'AUD', name: 'AUD', val: 1.55 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-4 text-center">Reference: 1 USD Equals</p>
        <div className="flex flex-col gap-3">
          {rates.map(r => (
            <div key={r.code} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-10 text-xs font-black text-white">{r.code}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{r.name}</span>
              </div>
              <span className="text-sm font-black text-accent">{r.val.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
