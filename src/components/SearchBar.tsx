import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="pt-4 pb-2 px-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tools..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-card-dark border-none rounded-2xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent outline-none transition-all"
        />
      </div>
    </div>
  );
};
