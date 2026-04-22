import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export const JsonFormatterTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setOutput('');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {output && !error && (
        <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Formatted Output</p>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-accent hover:text-white transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <pre className="text-xs text-white overflow-x-auto p-4 bg-black/40 rounded-xl font-mono leading-relaxed max-h-[300px]">
            {output}
          </pre>
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 rounded-3xl p-6 border border-red-500/20">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Syntax Error</p>
          <p className="text-xs text-red-200 font-mono">{error}</p>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Raw JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-sm font-mono outline-none focus:border-[#00e5ff] focus:ring-0 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] transition-all resize-none" placeholder='{"key": "value"}' />
        </div>
        <button onClick={format} className="py-4 bg-accent text-bg-dark rounded-2xl font-black uppercase tracking-widest hover:shadow-lg hover:shadow-accent/20 active:scale-95 transition-all">Format JSON</button>
      </div>
    </div>
  );
};
