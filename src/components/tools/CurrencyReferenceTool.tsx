import React, { useState, useEffect } from 'react';
import { usePersistence } from '../../hooks/usePersistence';
import { RefreshCw, Globe, AlertCircle } from 'lucide-react';

export const CurrencyReferenceTool = () => {
  const [exchangeRateKey] = usePersistence('api_key_exchangerate', '');
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultRates = [
    { code: 'EUR', name: 'Euro', val: 0.94 },
    { code: 'GBP', name: 'Pound', val: 0.81 },
    { code: 'JPY', name: 'Yen', val: 154.5 },
    { code: 'CAD', name: 'CAD', val: 1.37 },
    { code: 'AUD', name: 'AUD', val: 1.55 },
  ];

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = 'https://api.frankfurter.app/latest?from=USD';
      if (exchangeRateKey) {
        url = `https://v6.exchangerate-api.com/v6/${exchangeRateKey}/latest/USD`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (exchangeRateKey) {
        if (data.result === 'success') {
          const formatted = Object.entries(data.conversion_rates)
            .filter(([code]) => ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL'].includes(code))
            .map(([code, val]) => ({ code, name: code, val }));
          setRates(formatted);
        } else {
          throw new Error(data['error-type'] || 'Failed to fetch rates');
        }
      } else {
        const formatted = Object.entries(data.rates).map(([code, val]) => ({
          code,
          name: code,
          val
        }));
        setRates(formatted.filter(r => ['EUR', 'GBP', 'JPY', 'CAD', 'AUD'].includes(r.code)));
      }
    } catch (err: any) {
      setError(err.message);
      setRates(defaultRates);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [exchangeRateKey]);

  const displayRates = rates.length > 0 ? rates : defaultRates;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent" />
            <p className="text-[10px] font-black text-accent uppercase tracking-widest">1 USD Equals</p>
          </div>
          <button 
            onClick={fetchRates}
            disabled={loading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-90 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-red-500" />
            <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {displayRates.map(r => (
            <div key={r.code} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-10 text-xs font-black text-white">{r.code}</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{r.name}</span>
              </div>
              <span className="text-sm font-black text-accent">{Number(r.val).toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
            </div>
          ))}
        </div>

        <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-6 text-center">
          {exchangeRateKey ? 'Live Data: ExchangeRate-API' : 'Live Data: Frankfurter (Fallback: Static)'}
        </p>
      </div>
    </div>
  );
};
