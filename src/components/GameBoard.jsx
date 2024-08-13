import React from 'react';
import { Sword, Tank, Wrench } from 'lucide-react';

const GameBoard = ({ grid, handleTileClick, GRID_SIZE, TILE_SIZE }) => {
  const getUnitIcon = (unitType) => {
    switch (unitType) {
      case 'soldier':
        return <Sword className="h-4 w-4 text-red-500" />;
      case 'tank':
        return <Tank className="h-4 w-4 text-yellow-500" />;
      case 'builder':
        return <Wrench className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, ${TILE_SIZE}px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-[${TILE_SIZE}px] h-[${TILE_SIZE}px] flex items-center justify-center cursor-pointer ${
              tile.terrain === 'grass' ? 'bg-green-300' :
              tile.terrain === 'water' ? 'bg-blue-300' :
              'bg-gray-400'
            }`}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          >
            {tile.unit && getUnitIcon(tile.unit)}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
