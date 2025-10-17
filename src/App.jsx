import React, { useState, createContext, useContext } from 'react';
import './App.css';
import Game from './Game';
import Menu from './Menu';

const GameContext = createContext();
export const useGameContext = () => useContext(GameContext);

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [resetTrigger, setResetTrigger] = useState(false);
  const resetLevel = () => {
    setResetTrigger(prev => !prev);
  };

  return (
    <GameContext.Provider value={{currentLevel, setCurrentLevel, resetLevel, resetTrigger}}>
      <Menu />
      <Game />
    </GameContext.Provider>
  );
}

export default App;
