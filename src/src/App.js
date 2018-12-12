import React, { useState, useLayoutEffect, useRef } from 'react';
import Life from './util/GameOfLife';

const App = () => {
  const game = new Life(0, 15, 300);
  const width = 300;
  const height = 300;

  const [iterator, setIterator] = useState(15);
  const [shouldanimate, setShouldanimate] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [currentGen, setCurrentGen] = useState(() => game.inializeGen());

  const canvas = useRef(null);

  const animate = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#696969';
    ctx.clearRect(0, 0, width, height);

    console.log('animate: ', currentGen);

    for (let i = 0, l = height - iterator; i < l + iterator; i += iterator) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      for (let j = 0, l = width - iterator; j < l + iterator; j += iterator) {
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        if (currentGen[i / iterator][j / iterator].alive) {
          // console.log('X', i / iterator, 'Y', j / iterator);
          ctx.fillRect(i + 2, j + 2, iterator - 4, iterator - 4);
        }
      }
    }

    ctx.stroke();

    if (shouldanimate) {
      setCurrentGen(() => game.nextGen(currentGen));
      requestAnimationFrame(timestamp => animate(timestamp));
    }
  };

  useLayoutEffect(
    () => {
      setTimestamp(Date.now() - timestamp);
      let animationFrameId = requestAnimationFrame(() => {
        animate(timestamp);
      });

      return () => cancelAnimationFrame(animationFrameId);
    },
    [currentGen]
  );

  const determinePosition = e => {
    const pos = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    const xAxis = Math.floor((e.clientX - pos.x) / iterator);
    const yAxis = Math.floor((e.clientY - pos.y) / iterator);

    currentGen[xAxis][yAxis].toggleState();
    console.log('alive?!: ', currentGen[xAxis][yAxis].alive);
    if (currentGen[xAxis][yAxis].alive) {
      ctx.fillStyle = '#000';
      ctx.fillRect(
        e.clientX - pos.x - ((e.clientX - pos.x) % iterator) + 2,
        e.clientY - pos.y - ((e.clientY - pos.y) % iterator) + 2,
        iterator - 4,
        iterator - 4
      );
    } else {
      ctx.fillStyle = '#FFF';
      ctx.fillRect(
        e.clientX - pos.x - ((e.clientX - pos.x) % iterator) + 2,
        e.clientY - pos.y - ((e.clientY - pos.y) % iterator) + 2,
        iterator - 4,
        iterator - 4
      );
    }
  };

  const createNewGen = () => {
    console.log('currentgen', currentGen);
    setCurrentGen(() => game.nextGen(currentGen));
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
      <button onClick={createNewGen}>Next!</button>
    </>
  );
};

export default App;
