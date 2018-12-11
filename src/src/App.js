import React, { useState, useEffect, useRef } from 'react';
import Life from './util/GameOfLife';

const App = props => {
  const game = new Life(0, 15, 300);
  const width = 300;
  const height = 300;
  const [iterator, setIterator] = useState(15);
  const [shouldanimate, setShouldanimate] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [currentGen, setCurrentGen] = useState(game.inializeGen());
  const canvas = useRef(null);

  const animate = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#696969';
    for (let i = 0, l = height; i < l + iterator; i += iterator) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      for (let j = 0, l = width; j < l + iterator; j += iterator) {
        if (currentGen[i % iterator][j % iterator].alive) {
          ctx.fillRect(i, j, iterator - 1, iterator - 1);
        }
        ctx.moveTo(0, j);
        ctx.lineTo(i, j);
      }
    }
    ctx.stroke();
    if (shouldanimate) {
      setCurrentGen(game.nextGen());
      requestAnimationFrame(timestamp => animate(timestamp));
    }
  };

  useEffect(() => {
    setTimestamp(Date.now() - timestamp);
    let animationFrameId = requestAnimationFrame(() => {
      animate(timestamp);
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const determinePosition = e => {
    const pos = document
      .getElementsByTagName('canvas')[0]
      .getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');
    const xAxis = Math.floor((e.clientX - pos.x) / iterator);
    const yAxis = Math.floor((e.clientY - pos.y) / iterator);
    const cell = currentGen[xAxis][yAxis];
    cell.toggleState();
    if (cell.alive) {
      ctx.fillStyle = '#000';
      ctx.fillRect(
        e.clientX - pos.x - ((e.clientX - pos.x) % iterator),
        e.clientY - pos.y - ((e.clientY - pos.y) % iterator),
        iterator - 1,
        iterator - 1
      );
    } else {
      ctx.fillStyle = '#FFF';
      ctx.fillRect(
        e.clientX - pos.x - ((e.clientX - pos.x) % iterator),
        e.clientY - pos.y - ((e.clientY - pos.y) % iterator),
        iterator - 1,
        iterator - 1
      );
    }
    console.log(currentGen);
  };

  return (
    <>
      <canvas
        ref={canvas}
        style={{ border: '1px solid black', marginTop: '200px' }}
        height={height}
        width={width}
        onClick={e => determinePosition(e)}
      />
      <button onClick={shouldanimate => setShouldanimate(!shouldanimate)}>
        Play!
      </button>
    </>
  );
};

export default App;
