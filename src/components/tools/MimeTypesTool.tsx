import React from 'react';

export const MimeTypesTool = () => {
  const mimeTypes = [
    { ext: '.json', type: 'application/json' },
    { ext: '.js', type: 'application/javascript' },
    { ext: '.html', type: 'text/html' },
    { ext: '.css', type: 'text/css' },
    { ext: '.png', type: 'image/png' },
    { ext: '.jpg', type: 'image/jpeg' },
    { ext: '.svg', type: 'image/svg+xml' },
    { ext: '.pdf', type: 'application/pdf' },
    { ext: '.zip', type: 'application/zip' },
    { ext: '.txt', type: 'text/plain' },
  ];

  return (
    <div className="bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] overflow-hidden">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#1a1a2e] border-b border-[#2a2a3a]">
          <tr>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">Extension</th>
            <th className="p-4 text-[9px] font-black text-[#aaaacc] uppercase tracking-widest">MIME Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2a2a3a]/50">
          {mimeTypes.map(m => (
            <tr key={m.ext} className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold text-white">{m.ext}</td>
              <td className="p-4 text-accent font-mono">{m.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
