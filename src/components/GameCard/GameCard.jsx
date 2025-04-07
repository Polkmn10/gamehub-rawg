import './GameCard.css';
import { Card, Text, Flex, Badge, Button } from '@radix-ui/themes';
import { BookmarkIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../../features/bookmarks/bookmarksSlice';
import { SignedIn } from '@clerk/clerk-react';

function GameCard({ game }) {
  const dispatch = useDispatch();
  const savedGames = useSelector(state => state.bookmarks.savedGames);
  const isBookmarked = savedGames.some(g => g.id === game.id);

  return (
    <Card style={{ overflow: 'hidden' }}>
      <img 
        src={game.background_image} 
        alt={game.name}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover' 
        }}
      />
      
      <Flex direction="column" gap="2" p="3">
        <Flex justify="between" align="center">
          <Link to={`/game/${game.id}`}>
            <Text size="5" weight="bold">{game.name}</Text>
          </Link>
          <SignedIn>
            <Button 
              variant={isBookmarked ? "solid" : "ghost"} 
              size="1"
              onClick={() => dispatch(toggleBookmark(game))}
            >
              <BookmarkIcon />
            </Button>
          </SignedIn>
        </Flex>

        <Flex gap="2" wrap="wrap">
          {game.genres?.map(genre => (
            <Badge key={genre.id} variant="soft">
              {genre.name}
            </Badge>
          ))}
        </Flex>

        <Flex gap="3" mt="2">
          <Badge variant="solid" color="yellow">
            ★ {game.rating}
          </Badge>
          <Text size="2" color="gray">
            Released: {new Date(game.released).getFullYear()}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export default GameCard;