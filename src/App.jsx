import { useState } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleLevelCompletion = () => {
    setCurrentLevel((prevLevel) => Math.min(prevLevel + 1, 5));
    // setPoints(points + 10); - point logic
  };

  return (
    <>
      <div id="points" style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}> Points: {points}</div>
      <div className="level-buttons">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            className={`button ${currentLevel === level ? 'active' : ''}`}
            onClick={level === currentLevel ? handleLevelCompletion : null}
            disabled={level > currentLevel}
          >
            Level {level}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
