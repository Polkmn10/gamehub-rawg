import './GameDetails.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Heading, Text, Flex, Card, Grid, Badge } from '@radix-ui/themes';
import { getGameDetails, getGameScreenshots } from '../services/api';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const [gameData, screenshotsData] = await Promise.all([
          getGameDetails(id),
          getGameScreenshots(id)
        ]);
        setGame(gameData);
        setScreenshots(screenshotsData.results);
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (!game) return <Text>Game not found</Text>;

  return (
    <Container size="3">
      <Card>
        <img
          src={game.background_image}
          alt={game.name}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
        
        <Flex direction="column" gap="4" p="4">
          <Heading size="8">{game.name}</Heading>
          
          <Flex gap="2" wrap="wrap">
            {game.genres?.map(genre => (
              <Badge key={genre.id} variant="soft">
                {genre.name}
              </Badge>
            ))}
          </Flex>

          <Text>{game.description_raw}</Text>

          <Grid columns="3" gap="3">
            {screenshots.map(screenshot => (
              <img
                key={screenshot.id}
                src={screenshot.image}
                alt="Game Screenshot"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            ))}
          </Grid>
        </Flex>
      </Card>
    </Container>
  );
}

export default GameDetails;