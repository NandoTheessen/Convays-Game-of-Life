import React, { useState, useEffect, useRef } from 'react';

const App = props => {
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);

  const canvasRef = useCanvas();
  console.log(canvasRef);
  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black' }}
      height={height}
      width={width}
    />
  );
  function useCanvas(context = '2d') {
    const canvasRef = useRef(null);
    const [timestamp, setTimestamp] = useState(Date.now());
    const [shouldanimate, setShouldanimate] = useState(false);

    useEffect(timestamp => {
      const ctx = canvasRef.current.getContext(context);
      ctx.beginPath();
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
      let animationFrameId = requestAnimationFrame(timestamp => {
        animate(timestamp);
      });

      return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return canvasRef;
    function animate(timestamp) {
      if (shouldanimate) {
        requestAnimationFrame(timestamp => animate(timestamp));
      }
    }
  }
};

export default App;
