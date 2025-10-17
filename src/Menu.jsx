import React from 'react';
import './App.css';
import { useGameContext } from './App';

function Menu() {
  const { currentLevel, setCurrentLevel, resetLevel } = useGameContext();
  return (
    <>
      <div className="level-controls">
        <div className="level-buttons">
          {[1, 2, 3, 4, 5].map((level) => (
            <p key={level} className={`button ${currentLevel === level ? 'active' : ''}`} onClick={() => {
                if (currentLevel !== level)
                  setCurrentLevel(level);
              }}
            >Level {level}</p>
          ))}
        </div>
        <button className="button reset-button" onClick={resetLevel}>Reset poziomu</button>
      </div>
    </>
  );
}

export default Menu;