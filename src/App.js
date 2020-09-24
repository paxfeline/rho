import React from 'react';
import Logo from './components/logo.js';
import './App.css';

function createLogoFunctionFactory( render, execute )
{
  const funcFactory =
    function ( ...args ) // logo function
    {
      const func =
        function () // specific logo function
        {
          execute.apply( func, func.args );
        };
      func.render = render;
      func.setArguments = function ( ...args ) { func.args = args; }
      func.setArguments( args ); // factory method initializes new object
      return func;
    };
  
  return funcFactory;
}

const logoForwardFunctionFactory = createLogoFunctionFactory(
  function ()
  {
    return (
      <div>
        {this.args[0]} + {this.args[1]}
      </div>
    );
  },
  function ()
  {
    return this.args[0] + this.args[1];
  }
)

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
