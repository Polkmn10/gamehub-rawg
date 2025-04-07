import './Library.css';
import { useSelector } from 'react-redux';
import { Grid, Text, Container, Heading } from '@radix-ui/themes';
import GameCard from '../components/GameCard/GameCard';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function Library() {
  const { savedGames } = useSelector((state) => state.bookmarks);

  return (
    <>
      <SignedIn>
        <div className="library-container">
          <h1 className="library-title">My Library</h1>
          {savedGames.length === 0 ? (
            <div className="empty-library">
              No saved games yet. Start adding games to your library!
            </div>
          ) : (
            <div className="library-grid">
              {savedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default Library;