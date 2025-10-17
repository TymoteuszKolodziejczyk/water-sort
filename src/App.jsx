import React, { useState, createContext, useContext } from 'react';
import './App.css';
import Game from './Game';
import Menu from './Menu';

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

function App() {
  const [points, setPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleReset = () => {
    setPoints(0);
    setCurrentLevel(1); // Reset to level 1
  };

  return (
    <GameContext.Provider value={{ points, setPoints, currentLevel, setCurrentLevel }}>
      <Menu onReset={handleReset} />
      <Game />
    </GameContext.Provider>
  );
}

export default App;
