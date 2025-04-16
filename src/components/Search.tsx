
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps {
  onSearch: (query: string) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={cn('relative', className)}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={handleChange}
        className="search-input pl-9 rounded-full bg-white/70 backdrop-blur-sm focus-visible:ring-ghibli-green-light"
      />
    </div>
  );
};

export default Search;
