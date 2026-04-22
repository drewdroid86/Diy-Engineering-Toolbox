import React, { useState } from 'react';

export const PromptCostTool = () => {
  const [inputTokens, setInputTokens] = useState('1000');
  const [outputTokens, setOutputTokens] = useState('500');
  const [modelId, setModelId] = useState('gpt4o');

  const models = [
    { id: 'gpt4o', name: 'GPT-4o', input: 5.0, output: 15.0 },
    { id: 'gpt4o-mini', name: 'GPT-4o Mini', input: 0.15, output: 0.6 },
    { id: 'claude35', name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
    { id: 'gemini15pro', name: 'Gemini 1.5 Pro', input: 3.5, output: 10.5 },
  ];

  const m = models.find(m => m.id === modelId) || models[0];
  const cost = ((Number(inputTokens) / 1000000) * m.input) + ((Number(outputTokens) / 1000000) * m.output);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Estimated Cost</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${cost.toFixed(4)}</h2>
          <p className="text-xs font-bold text-white/60 mt-1">Per Request</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Model Selection</label>
          <select value={modelId} onChange={e => setModelId(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-sm focus:border-[#00e5ff] outline-none">
            {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Tokens</label>
            <input type="number" value={inputTokens} onChange={e => setInputTokens(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Output Tokens</label>
            <input type="number" value={outputTokens} onChange={e => setOutputTokens(e.target.value)} className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
