import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersistence } from '../../hooks/usePersistence';
import { 
  Plus, Trash2, FileText, User, 
  Download, Save, ArrowLeft, 
  ChevronRight, Calculator, CheckCircle2 
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  clientId: string;
  items: InvoiceItem[];
  taxRate: number;
  status: 'draft' | 'sent' | 'paid';
}

export const InvoiceEstimatorTool = () => {
  const [invoices, setInvoices] = usePersistence<Invoice[]>('saved_invoices', []);
  const [clients, setClients] = usePersistence<Client[]>('saved_clients', []);
  const [view, setView] = useState<'list' | 'create' | 'view'>('list');
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  // New Invoice State
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    number: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    items: [{ id: '1', description: 'Consultation', qty: 1, rate: 75 }],
    taxRate: 15,
    status: 'draft'
  });

  const calculateSubtotal = (items: InvoiceItem[]) => items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const calculateTotal = (invoice: Partial<Invoice>) => {
    const sub = calculateSubtotal(invoice.items || []);
    return sub * (1 + ((invoice.taxRate || 0) / 100));
  };

  const handleSaveInvoice = () => {
    if (!newInvoice.clientId) {
      alert('Please select a client');
      return;
    }
    const finalInvoice = { ...newInvoice, id: Date.now().toString() } as Invoice;
    setInvoices([finalInvoice, ...invoices]);
    setView('list');
  };

  const deleteInvoice = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this invoice?')) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-[500px]">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Recent Invoices</h3>
              <button 
                onClick={() => setView('create')}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-bg-dark rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/20"
              >
                <Plus className="w-4 h-4" /> New Invoice
              </button>
            </div>

            <div className="space-y-3">
              {invoices.length === 0 ? (
                <div className="bg-[#1a1a2e] rounded-3xl p-10 border border-dashed border-gray-800 flex flex-col items-center text-center gap-4">
                  <FileText className="w-10 h-10 text-gray-700" />
                  <p className="text-xs text-gray-500 font-medium">No saved invoices yet.<br/>Create your first estimate to get started.</p>
                </div>
              ) : (
                invoices.map(inv => (
                  <button 
                    key={inv.id}
                    onClick={() => { setActiveInvoice(inv); setView('view'); }}
                    className="w-full bg-[#1a1a2e] border border-gray-800/50 rounded-2xl p-4 flex items-center justify-between hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-white">{inv.number}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{clients.find(c => c.id === inv.clientId)?.name || 'Unknown Client'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-black text-accent">${calculateTotal(inv).toLocaleString()}</p>
                        <p className="text-[9px] text-gray-500 font-bold">{inv.date}</p>
                      </div>
                      <button 
                        onClick={(e) => deleteInvoice(inv.id, e)}
                        className="p-2 opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}

        {view === 'create' && (
          <motion.div 
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button onClick={() => setView('list')} className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">New Invoice Details</h3>
            </div>

            {/* Client Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Client</label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <select 
                  value={newInvoice.clientId || ''} 
                  onChange={(e) => setNewInvoice({ ...newInvoice, clientId: e.target.value })}
                  className="w-full bg-[#1a1a2e] border border-gray-800 rounded-2xl py-4 px-5 text-white text-sm outline-none focus:border-accent"
                >
                  <option value="">Select a client...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button 
                  onClick={() => {
                    const name = prompt('Client Name:');
                    if (name) {
                      const id = Date.now().toString();
                      setClients([...clients, { id, name, email: '', address: '' }]);
                      setNewInvoice({ ...newInvoice, clientId: id });
                    }
                  }}
                  className="p-4 bg-accent/10 border border-accent/20 rounded-2xl text-accent hover:bg-accent/20 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Items</label>
                <button 
                  onClick={() => setNewInvoice({ 
                    ...newInvoice, 
                    items: [...(newInvoice.items || []), { id: Date.now().toString(), description: '', qty: 1, rate: 0 }] 
                  })}
                  className="text-[9px] font-bold text-accent uppercase tracking-widest flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              
              <div className="space-y-3">
                {newInvoice.items?.map((item, idx) => (
                  <div key={item.id} className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-4 space-y-4">
                    <input 
                      placeholder="Description" 
                      value={item.description}
                      onChange={(e) => {
                        const items = [...(newInvoice.items || [])];
                        items[idx].description = e.target.value;
                        setNewInvoice({ ...newInvoice, items });
                      }}
                      className="w-full bg-transparent border-b border-gray-800 py-2 text-white text-sm outline-none focus:border-accent transition-all"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-[8px] font-bold text-gray-500 uppercase">Qty</label>
                        <input 
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            const items = [...(newInvoice.items || [])];
                            items[idx].qty = Number(e.target.value);
                            setNewInvoice({ ...newInvoice, items });
                          }}
                          className="w-full bg-transparent text-white font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-gray-500 uppercase">Rate</label>
                        <input 
                          type="number"
                          value={item.rate}
                          onChange={(e) => {
                            const items = [...(newInvoice.items || [])];
                            items[idx].rate = Number(e.target.value);
                            setNewInvoice({ ...newInvoice, items });
                          }}
                          className="w-full bg-transparent text-white font-bold outline-none"
                        />
                      </div>
                      <div className="flex justify-end items-end">
                        <button 
                          onClick={() => {
                            const items = newInvoice.items?.filter((_, i) => i !== idx);
                            setNewInvoice({ ...newInvoice, items });
                          }}
                          className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/10 rounded-3xl p-6 border border-accent/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Estimate</span>
                <span className="text-2xl font-black text-accent">${calculateTotal(newInvoice).toLocaleString()}</span>
              </div>
              <button 
                onClick={handleSaveInvoice}
                className="w-full bg-accent text-bg-dark py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-accent/20 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Invoice
              </button>
            </div>
          </motion.div>
        )}

        {view === 'view' && activeInvoice && (
          <motion.div 
            key="view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
             <div className="flex items-center justify-between">
              <button onClick={() => setView('list')} className="p-2 bg-white/5 rounded-xl text-gray-400">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={exportPDF}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 bg-accent text-bg-dark rounded-2xl">
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white text-black rounded-3xl p-8 space-y-8 shadow-2xl print:m-0 print:shadow-none print:rounded-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-lg rounded-xl">DIY</div>
              </div>
              
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter">Invoice</h2>
                <p className="text-gray-500 font-bold">{activeInvoice.number}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{activeInvoice.date}</p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Bill To</p>
                  <p className="font-black text-sm">{clients.find(c => c.id === activeInvoice.clientId)?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Client Contact Details</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">From</p>
                  <p className="font-black text-sm">Engineering Toolbox</p>
                  <p className="text-xs text-gray-500 mt-1">Self-Employed / Contractor</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b-2 border-black/5 pb-2 flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>Description</span>
                  <div className="flex gap-8">
                    <span>Qty</span>
                    <span className="w-16 text-right">Rate</span>
                  </div>
                </div>
                {activeInvoice.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="font-bold">{item.description}</span>
                    <div className="flex gap-8 items-center">
                      <span className="text-gray-400">{item.qty}</span>
                      <span className="w-16 text-right font-black">${item.rate}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t-2 border-black/5 flex flex-col items-end gap-2">
                <div className="flex justify-between w-48 text-[10px] font-bold text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black">${calculateSubtotal(activeInvoice.items).toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-48 text-[10px] font-bold text-gray-400">
                  <span>Tax ({activeInvoice.taxRate}%)</span>
                  <span className="text-black">${(calculateSubtotal(activeInvoice.items) * (activeInvoice.taxRate / 100)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-48 pt-2 mt-2 border-t border-black/10 text-lg font-black">
                  <span>Total</span>
                  <span className="text-accent-dark text-blue-600">${calculateTotal(activeInvoice).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest text-center">Invoices are saved locally on this device</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
