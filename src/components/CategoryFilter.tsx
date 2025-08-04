import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8 p-1 bg-gray-100 rounded-xl border border-gray-300">
      <button
        onClick={() => onCategoryChange('Toutes')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedCategory === 'Toutes'
            ? 'bg-gradient-to-r from-primary-950 to-primary-900 text-white shadow-lg border-2 border-accent-500'
            : 'bg-white text-gray-700 hover:bg-accent-50 hover:text-accent-800 border border-gray-300 hover:border-accent-400'
        }`}
      >
        Toutes
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg border-2 border-accent-400'
              : 'bg-white text-gray-700 hover:bg-accent-50 hover:text-accent-800 border border-gray-300 hover:border-accent-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;