import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../features/games/gamesSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { MagnifyingGlassIcon, HomeIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <Link to="/" className="logo">
              GameHub
            </Link>

            <nav className="nav-section">
              <Link to="/" className="nav-button">
                <HomeIcon />
                <span>Home</span>
              </Link>
            </nav>
          </div>

          <div className="search-section">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="nav-section">
            <Link to="/library" className="nav-button library-button">
              <BookmarkIcon />
              <span>Library</span>
            </Link>

            <div className="user-section">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: {
                      width: '32px',
                      height: '32px',
                    }
                  }
                }}
              />
            </div>

            <button className="mobile-menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;