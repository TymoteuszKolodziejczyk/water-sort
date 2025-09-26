import { useState } from 'react';
import './App.css';

const levels = [
  {
    level: 1,
    vials: 3,
    vialColors: [
      ['red', 'green', 'red', 'green'],
      ['green', 'red', 'green', 'red'],
      ['', '', '', ''],
    ],
  },
];

function Game() {
  const [vials, setVials] = useState(levels[0].vialColors);

  const getTopColorIndex = (vial) =>
    vial.reduce((topIndex, c, i) => (c !== '' ? i : topIndex), -1);

  const getTopColor = (vial) => {
    const index = getTopColorIndex(vial);
    return index !== -1 ? vial[index] : '';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const color = e.dataTransfer.getData('color');
    const newVials = vials.map((vial) => [...vial]);

    // Find source vial and remove top color
    let sourceIndex = -1;
    for (let i = 0; i < newVials.length; i++) {
      const topIndex = getTopColorIndex(newVials[i]);
      if (topIndex !== -1 && newVials[i][topIndex] === color) {
        sourceIndex = i;
        newVials[i][topIndex] = '';
        break;
      }
    }

    if (sourceIndex === -1) return;

    const targetVial = newVials[targetIndex];
    const targetTopColor = getTopColor(targetVial);
    const emptyIndex = targetVial.indexOf('');

    // Drop only if target is empty or matches top color
    if (emptyIndex !== -1 && (targetTopColor === '' || targetTopColor === color)) {
      targetVial[emptyIndex] = color;
    } else {
      // Restore color to source if drop fails
      const restoreIndex = getTopColorIndex(newVials[sourceIndex]) + 1;
      newVials[sourceIndex][restoreIndex] = color;
    }

    setVials(newVials);
  };

  const handleDragStart = (e, color) => {
    e.dataTransfer.setData('color', color);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="game-container">
      {vials.map((vial, index) => (
        <div
          key={index}
          className="vial"
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={allowDrop}
        >
          {[...vial].map((color, colorIndex) => (
            <div
              key={colorIndex}
              className={`color-box ${color}`}
              draggable={
                color !== '' &&
                colorIndex === getTopColorIndex(vial)
              }
              onDragStart={(e) => handleDragStart(e, color)}
            >
              {color}
            </div>
          )).reverse()}
        </div>
      ))}
    </div>
  );
}

export default Game;
