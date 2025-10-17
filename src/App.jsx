import { useState } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  return (
    <>
    <div id="points" style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}> Points: {points}</div>
    <div className="level-controls">
      <div className="level-buttons">
        {[1, 2, 3, 4, 5].map((level) => (
          <p key={level} className={`button ${currentLevel === level ? 'active' : ''}`}>
            Level {level}
          </p>
        ))}
      </div>
      <button className="button reset-button" onClick={() => setPoints(0)}>🔄 Reset</button>
    </div>

    </>
  );
}

export default App;
