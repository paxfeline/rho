import React, { useState, useEffect, useRef } from 'react';

function Logo( {  } )
{
  const [turtleLocation, setTurtleLocation] = useState( {x: 0, y: 0} );
  const [turtleHeading, setTurtleHeading] = useState( 0 );
  const [programCounter, setProgramCounter] = useState( null );

  const canvasRef = useRef(null);
  const resizeCallback = useRef(null);

  const redraw = () =>
  {
    // if the window is resized, trigger this function again
    window.removeEventListener( 'resize', resizeCallback.current );
    resizeCallback.current = redraw;
    window.addEventListener( 'resize', redraw );

    // resize canvas
    canvasRef.current.width = canvasRef.current.offsetWidth;
    canvasRef.current.height = canvasRef.current.offsetHeight;

    const ctx = canvasRef.current.getContext('2d');

    ctx.fillStyle = "black";

    ctx.fillRect( 0, 0, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight );

    console.log( canvasRef.current.offsetWidth, canvasRef.current.offsetHeight );
  }

  useEffect( redraw );

  return (
    <canvas ref={canvasRef} style={ { width: '100%', height: '100%', position: 'absolute' }} />
  );
}

export default Logo;
