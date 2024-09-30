import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Farm } from '../../types/Farm';
import { Star } from 'lucide-react';

interface SearchComponentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: (string | Farm)[];
  handleFarmClick: (farm: Farm) => void;
}

export default function SearchComponent({
  searchQuery,
  setSearchQuery,
  suggestions = [],  // Default value as an empty array
  handleFarmClick,
}: SearchComponentProps) {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setActiveSuggestionIndex(-1); // Reset active suggestion index on change
  };

  const handleSuggestionClick = (suggestion: string | Farm) => {
    if (typeof suggestion === 'string') {
      setSearchQuery(suggestion);
    } else {
      // If it's a farm, trigger the farm click handler
      handleFarmClick(suggestion);
    }
    setActiveSuggestionIndex(-1); // Reset after selection
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalItems = suggestions.length;

    if (totalItems > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < totalItems - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        }
      }
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products, farms, or keywords..."
        className="shadow-md rounded-full p-2 pl-4 w-full text-lg h-12 bg-white border-2 border-[#333333]"
      />
      {suggestions.length > 0 && (
        <ul className="bg-white border rounded-2xl mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 flex flex-col justify-between cursor-pointer ${
                activeSuggestionIndex === index
                  ? 'bg-blue-100 text-blue-600'
                  : ''
              }`}
              onClick={() => handleSuggestionClick(item)}
            >
              {/* Render either farm or suggestion */}
              {typeof item === 'string' ? (
                <div className="font-semibold">{item}</div>
              ) : (
                <div>
                  <div className="font-semibold text-green-600">
                    {item.name} ({item.miles} mi)
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.city}, {item.state}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.products.join(', ')}
                  </div>
                  {item.preferred && (
                    <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
