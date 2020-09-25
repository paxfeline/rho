import React, { useState } from 'react';
import Logo from './components/logo.js';
import './App.css';

function createLogoFunctionFactory( render, execute )
{
  return (
    function ( ...args ) // logo function
    {
      const func =
        function () // specific logo function
        {
          return execute.apply( null, func.args );
        };
      func.render = render;
      func.setArguments = function ( ...args ) { func.args = args; } // different than 'args' from parent function
      func.setArguments( ...args ); // factory method initializes new object w/ default vals
      return func;
    }
  );
}

const logoAddFunctionFactory = createLogoFunctionFactory(
  function ( argumentCallback )
  {
    return (
      <div> { argumentCallback(0) } + { argumentCallback(1) } </div>
    );
  },
  function ( a, b )
  {
    return a() + b();
  }
);

const logoConstantFunctionFactory = createLogoFunctionFactory(
  function ( argumentCallback )
  {
    const [a,b]=useState(0);
    return (
      <div onClick={()=>{const n = prompt(); b(n);}}> { a } </div>
    );
  },
  function ( a )
  {
    return a;
  }
);

const const5 = logoConstantFunctionFactory( 5 );
const const2 = logoConstantFunctionFactory( 2 );

const add1 = logoAddFunctionFactory();
add1.setArguments( const2, const5 );
console.log( add1(), "first" );

const prog = [ add1 ];

function App() {
  return (
    <div>
      {
        const5.render( n => n )
      }
      <Logo program={ prog } />
    </div>
  );
}

export default App;
