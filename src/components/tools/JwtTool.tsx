import React, { useState, useMemo } from 'react';

export const JwtTool = () => {
  const [token, setToken] = useState('');

  const { header, payload, error } = useMemo(() => {
    if (!token) {
      return { header: '', payload: '', error: false };
    }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error();
      return {
        header: JSON.stringify(JSON.parse(atob(parts[0])), null, 2),
        payload: JSON.stringify(JSON.parse(atob(parts[1])), null, 2),
        error: false
      };
    } catch {
      return { header: '', payload: '', error: true };
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">JWT Token</label>
        <textarea value={token} onChange={e => setToken(e.target.value)} rows={4} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 text-[#ffffff] text-xs font-mono outline-none focus:border-[#00e5ff] transition-all resize-none" placeholder="Paste eyJhbG..." />
      </div>
      {error && <p className="text-[10px] text-red-400 px-1 font-mono">Invalid JWT format</p>}
      {!error && header && (
        <div className="grid gap-4">
          <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4">
            <p className="text-[9px] font-black text-pink-400 uppercase tracking-widest mb-2">Header</p>
            <pre className="text-[10px] font-mono text-white/80 overflow-x-auto">{header}</pre>
          </div>
          <div className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4">
            <p className="text-[9px] font-black text-accent uppercase tracking-widest mb-2">Payload</p>
            <pre className="text-[10px] font-mono text-white/80 overflow-x-auto">{payload}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
