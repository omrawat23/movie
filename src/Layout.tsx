import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { House, Film, Tv, Bookmark, Menu, X, User, Bell } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { Movie } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const handleSearchResults = (movies: Movie[]) => {
    setSearchResults(movies);
  };

  const handleCardClick = (movieId: number) => {
    window.location.href = `/videopage/${movieId}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const NavigationLinks = () => (
    <>
      <Link to="/" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
        <House className="w-5 h-5" />
        <span className="font-medium">Home</span>
      </Link>
      <Link to="/movies" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
        <Bookmark className="w-5 h-5" />
        <span className="font-medium">Movies</span>
      </Link>
      <Link to="/tv-series" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
        <Film className="w-5 h-5" />
        <span className="font-medium">TV Series</span>
      </Link>
      <Link to="/coming-soon" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
        <Tv className="w-5 h-5" />
        <span className="font-medium">Coming Soon</span>
      </Link>
      <Link to="/friends" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
        <User className="w-5 h-5" />
        <span className="font-medium">Friends</span>
      </Link>
    </>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#13141A] to-[#1a1c25] text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 p-6">
      <h2 className="sparkly-text mb-10">Jess TV</h2>


        <div className="flex flex-col space-y-2">
          <NavigationLinks />
        </div>
        <div className="mt-auto pt-6 space-y-2 border-t border-gray-700/50">
          <Link to="/settings" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
            <span className="font-medium">Settings</span>
          </Link>
          <Link to="/logout" className="flex items-center space-x-3 p-4 text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200">
            <span className="font-medium">Log out</span>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#1C1E26]/90 backdrop-blur-lg border-b border-gray-800/50">
        <div className="flex items-center gap-3 p-4">
          <button 
            onClick={toggleMenu} 
            className="p-2 hover:bg-blue-500/10 rounded-xl transition-colors active:scale-95" 
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex-grow">
            <SearchBar onSearchResults={handleSearchResults} />
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-500/10 hover:text-blue-400 transition-colors"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="w-8 h-8 ring-2 ring-blue-500/20">
              <AvatarImage src="/jesss.png" alt="Jess" />
              <AvatarFallback className="bg-blue-500/10 text-blue-400">JT</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 z-40 h-full w-72 bg-[#1C1E26]/95 backdrop-blur-xl transform transition-all duration-300 ease-out border-r border-gray-800/50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-800/50">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Jess TV
            </h2>
            <button 
              onClick={toggleMenu} 
              className="p-2 hover:bg-blue-500/10 rounded-xl transition-colors active:scale-95" 
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <ScrollArea className="flex-1">
            <nav className="flex flex-col px-4 py-6 space-y-2" onClick={toggleMenu}>
              <NavigationLinks />
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-gray-800/50">
            <div className="flex items-center space-x-3 p-4 bg-blue-500/10 rounded-xl">
              <Avatar className="ring-2 ring-blue-500/20">
                <AvatarImage src="/jesss.png" alt="Jess" />
                <AvatarFallback className="bg-blue-500/10 text-blue-400">JT</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">Jess</p>
                <p className="text-sm text-gray-400">Premium User</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between backdrop-blur-lg p-4 md:p-0 md:m-4">
          <SearchBar onSearchResults={handleSearchResults} />
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center space-x-3">
              <span className="text-gray-300">Jess</span>
              <Avatar className="ring-2 ring-blue-500/20 transition-all hover:ring-blue-500/40">
                <AvatarImage src="/jesss.png" alt="Jess" />
                <AvatarFallback className="bg-blue-500/10 text-blue-400">JT</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Search Results */}
        {searchResults.length > 0 && (
        <div 
          ref={searchResultsRef} 
          className="absolute top-[72px] md:top-[58px] left-4 right-4 md:left-auto md:right-auto z-50 bg-[#1C1E26]/95 backdrop-blur-xl border border-gray-800/50 rounded-xl shadow-lg shadow-black/20"
        >
          <ScrollArea className="h-[calc(100vh-8rem)] w-full max-w-[400px] md:max-w-[300px]">
            <div className="p-2 space-y-1">
              {searchResults.map((movie) => (
                <button
                  key={movie.id}
                  className="w-full flex items-center gap-4 p-3 hover:bg-blue-500/10 transition-colors rounded-xl group"
                  onClick={() => handleCardClick(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-12 h-[72px] object-cover rounded-lg shadow-md"
                  />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {movie.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

        {/* Main Content */}
        <main className="flex-1 md:p-2 overflow-y-auto scrollbar-hide mt-20 md:mt-[-16px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;