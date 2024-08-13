import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Sword, Truck, Wrench, Coins } from 'lucide-react';
import GameBoard from '../components/GameBoard';

const GRID_SIZE = 20;
const TILE_SIZE = 30;

const terrainTypes = ['grass', 'water', 'mountain'];
const unitTypes = [
  { type: 'soldier', icon: Sword, cost: 10 },
  { type: 'tank', icon: Truck, cost: 20 },
  { type: 'builder', icon: Wrench, cost: 15 },
];

const Index = () => {
  const [grid, setGrid] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [resources, setResources] = useState(100);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid = Array(GRID_SIZE).fill().map(() =>
      Array(GRID_SIZE).fill().map(() => ({
        terrain: terrainTypes[Math.floor(Math.random() * terrainTypes.length)],
        unit: null
      }))
    );
    setGrid(newGrid);
  };

  const handleTileClick = (row, col) => {
    if (selectedUnit && grid[row][col].unit === null && grid[row][col].terrain !== 'water') {
      const unitCost = unitTypes.find(u => u.type === selectedUnit).cost;
      if (resources >= unitCost) {
        const newGrid = [...grid];
        newGrid[row][col].unit = selectedUnit;
        setGrid(newGrid);
        setSelectedUnit(null);
        setResources(resources - unitCost);
      }
    }
  };

  const createUnit = (type) => {
    const unitCost = unitTypes.find(u => u.type === type).cost;
    if (resources >= unitCost) {
      setSelectedUnit(type);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">2D RTS Game</h1>
      <div className="mb-4 flex items-center">
        <Coins className="mr-2" />
        <span className="mr-4">Resources: {resources}</span>
        {unitTypes.map(({ type, icon: Icon, cost }) => (
          <Button
            key={type}
            onClick={() => createUnit(type)}
            className={`mr-2 ${selectedUnit === type ? 'ring-2 ring-blue-500' : ''}`}
            disabled={resources < cost}
          >
            <Icon className="mr-2 h-4 w-4" />
            {type} ({cost})
          </Button>
        ))}
      </div>
      <GameBoard
        grid={grid}
        handleTileClick={handleTileClick}
        GRID_SIZE={GRID_SIZE}
        TILE_SIZE={TILE_SIZE}
      />
    </div>
  );
};

export default Index;
