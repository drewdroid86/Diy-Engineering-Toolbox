import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export const CurlBuilderTool = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/data');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [data, setData] = useState('');

  const curl = `curl -X ${method} "${url}" ${headers ? `-H "${headers}"` : ''} ${data ? `-d '${data}'` : ''}`.trim().replace(/\s+/g, ' ');

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Generated cURL</span>
          <button onClick={() => navigator.clipboard.writeText(curl)} className="text-gray-500 hover:text-white transition-colors"><Copy className="w-3 h-3" /></button>
        </div>
        <pre className="bg-black/30 p-4 rounded-2xl font-mono text-[10px] text-white/90 break-all leading-tight border border-white/5 whitespace-pre-wrap">
          {curl}
        </pre>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none">
              {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none" placeholder="https://api.com" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Header</label>
          <input value={headers} onChange={e => setHeaders(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none" placeholder="Key: Value" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-bold text-[#aaaacc] uppercase tracking-widest ml-1">Data (for POST/PUT)</label>
          <textarea value={data} onChange={e => setData(e.target.value)} rows={3} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-xl py-3 px-3 text-white text-sm focus:border-[#00e5ff] outline-none font-mono" placeholder='{"id": 1}' />
        </div>
      </div>
    </div>
  );
};
