import React, { useState, useLayoutEffect, useRef } from 'react';
import Life from './util/GameOfLife';

const App = () => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [iterator, setIterator] = useState(10);

  const game = new Life(0, iterator, width);
  const [shouldanimate, setShouldanimate] = useState(false);
  const [timer, setTimer] = useState(10);
  const [currentGen, setCurrentGen] = useState(() => game.inializeGen());

  const canvas = useRef(null);

  const animate = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#696969';
    ctx.clearRect(0, 0, width, height);

    for (let i = 0, l = height - iterator; i < l + iterator; i += iterator) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      for (let j = 0, l = width - iterator; j < l + iterator; j += iterator) {
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        if (currentGen[i / iterator][j / iterator].alive) {
          ctx.fillRect(i + 2, j + 2, iterator - 4, iterator - 4);
        }
      }
    }

    ctx.stroke();

    if (shouldanimate) {
      setTimeout(() => {
        setCurrentGen(() => game.nextGen(currentGen));
      }, timer);
    }
  };
  const play = () => {
    setShouldanimate(!shouldanimate);
    setCurrentGen(() => game.nextGen(currentGen));
    requestAnimationFrame(timestamp => animate(timestamp));
  };

  useLayoutEffect(
    () => {
      let animationFrameId = requestAnimationFrame(() => {
        animate();
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
    setCurrentGen(() => game.nextGen(currentGen));
  };
  const clearGrid = () => {
    const newgrid = game.clearGrid();
    setCurrentGen(() => game.nextGen(newgrid));
  };

  const randomizeGrid = () => {
    const newgrid = game.randomizeGrid();
    setCurrentGen(() => game.nextGen(newgrid));
  };

  return (
    <>
      <canvas
        ref={canvas}
        style={{
          border: '1px solid black',
          display: 'block',
          margin: 'auto',
          marginTop: '50px'
        }}
        height={height}
        width={width}
        onClick={e => determinePosition(e)}
      />
      <button onClick={play}>{shouldanimate ? 'Stop!' : 'Play!'}</button>
      <button onClick={createNewGen}>Next!</button>
      <button onClick={clearGrid}>clear!</button>
      <button onClick={randomizeGrid}>Random!</button>
    </>
  );
};

export default App;
