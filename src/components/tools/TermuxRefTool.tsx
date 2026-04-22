import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';

export const TermuxRefTool = () => {
  const [search, setSearch] = useState('');
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const sections = [
    {
      title: 'Package Management',
      color: '#00e5ff',
      commands: [
        { cmd: 'pkg update && pkg upgrade', desc: 'Update repositories and packages' },
        { cmd: 'pkg install <name>', desc: 'Install a new package' },
        { cmd: 'pkg uninstall <name>', desc: 'Remove a package' },
        { cmd: 'pkg list-installed', desc: 'List all installed packages' },
        { cmd: 'pkg search <query>', desc: 'Search for available packages' },
      ]
    },
    {
      title: 'File System',
      color: '#00e676',
      commands: [
        { cmd: '~/ = /data/data/com.termux/files/home', desc: 'Default home directory' },
        { cmd: '/sdcard or ~/storage/shared', desc: 'Internal Android storage' },
        { cmd: 'termux-setup-storage', desc: 'Grant storage permissions' },
        { cmd: 'ls, cd, cp, mv, rm, mkdir, cat, nano', desc: 'Standard Unix file operations' },
      ]
    },
    {
      title: 'Development',
      color: '#d1c4e9',
      commands: [
        { cmd: 'pkg install nodejs-lts', desc: 'Install Node.js (LTS version)' },
        { cmd: 'pkg install python', desc: 'Install Python 3' },
        { cmd: 'pkg install git', desc: 'Install Git version control' },
        { cmd: 'npm install -g <package>', desc: 'Install global NPM package' },
        { cmd: 'pip install <package> --break-system-packages', desc: 'Install Python package' },
      ]
    },
    {
      title: 'Networking',
      color: '#ff9800',
      commands: [
        { cmd: 'pkg install curl wget nmap', desc: 'Install essential network tools' },
        { cmd: 'curl -X POST url -d \'data\'', desc: 'Perform HTTP POST request' },
        { cmd: 'wget https://example.com/file', desc: 'Download a file from URL' },
        { cmd: 'nmap -sV 192.168.1.1', desc: 'Scan for open ports and services' },
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
          placeholder="Search commands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl py-4 px-5 text-white outline-none focus:border-accent transition-all"
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
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: section.color }} />
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
                    {section.commands
                      .filter(c => c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
                      .map((c, cIdx) => (
                        <div key={cIdx} className="bg-black/20 rounded-2xl p-4 border border-white/5">
                          <div className="flex justify-between items-start mb-2">
                            <code className="text-accent text-xs font-mono break-all">{c.cmd}</code>
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
    </div>
  );
};
