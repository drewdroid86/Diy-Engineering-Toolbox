import React, { useState } from 'react';
import { TOOLS } from '../data';
import { Category, Tool } from '../types';
import { SearchBar } from '../components/SearchBar';
import { CategoryPills } from '../components/CategoryPills';
import { ToolCard } from '../components/ToolCard';
import { usePersistence } from '../hooks/usePersistence';
import { LayoutGrid, List } from 'lucide-react';

const CATEGORIES: Category[] = ['All', 'Electrical', 'Mechanical', 'Civil', 'Woodworking', 'Dev', 'AI/ML', 'Financial', 'General'];

const CATEGORY_COLORS: Record<string, string> = {
  'Electrical': 'var(--color-electrical)',
  'Mechanical': 'var(--color-mechanical)',
  'Civil': 'var(--color-civil)',
  'Woodworking': 'var(--color-woodworking)',
  'Dev': 'var(--color-dev)',
  'AI/ML': 'var(--color-ai-ml)',
  'Financial': 'var(--color-financial)',
  'General': 'var(--color-general)',
  'All': 'var(--color-accent)'
};

interface HomeProps {
  onOpenTool: (tool: Tool) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenTool }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [viewMode, setViewMode] = usePersistence<'grid' | 'list'>('home_view_mode', 'grid');
  const [pinnedIds, setPinnedIds] = usePersistence<string[]>('pinned_tools', []);
  const [recentIds, setRecentIds] = usePersistence<string[]>('recent_tools', []);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedIds(prev => prev.includes(id) 
      ? prev.filter(p => p !== id) 
      : [...prev, id]);
  };

  const handleOpenTool = (tool: Tool) => {
    setRecentIds(prev => {
      const filtered = prev.filter(id => id !== tool.id);
      return [tool.id, ...filtered].slice(0, 4);
    });
    onOpenTool(tool);
  };

  const filteredTools = TOOLS.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const pinnedTools = TOOLS.filter(t => pinnedIds.includes(t.id));
  const recentTools = recentIds
    .map(id => TOOLS.find(t => t.id === id))
    .filter((t): t is Tool => !!t && !pinnedIds.includes(t.id));

  const displayPinnedRecent = [...pinnedTools, ...recentTools];

  const categoriesToDisplay = (category === 'All' 
    ? CATEGORIES.filter(c => c !== 'All') 
    : [category]).filter(cat => filteredTools.some(t => t.category === cat));

  return (
    <div className="min-h-screen bg-[#0f0f14]">
      {/* Header */}
      <div className={`sticky top-0 z-30 bg-[#0f0f14] transition-all duration-300 ${isScrolled ? 'border-b border-gray-800/50' : ''}`}>
        <div className="flex items-center gap-2 pr-4">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-3 rounded-2xl bg-[#1a1a2e] border border-gray-800/50 text-gray-400 hover:text-accent transition-colors active:scale-90"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
          </button>
        </div>
        {viewMode === 'grid' && (
          <CategoryPills categories={CATEGORIES} selected={category} onSelect={setCategory} />
        )}
      </div>

      <div className="flex">
        {/* List Mode Sidebar */}
        {viewMode === 'list' && (
          <div className="w-[90px] fixed left-0 bottom-24 top-[72px] bg-[#0f0f14] border-r border-gray-800/30 overflow-y-auto hide-scrollbar z-20 flex flex-col gap-2 p-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${category === cat ? 'scale-105 shadow-lg' : 'opacity-40 grayscale hover:opacity-100'}`}
                style={{ 
                  backgroundColor: category === cat ? CATEGORY_COLORS[cat] : '#1a1a2e',
                  color: category === cat ? '#000' : '#fff'
                }}
              >
                <span className="text-[10px] font-black uppercase tracking-tighter leading-none">{cat === 'AI/ML' ? 'AI' : cat.slice(0, 4)}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        <div className={`flex-1 ${viewMode === 'list' ? 'ml-[90px]' : ''} pb-24`}>
          <div className="px-4 mt-6">
            {/* List Mode Specific: Pinned/Recent Row */}
            {viewMode === 'list' && displayPinnedRecent.length > 0 && !search && (
              <div className="mb-8">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">Quick Access</p>
                <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                  {displayPinnedRecent.map(tool => (
                    <ToolCard 
                      key={`access-${tool.id}`}
                      tool={tool}
                      isPinned={pinnedIds.includes(tool.id)}
                      onTogglePin={(e) => togglePin(tool.id, e)}
                      onClick={() => handleOpenTool(tool)}
                      variant="preview"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grid Layout Logic */}
            {viewMode === 'grid' ? (
              <>
                {category === 'All' && !search && (
                  <>
                    {pinnedTools.length > 0 && (
                      <div className="mb-10">
                        <div className="flex items-center justify-between mb-4 border-b border-accent/20 pb-2">
                          <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.2em] flex items-center gap-2">Pinned Favorites</h2>
                        </div>
                        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                          {pinnedTools.map(tool => (
                            <ToolCard key={`p-${tool.id}`} tool={tool} isPinned={true} onTogglePin={(e) => togglePin(tool.id, e)} onClick={() => handleOpenTool(tool)} />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {search ? (
                  <div className="mb-10">
                    <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-800/50 pb-2">Search Results</h2>
                    <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                      {filteredTools.map(tool => (
                        <ToolCard key={tool.id} tool={tool} isPinned={pinnedIds.includes(tool.id)} onTogglePin={(e) => togglePin(tool.id, e)} onClick={() => handleOpenTool(tool)} />
                      ))}
                    </div>
                  </div>
                ) : (
                  categoriesToDisplay.map(cat => (
                    <div key={cat} className="mb-10">
                      <div className="flex items-center gap-3 mb-5">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: CATEGORY_COLORS[cat] }}>{cat}</h2>
                        <div className="h-px w-full bg-gray-800/50" />
                      </div>
                      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                        {filteredTools.filter(t => t.category === cat).map(tool => (
                          <ToolCard key={tool.id} tool={tool} isPinned={pinnedIds.includes(tool.id)} onTogglePin={(e) => togglePin(tool.id, e)} onClick={() => handleOpenTool(tool)} />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : (
              /* List Mode Tool Grid (Single Category) */
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap" style={{ color: CATEGORY_COLORS[category] }}>{category}</h2>
                  <div className="h-px w-full bg-gray-800/50" />
                </div>
                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                  {filteredTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} isPinned={pinnedIds.includes(tool.id)} onTogglePin={(e) => togglePin(tool.id, e)} onClick={() => handleOpenTool(tool)} />
                  ))}
                </div>
              </div>
            )}

            {filteredTools.length === 0 && (
              <div className="text-center py-20 text-gray-600">
                <p>No tools found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
