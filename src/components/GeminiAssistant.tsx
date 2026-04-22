import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { motion, AnimatePresence } from 'framer-motion';

export const GeminiAssistant = () => {
  const [input, setInput] = useState('');
  const { messages, loading, error, sendMessage } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a2e] rounded-3xl border border-[#2a2a3a] overflow-hidden">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth min-h-[300px] max-h-[500px]"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-white font-black text-lg mb-2">Engineering Assistant</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-[200px]">
                Ask about formulas, material properties, or complex engineering concepts.
              </p>
            </motion.div>
          ) : (
            messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-accent text-bg-dark font-medium rounded-tr-none' 
                      : 'bg-[#2a2a3a] text-white rounded-tl-none border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-60">
                    {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-accent" />}
                    <span className="text-[10px] font-black uppercase tracking-tighter">
                      {m.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[#2a2a3a] text-accent p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Thinking...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Connection Error</p>
              <p className="text-xs text-red-200/70 leading-snug">{error}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/5">
        <div className="relative flex items-center gap-2 bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl px-4 py-2 focus-within:border-accent transition-all">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How do I calculate..." 
            className="flex-1 bg-transparent py-2 text-white text-sm outline-none placeholder:text-gray-600"
            disabled={loading}
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()}
            className={`p-2 rounded-xl transition-all ${
              loading || !input.trim() 
                ? 'text-gray-600' 
                : 'text-accent hover:bg-accent/10 active:scale-90'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
