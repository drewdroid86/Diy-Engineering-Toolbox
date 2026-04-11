export default function Navigation({ setView }: { setView: (view: string) => void }) {
  const navItems = [
    { id: 'level', label: 'Level' },
    { id: 'ruler', label: 'Ruler' },
    { id: 'angle', label: 'Angle' },
    { id: 'light', label: 'Light' },
    { id: 'calc', label: 'Calc' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-slate-800 border-t border-slate-700 text-slate-300 p-2 flex justify-around text-xs shadow-lg">
      {navItems.map((item) => (
        <button 
          key={item.id} 
          onClick={() => setView(item.id)}
          className="px-3 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200 uppercase font-semibold tracking-wider"
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
