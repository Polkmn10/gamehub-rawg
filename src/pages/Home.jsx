import './Home.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Text, Container, Flex, Button } from '@radix-ui/themes';
import { fetchGames } from '../features/games/gamesSlice';
import GameCard from '../components/GameCard/GameCard';
import Preloader from '../components/Preloader/Preloader';

function Home() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { items, status, error, filters } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page, ...filters }));
  }, [dispatch, page, filters]);

  if (status === 'loading') {
    return <Preloader />;
  }

  if (status === 'failed') {
    return (
      <Container>
        <Flex direction="column" align="center" gap="4" style={{ minHeight: '60vh' }}>
          <Text size="5" color="red">Error: {error}</Text>
          <Button onClick={() => dispatch(fetchGames({ page, ...filters }))}>
            Try Again
          </Button>
        </Flex>
      </Container>
    );
  }

  return (
    <div className="home-container">
      {items.length === 0 ? (
        <div className="empty-state">No games found matching your criteria.</div>
      ) : (
        <>
          <div className="home-grid">
            {items.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={() => setPage(p => p - 1)} 
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button 
              className="pagination-button"
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;