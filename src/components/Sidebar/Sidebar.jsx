import { Card, Select, Slider, Text, Flex } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/games/gamesSlice';

function Sidebar() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.games.filters);

  const handleCategoryChange = (value) => {
    dispatch(setFilters({ category: value }));
  };

  const handleYearChange = (value) => {
    dispatch(setFilters({ year: value[0] }));
  };

  const handleRatingChange = (value) => {
    dispatch(setFilters({ rating: value[0] }));
  };

  return (
    <Card style={{ width: '250px', height: 'fit-content' }}>
      <Flex direction="column" gap="4">
        <div>
          <Text as="p" size="2" mb="2" weight="bold">
            Categories
          </Text>
          <Select.Root value={filters.category} onValueChange={handleCategoryChange}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="all">All Games</Select.Item>
                <Select.Item value="action">Action</Select.Item>
                <Select.Item value="rpg">RPG</Select.Item>
                <Select.Item value="strategy">Strategy</Select.Item>
                <Select.Item value="shooter">Shooter</Select.Item>
                <Select.Item value="adventure">Adventure</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>

        <div>
          <Text as="p" size="2" mb="2" weight="bold">
            Release Year
          </Text>
          <Slider 
            value={[filters.year]} 
            onValueChange={handleYearChange}
            min={1990} 
            max={2024} 
            step={1} 
          />
          <Text size="1" color="gray" mt="1">{filters.year}</Text>
        </div>

        <div>
          <Text as="p" size="2" mb="2" weight="bold">
            Rating
          </Text>
          <Slider 
            value={[filters.rating]} 
            onValueChange={handleRatingChange}
            min={0} 
            max={5} 
            step={0.5} 
          />
          <Text size="1" color="gray" mt="1">{filters.rating} ★</Text>
        </div>
      </Flex>
    </Card>
  );
}

export default Sidebar;