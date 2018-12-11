import React, { useState, useEffect, useRef } from 'react';

const App = props => {
  const width = 300;
  const height = 300;
  const [iterator, setIterator] = useState(15);
  const [shouldanimate, setShouldanimate] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [life, setLife] = useState([]);
  const canvas = useRef(null);

  const animate = timestamp => {
    const ctx = canvas.current.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#696969';

    for (let i = iterator, l = height; i < l + iterator; i += iterator) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      for (let j = iterator, l = width; j < l + iterator; j += iterator) {
        ctx.moveTo(0, j);
        ctx.lineTo(i, j);
      }
    }
    ctx.stroke();
    if (shouldanimate) {
      console.log('animating!');
      requestAnimationFrame(timestamp => animate(timestamp));
    }
  };

  useEffect(
    timestamp => {
      setTimestamp(Date.now() - timestamp);
      let animationFrameId = requestAnimationFrame(() => {
        animate(timestamp);
      });

      return () => cancelAnimationFrame(animationFrameId);
    },
    [life]
  );
  return (
    <>
      <canvas
        ref={canvas}
        style={{ border: '1px solid black', marginTop: '200px' }}
        height={height}
        width={width}
        onClick={e => determinePosition(e, canvas, iterator)}
      />
      <button onClick={shouldanimate => setShouldanimate(!shouldanimate)}>
        Play!
      </button>
      <button onClick={() => setLife([1, 2, 3, 4, 5, 6])}>
        Trigger useEffect!
      </button>
    </>
  );
};

const determinePosition = (e, canvas, iterator) => {
  const pos = document
    .getElementsByTagName('canvas')[0]
    .getBoundingClientRect();
  const xAxis = Math.floor((e.clientX - pos.x) / iterator);
  const yAxis = Math.floor((e.clientY - pos.y) / iterator);
  const ctx = canvas.current.getContext('2d');

  ctx.fillRect(
    e.clientX - pos.x - ((e.clientX - pos.x) % iterator),
    e.clientY - pos.y - ((e.clientY - pos.y) % iterator),
    iterator - 1,
    iterator - 1
  );
  console.log(xAxis, yAxis);
};

export default App;
