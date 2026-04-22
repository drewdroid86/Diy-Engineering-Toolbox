import React, { useState, useEffect } from 'react';
import { usePersistence } from '../../hooks/usePersistence';
import { RefreshCw, Zap, Coins } from 'lucide-react';

interface ModelSpec {
  id: string;
  name: string;
  input: number;
  output: number;
}

export const PromptCostTool = () => {
  const [openRouterKey] = usePersistence('api_key_openrouter', '');
  const [inputTokens, setInputTokens] = useState('1000');
  const [outputTokens, setOutputTokens] = useState('500');
  const [modelId, setModelId] = useState('gpt-4o');
  const [models, setModels] = useState<ModelSpec[]>([
    { id: 'gpt-4o', name: 'GPT-4o', input: 5.0, output: 15.0 },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', input: 0.15, output: 0.6 },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
    { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', input: 3.5, output: 10.5 },
    { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B', input: 0.59, output: 0.79 },
  ]);
  const [loading, setLoading] = useState(false);

  const fetchOpenRouterModels = async () => {
    if (!openRouterKey) return;
    setLoading(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models');
      const data = await response.json();
      if (data.data) {
        const curated = data.data
          .filter((m: any) => [
            'openai/gpt-4o',
            'openai/gpt-4o-mini',
            'anthropic/claude-3.5-sonnet',
            'google/gemini-pro-1.5',
            'meta-llama/llama-3-70b-instruct'
          ].includes(m.id))
          .map((m: any) => ({
            id: m.id,
            name: m.name,
            input: Number(m.pricing.prompt) * 1000000,
            output: Number(m.pricing.completion) * 1000000
          }));
        
        if (curated.length > 0) {
          setModels(curated);
          if (!curated.find((m: any) => m.id === modelId)) {
            setModelId(curated[0].id);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch OpenRouter models', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenRouterModels();
  }, [openRouterKey]);

  const m = models.find(m => m.id === modelId) || models[0];
  const cost = ((Number(inputTokens) / 1000000) * m.input) + ((Number(outputTokens) / 1000000) * m.output);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <Coins className="w-5 h-5 text-accent opacity-50" />
          {openRouterKey && (
            <button 
              onClick={fetchOpenRouterModels}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-90 transition-all"
            >
              <RefreshCw className={`w-3 h-3 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1">Estimated Cost</p>
          <h2 className="text-4xl font-black text-[#00e5ff]">${cost.toFixed(cost < 0.01 ? 6 : 4)}</h2>
          <p className="text-[9px] font-bold text-white/40 mt-1 uppercase tracking-widest">
            {m.input.toFixed(2)} / {m.output.toFixed(2)} per 1M tokens
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="relative">
          <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">
            Model Selection {openRouterKey && <span className="text-accent ml-2 text-[8px] tracking-normal">(Live)</span>}
          </label>
          <div className="relative">
            <select 
              value={modelId} 
              onChange={e => setModelId(e.target.value)} 
              className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-sm focus:border-[#00e5ff] outline-none appearance-none"
            >
              {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Input Tokens</label>
            <input 
              type="number" 
              value={inputTokens} 
              onChange={e => setInputTokens(e.target.value)} 
              className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" 
            />
          </div>
          <div className="relative">
            <label className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-widest mb-1.5 block ml-1">Output Tokens</label>
            <input 
              type="number" 
              value={outputTokens} 
              onChange={e => setOutputTokens(e.target.value)} 
              className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-[#ffffff] text-lg font-medium focus:border-[#00e5ff] outline-none" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
