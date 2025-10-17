import React, { useState, useEffect } from 'react';
import './App.css';
import { useGameContext } from './App';

const levels = [
  {
    level: 1,
    vialColors: [
      ["red", "green", "red", "green"],
      ["green", "red", "green", "red"],
      ["", "", "", ""],
    ],
  },
  {
    level: 2,
    vialColors: [
      ["green", "yellow", "", ""],
      ["yellow", "green", "", ""],
      ["green", "green", "", ""],
      ["yellow", "yellow", "", ""],
    ],
  },
  {
    level: 3,
    vialColors: [
      ["green", "purple", "", ""],
      ["blue", "blue", "green", ""],
      ["purple", "blue", "green", ""],
      ["green", "blue", "", ""],
      ["purple", "purple", "", ""],
    ],
  },
  {
    level: 4,
    vialColors: [
      ["green", "green", "red", "blue"],
      ["pink", "purple", "red", "blue"],
      ["purple", "red", "pink", "red"],
      ["pink", "green", "blue", "purple"],
      ["green", "pink", "blue", "purple"],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
  },
  {
    level: 5,
    vialColors: [
      ["purple", "purple", "purple", "cyan"],
      ["purple", "green", "yellow", "green"],
      ["green", "yellow", "cyan", "yellow"],
      ["yellow", "cyan", "green", "pink"],
      ["cyan", "pink", "pink", "pink"],
      ["", "", "", ""],
      ["", "", "", ""],
    ],
  },
];

function Game() {
  const { currentLevel, setCurrentLevel, setPoints, resetTrigger } = useGameContext();
  const [vials, setVials] = useState([]);

  useEffect(() => {
    resetLevel();
  }, [currentLevel, resetTrigger]);

  const resetLevel = () => {
    const copiedVials = levels[currentLevel - 1].vialColors.map(vial => [...vial]);
    setVials(copiedVials);
  };

  const getTopColorIndex = (vial) =>
    vial.reduce((topIndex, c, i) => (c !== '' ? i : topIndex), -1);

  const getTopColor = (vial) => {
    const index = getTopColorIndex(vial);
    return index !== -1 ? vial[index] : '';
  };

  const isLevelComplete = (vials) => {
    return vials.every((vial) => {
      if (vial.every((c) => c === '')) return true;
      const firstColor = vial[0];
      return firstColor !== '' && vial.every((c) => c === firstColor);
    });
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const color = e.dataTransfer.getData('color');
    const newVials = vials.map(vial => [...vial]);

    let sourceIndex = -1;
    for (let i = 0; i < newVials.length; i++) {
      const topIndex = getTopColorIndex(newVials[i]);
      if (topIndex !== -1 && newVials[i][topIndex] === color && i !== targetIndex) {
        sourceIndex = i;
        newVials[i][topIndex] = '';
        break;
      }
    }

    if (sourceIndex === -1) return;

    const targetVial = newVials[targetIndex];
    const targetTopColor = getTopColor(targetVial);
    const emptyIndex = targetVial.indexOf('');

    if (emptyIndex !== -1 && (targetTopColor === '' || targetTopColor === color)) {
      targetVial[emptyIndex] = color;
    } else {
      newVials[sourceIndex][getTopColorIndex(newVials[sourceIndex]) + 1] = color;
    }

    setVials(newVials);

    if (isLevelComplete(newVials)) {
      setTimeout(() => {
        if (currentLevel < levels.length) {
          setCurrentLevel(prev => prev + 1);
        } else {
          alert('🏆 Congratulations! You completed all levels!');
        }
      }, 500);
    }
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
              draggable={color !== '' && colorIndex === getTopColorIndex(vial)}
              onDragStart={(e) => handleDragStart(e, color)}
            ></div>
          )).reverse()}
        </div>
      ))}
    </div>
  );
}

export default Game;
