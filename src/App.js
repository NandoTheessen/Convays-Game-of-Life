import React, { useEffect, useRef, useReducer } from 'react';
import Life from './util/GameOfLife';
import Reducer from './util/Reducer';

const App = () => {
  const game = new Life(0, 10, 500);

  const [{ size, timer, run, currentGen, iterator }, dispatch] = useReducer(
    Reducer,
    {
      size: 500,
      timer: 30,
      run: false,
      currentGen: game.inializeGen(),
      iterator: 10
    }
  );

  const canvas = useRef(null);

  const animate = () => {
    console.log('fire animate', currentGen);
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#696969';
    ctx.clearRect(0, 0, size, size);

    for (let i = 0, l = size - iterator; i < l + iterator; i += iterator) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      for (let j = 0, l = size - iterator; j < l + iterator; j += iterator) {
        ctx.moveTo(0, j);
        ctx.lineTo(size, j);
        if (currentGen[i / iterator][j / iterator].alive) {
          ctx.fillRect(i + 2, j + 2, iterator - 4, iterator - 4);
        }
      }
    }

    ctx.stroke();

    if (run) {
      setTimeout(() => {
        dispatch({ type: 'NEXT_GEN', payload: game.nextGen(currentGen) });
      }, timer);
    }
  };
  const play = () => {
    if (!run) {
      dispatch({ type: 'START', payload: game.nextGen(currentGen) });
      animate();
    } else {
      dispatch({ type: 'STOP' });
    }
  };

  useEffect(
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

    ctx.fillStyle = currentGen[xAxis][yAxis].alive ? '#000' : '#FFF';
    ctx.fillRect(
      e.clientX - pos.x - ((e.clientX - pos.x) % iterator) + 2,
      e.clientY - pos.y - ((e.clientY - pos.y) % iterator) + 2,
      iterator - 4,
      iterator - 4
    );
    console.log(currentGen);
  };

  const createNewGen = () => {
    dispatch({ type: 'NEXT_GEN', payload: game.nextGen(currentGen) });
  };
  const clearGrid = () => {
    const newgrid = game.clearGrid();
    dispatch({ type: 'CLEAR_GRID', payload: game.nextGen(newgrid) });
  };

  const randomizeGrid = () => {
    const randomGrid = game.randomizeGrid();
    console.log(randomGrid);
    dispatch({ type: 'RANDOMIZE', payload: randomGrid });
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
        height={size}
        width={size}
        onClick={e => determinePosition(e)}
      />
      <button onClick={play}>{run ? 'Stop!' : 'Play!'}</button>
      <button onClick={createNewGen}>Next!</button>
      <button onClick={clearGrid}>clear!</button>
      <button onClick={randomizeGrid}>Random!</button>
    </>
  );
};

export default App;
