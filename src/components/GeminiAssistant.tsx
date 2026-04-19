
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { callGemini } from '../lib/gemini';

export const GeminiAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const reply = await callGemini(newMessages);
      setMessages([...newMessages, { role: 'model', content: reply }]);
    } catch (err: any) {
      setMessages([...newMessages, { role: 'model', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border flex flex-col h-[600px]">
      <h3 className="text-2xl font-bold mb-6">Gemini Engineering Assistant</h3>
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`p-4 rounded-lg ${m.role === 'user' ? 'bg-accent/20 border border-accent/30 ml-8' : 'bg-muted border border-border mr-8'}`}>
            <p className="font-bold mb-1 text-xs uppercase tracking-widest text-accent">{m.role === 'user' ? 'You' : 'Gemini'}</p>
            <p className="text-sm whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {loading && <p className="text-muted-foreground italic animate-pulse">Gemini is thinking...</p>}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Ask anything about formulas, materials, or engineering concepts.</p>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask an engineering question..." 
          className="flex-1 p-3 bg-input text-foreground rounded-lg focus:outline-none border border-border focus:border-accent" 
        />
        <button onClick={sendMessage} disabled={loading} className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold py-3 px-6 rounded-lg transition disabled:opacity-50">Send</button>
      </div>
    </div>
  );
};
