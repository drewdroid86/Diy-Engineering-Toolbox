import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check, Terminal, Info, Zap, Layout, Monitor } from 'lucide-react';

export const TermuxRefTool = () => {
  const [search, setSearch] = useState('');
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const sections = [
    {
      title: 'Current State & Fixes',
      color: '#ff1744',
      icon: <Zap className="w-4 h-4" />,
      commands: [
        { cmd: 'settings put global phantom_process_killer_enable false', desc: 'Fix "Process Completed" error on Android 12+. Run via ADB from PC.' },
        { cmd: 'termux-setup-storage', desc: 'Essential: Grant access to internal Android storage' },
        { cmd: 'pkg install termux-api', desc: 'Enable communication with Android hardware (flashlight, battery, etc)' },
      ],
      info: 'Termux on Android 10+ faces strict process limits. Use the F-Droid version, as the Play Store version is deprecated.'
    },
    {
      title: 'Package Management',
      color: '#00e5ff',
      icon: <Terminal className="w-4 h-4" />,
      commands: [
        { cmd: 'pkg update && pkg upgrade', desc: 'Update repositories and installed packages' },
        { cmd: 'pkg install <name>', desc: 'Install a new package' },
        { cmd: 'pkg uninstall <name>', desc: 'Remove a package' },
        { cmd: 'pkg list-installed', desc: 'List all installed packages' },
        { cmd: 'pkg search <query>', desc: 'Search for available packages' },
        { cmd: 'termux-change-repo', desc: 'Switch mirrors if downloads are slow' },
      ]
    },
    {
      title: 'Linux Distros (PRoot)',
      color: '#d1c4e9',
      icon: <Layout className="w-4 h-4" />,
      commands: [
        { cmd: 'pkg install proot-distro', desc: 'Install the PRoot manager' },
        { cmd: 'proot-distro install ubuntu', desc: 'Install Ubuntu (Latest LTS)' },
        { cmd: 'proot-distro login ubuntu', desc: 'Log into the Ubuntu environment' },
        { cmd: 'proot-distro list', desc: 'List available distributions (Kali, Debian, etc)' },
      ],
      info: 'PRoot allows running Linux distributions without root access. Performance is near-native for CLI tasks.'
    },
    {
      title: 'GUI & Desktop (X11)',
      color: '#ff9800',
      icon: <Monitor className="w-4 h-4" />,
      commands: [
        { cmd: 'pkg install x11-repo', desc: 'Enable the X11 package repository' },
        { cmd: 'pkg install tur-repo', desc: 'Enable Termux User Repository (Extra tools)' },
        { cmd: 'pkg install xfce4', desc: 'Install the XFCE Desktop Environment' },
        { cmd: 'vncserver :1', desc: 'Start a VNC server on display :1' },
      ],
      info: 'To see the GUI, use a VNC Viewer app on Android and connect to localhost:5901'
    },
    {
      title: 'Common Dev Tools',
      color: '#00e676',
      icon: <Info className="w-4 h-4" />,
      commands: [
        { cmd: 'pkg install nodejs-lts', desc: 'Install Node.js (LTS)' },
        { cmd: 'pkg install python', desc: 'Install Python 3' },
        { cmd: 'pkg install git', desc: 'Install Git' },
        { cmd: 'pkg install build-essential', desc: 'Install GCC, Make, and C tools' },
        { cmd: 'pip install <package> --break-system-packages', desc: 'Install Python package (Required for newer Python versions)' },
      ]
    }
  ];

  const handleCopy = (cmd: string, index: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search commands (e.g. ubuntu, fix, python)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent transition-all placeholder:text-gray-600"
        />
      </div>

      <div className="flex flex-col gap-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-3xl overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === sIdx ? null : sIdx)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center" style={{ color: section.color }}>
                  {section.icon}
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">{section.title}</h3>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openSection === sIdx ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {openSection === sIdx && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 space-y-4">
                    {(section as any).info && (
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] text-gray-400 font-medium italic leading-relaxed">{ (section as any).info }</p>
                      </div>
                    )}
                    {section.commands
                      .filter(c => c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
                      .map((c, cIdx) => (
                        <div key={cIdx} className="bg-black/20 rounded-2xl p-4 border border-white/5 group">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-accent text-xs font-mono break-all pr-4">{c.cmd}</code>
                            <button
                              onClick={() => handleCopy(c.cmd, `${sIdx}-${cIdx}`)}
                              className="text-gray-500 hover:text-white transition-colors p-1"
                            >
                              {copiedIndex === `${sIdx}-${cIdx}` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                          <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{c.desc}</p>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-4 p-6 bg-accent/5 rounded-[40px] border border-accent/10">
        <h4 className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-3">Termux History</h4>
        <p className="text-xs text-gray-500 leading-relaxed italic">
          Founded by Fornwall in 2015, Termux revolutionized Android by providing a full Linux environment without root. 
          While recent Android versions (12+) have introduced "Phantom Process" limits, the community continues to 
          maintain specialized repositories (TUR) and PRoot distros to keep professional dev tools alive on mobile.
        </p>
      </div>
    </div>
  );
};
