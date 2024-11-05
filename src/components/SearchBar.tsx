import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { Movie, SearchResponse } from '../../types';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearchResults: (movies: Movie[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      onSearchResults([]);
      return;
    }

    try {
      const response = await axios.get<SearchResponse>(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
          },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDg2MjI4NzlhZmUxOGY5OTc2NDJmOWYzNzc3N2FjMiIsIm5iZiI6MTczMDY3MjA3MS4zNjUwMzcsInN1YiI6IjY3MjdmNDA0NTU1ZTNlZmM4OWMzMmY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ST0b4zGR7UynUdSV5ANEKDjpzrxh9nitsPrz8cqx6w'
        }
        }
      );
      onSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      onSearchResults([]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => searchMovies(query), 500),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    debouncedSearch(newSearchTerm);
  };

  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full pl-10 border-none text-black placeholder-gray-500 h-12 rounded-xl"
      />
    </div>
    
  );
};

export default SearchBar;