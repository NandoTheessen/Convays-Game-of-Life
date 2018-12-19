import React, { useEffect, useRef, useReducer } from 'react';
import Life from './util/GameOfLife';
import Reducer from './util/Reducer';

const App = () => {
  const initialCellSize = 25;
  const game = new Life(initialCellSize, 500);
  const canvas = useRef(null);

  const [{ size, running, currentGen, iterator, gen }, dispatch] = useReducer(
    Reducer,
    {
      size: 500,
      running: false,
      currentGen: game.initialiseGen(),
      iterator: initialCellSize,
      gen: 0
    }
  );
  // useEffect running on mount responsible for drawing the grid
  useEffect(() => {
    drawGrid();
  }, []);

  // useEffect used to update the grid based on changes to the current Generation
  // of cells
  useEffect(
    () => {
      draw();
    },
    [currentGen]
  );

  return (
    <>
      <h1>Conways Game of Life</h1>
      <p>Generation: {gen}</p>
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
      <button onClick={play}>{running ? 'Stop!' : 'Play!'}</button>
      <button onClick={createNewGen}>Next!</button>
      <button onClick={clearGrid}>clear!</button>
      <button onClick={randomizeGrid}>Random!</button>
    </>
  );

  // ===================================================================
  // Game Functionality

  function drawGrid() {
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    ctx.globalAlpha = 1;

    for (let i = 0, l = size - iterator; i < l + iterator; i += iterator) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      for (let j = 0, l = size - iterator; j < l + iterator; j += iterator) {
        ctx.moveTo(0, j);
        ctx.lineTo(size, j);
      }
    }
    ctx.stroke();
  }

  function draw() {
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 1;

    for (let i = 0, l = size - iterator; i < l + iterator; i += iterator) {
      for (let j = 0, l = size - iterator; j < l + iterator; j += iterator) {
        if (currentGen[i / iterator][j / iterator].alive) {
          ctx.fillStyle = '#000';
          ctx.fillRect(i + 2, j + 2, iterator - 3, iterator - 3);
        } else {
          ctx.fillStyle = '#FFF';
          ctx.fillRect(i + 2, j + 2, iterator - 3, iterator - 3);
        }
      }
    }
    if (running) {
      setTimeout(() => {
        dispatch({ type: 'NEXT_GEN', payload: game.nextGen(currentGen) });
      }, 30);
    }
    return;
  }

  function createNewGen() {
    dispatch({ type: 'NEXT_GEN', payload: game.nextGen(currentGen) });
  }

  function clearGrid() {
    dispatch({ type: 'STOP' });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_GRID', payload: game.initialiseGen() });
    }, 50);
  }

  function randomizeGrid() {
    dispatch({ type: 'RANDOMIZE', payload: game.randomizeGrid() });
  }

  function play() {
    if (!running) {
      dispatch({ type: 'START' });
      dispatch({ type: 'NEXT_GEN', payload: game.nextGen(currentGen) });
    } else {
      dispatch({ type: 'STOP' });
    }
  }
  // ===================================================================
  // Grid Click Handler

  function determinePosition(e) {
    const pos = canvas.current.getBoundingClientRect();
    const ctx = canvas.current.getContext('2d');

    const xAxis = Math.floor((e.clientX - pos.x) / iterator);
    const yAxis = Math.floor((e.clientY - pos.y) / iterator);
    if (xAxis === 100 || yAxis === 100) {
      return;
    }
    currentGen[xAxis][yAxis].toggleState();

    ctx.fillStyle = currentGen[xAxis][yAxis].alive ? '#000' : '#FFF';
    ctx.fillRect(
      e.clientX - pos.x - ((e.clientX - pos.x) % iterator) + 2,
      e.clientY - pos.y - ((e.clientY - pos.y) % iterator) + 2,
      iterator - 3,
      iterator - 3
    );
  }
};

export default App;
