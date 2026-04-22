import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export const FlashlightTool = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (on) {
      document.body.style.backgroundColor = '#ffffff';
    } else {
      document.body.style.backgroundColor = '';
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [on]);

  return (
    <div className={`flex flex-col items-center justify-center py-20 transition-all duration-500 ${on ? 'bg-white rounded-3xl' : ''}`}>
      <button 
        onClick={() => setOn(!on)}
        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${on ? 'bg-gray-100 shadow-2xl scale-110' : 'bg-[#1a1a2e] border border-[#2a2a3a]'}`}
      >
        <RefreshCcw className={`w-12 h-12 ${on ? 'text-bg-dark rotate-180' : 'text-accent'} transition-transform duration-500`} />
      </button>
      <p className={`mt-8 text-xs font-black uppercase tracking-[0.3em] ${on ? 'text-bg-dark' : 'text-gray-500'}`}>
        {on ? 'System Max Output' : 'Flashlight Off'}
      </p>
    </div>
  );
};
