import React from 'react';
import Logo from './components/logo.js';
import './App.css';

function createLogoFunctionFactory( render, execute )
{
  return (
    function ( ...args ) // logo function (args A)
    {
      const func =
        function () // specific logo function
        {
          return execute.apply( null, func.args );
        };
      func.render = render;
      func.setArguments =
        function ( ...args ) { func.args = args; } // args B
      func.setArguments( ...args ); // factory method initializes new object w/ default vals (args A)
      return func;
    }
  );
}

const logoForwardFunctionFactory = createLogoFunctionFactory(
  function ( a, b )
  {
    return (
      <div> {a} + {b} </div>
    );
  },
  function ( a, b )
  {
    return a + b;
  }
);

const fwd1 = logoForwardFunctionFactory( 2, 3 );
//fwd1.setArguments( 2, 3 );
console.log( fwd1(), "first" );

const prog = [  ];

function App() {
  return (
    <Logo program={ prog } />
  );
}

export default App;
