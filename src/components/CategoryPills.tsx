import React from 'react';
import { Category } from '../types';
import { clsx } from 'clsx';

interface CategoryPillsProps {
  categories: Category[];
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex overflow-x-auto gap-2 px-4 py-2 hide-scrollbar whitespace-nowrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium transition-all border shrink-0',
            selected === cat
              ? 'bg-accent text-bg-dark border-accent'
              : 'bg-card-dark text-gray-400 border-gray-800 hover:border-gray-600'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
