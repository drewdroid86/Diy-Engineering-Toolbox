export default function Navigation({ setView }: { setView: (view: string) => void }) {
  const navItems = [
    { id: 'level', label: 'Level' },
    { id: 'ruler', label: 'Ruler' },
    { id: 'angle', label: 'Angle' },
    { id: 'light', label: 'Light' },
    { id: 'calc', label: 'Calc' },
    { id: 'converter', label: 'Conv' },
    { id: 'lux', label: 'Lux' },
    { id: 'db', label: 'dB' },
    { id: '3d-incl', label: '3D-Incl' },
    { id: 'metal', label: 'Metal' },
    { id: 'vibration', label: 'Vibes' },
    { id: 'new', label: 'New' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-slate-950/80 backdrop-blur-md border-t border-slate-800 text-slate-400 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
        {navItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => setView(item.id)}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
