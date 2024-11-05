import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { House, Film, Tv, Bookmark, Menu, X, User } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { Movie } from '../types';
import Cookies from 'js-cookie';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchResults = (movies: Movie[]) => {
    setSearchResults(movies);
  };

  const handleCardClick = (movieId: number) => {
    Cookies.set('user_accepted_cookies', 'true', { sameSite: 'Strict' });
    window.location.href = `/videopage/${movieId}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavigationLinks = () => (
    <>
      <Link to="/" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
        <House className="mr-2" />
        <span>Home</span>
      </Link>
      <Link to="/movies" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
        <Bookmark className="mr-2" />
        <span>Movies</span>
      </Link>
      <Link to="/tv-series" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
        <Film className="mr-2" />
        <span>Tv-series</span>
      </Link>
      <Link to="/coming-soon" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
        <Tv className="mr-2" />
        <span>Coming Soon</span>
      </Link>
      <Link to="/friends" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
        <User className="mr-2" />
        <span>Friends</span>
      </Link>
    </>
  );

  return (
    <div className="flex h-screen bg-[#13141A] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-[#1C1E26] border-r border-gray-800 p-4">
        <h2 className="text-2xl font-bold text-white mb-8">Geek</h2>
        <div className="flex flex-col space-y-4">
          <NavigationLinks />
        </div>
        <div className="mt-auto pt-4 space-y-2 border-t border-gray-700">
          <Link to="/settings" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <span>Settings</span>
          </Link>
          <Link to="/logout" className="flex items-center space-x-2 p-2 text-gray-300 hover:bg-gray-700 rounded-lg">
            <span>Log out</span>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#1C1E26] border-b border-gray-800 flex items-center p-4">
        <button onClick={toggleMenu} className="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="Toggle menu">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <div className="flex-grow ml-4">
          <SearchBar onSearchResults={handleSearchResults} />
        </div>
      </header>

      {/* Mobile Slide-out Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 z-40 h-full w-64 bg-[#1C1E26] transform transition-transform duration-300 ease-in-out border-r border-gray-800 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="p-2 hover:bg-gray-800 rounded-lg transition-colors" aria-label="Close menu">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="flex flex-col px-4 space-y-4 mt-4" onClick={toggleMenu}>
          <NavigationLinks />
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-4 bg-[#1C1E26] border-b border-gray-800">
          <SearchBar onSearchResults={handleSearchResults}/>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Melissa Doe</span>
            <img
              src="path_to_profile_image.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-700"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto mt-16 md:mt-0">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((movie) => (
                <Card
                  key={movie.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => handleCardClick(movie.id)}
                >
                  <h3 className="font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                  <p className="mt-2 line-clamp-3">{movie.overview}</p>
                </Card>
              ))}
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
