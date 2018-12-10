import React, { useState, useEffect, useRef } from 'react';

const App = props => {
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  const [shouldanimate, setShouldanimate] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const canvasRef = useCanvas();

  const animate = timestamp => {
    if (shouldanimate) {
      requestAnimationFrame(timestamp => animate(timestamp));
    }
  };
  const determinePosition = e => {
    const pos = document
      .getElementsByTagName('canvas')[0]
      .getBoundingClientRect();
    console.log(e.clientX - pos.x, e.clientY - pos.y);
    const xAxis = Math.floor((e.clientX - pos.x) / 15);
    const yAxis = Math.floor((e.clientY - pos.y) / 15);
    const ctx = canvasRef.current.getContext('2d');

    ctx.fillRect(
      e.clientX - pos.x - ((e.clientX - pos.x) % 15),
      e.clientY - pos.y - ((e.clientY - pos.y) % 15),
      15,
      15
    );
    console.log(xAxis, yAxis);
  };

  console.log(canvasRef);
  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black', marginTop: '200px' }}
      height={height}
      width={width}
      onClick={determinePosition}
    />
  );
  function useCanvas(context = '2d') {
    const canvasRef = useRef(null);

    useEffect(() => {
      const ctx = canvasRef.current.getContext(context);
      ctx.beginPath();
      ctx.lineWidth = 0.1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      for (let i = 15, l = 300; i < l; i += 15) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 300);
        ctx.stroke();
        for (let j = 15, l = height; j < l; j += 15) {
          ctx.moveTo(0, j);
          ctx.lineTo(300, j);
          ctx.stroke();
        }
      }
      let animationFrameId = requestAnimationFrame(() => {
        animate(timestamp);
      });

      return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return canvasRef;
  }
};

export default App;
