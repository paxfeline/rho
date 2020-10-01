import React, { useState } from 'react';
import Logo from './components/Logo';
import LogoExpressionComposer from './components/LogoExpressionComposer';
import './App.css';

/*
function createLogoFunctionFactory( render, execute, name )
{
  const funcFact =
    function ( ...args ) // logo function factory
    {
      const func =
        function () // specific logo function
        {
          return execute.apply( null, func.args );
        };
      func.render = render;
      func.logoName = name;
      func.setArguments = function ( ...args ) { func.args = args; } // different than 'args' from parent function
      func.setArguments( ...args ); // factory method initializes new object w/ default vals
      return func;
    }
  funcFact.render = render;
  funcFact.logoName = name;
  funcFact.setArguments = function ( ...args ) { funcFact.args = args; } // different than 'args' from parent function
  return funcFact;
}

const logoAddFunctionFactory = createLogoFunctionFactory(
  function ( paramTree )
  {
    return (
      <div> { <LogoExpressionComposer paramTree={paramTree} index={0} /> } + { <LogoExpressionComposer paramTree={paramTree} index={1} /> } </div>
    );
  },
  function ( a, b )
  {
    return a() + b();
  },
  "add (operation)"
);

const logoConstantFunctionFactory = createLogoFunctionFactory(
  function ( argumentCallback )
  {
    const [a,b]=useState( this.args[0] );
    return (
      <div onClick={()=>{const n = prompt(); b(n);}}> { a } </div>
    );
  },
  function ( a )
  {
    return a;
  },
  "constant value"
);

const const5 = logoConstantFunctionFactory( 5 );
const const2 = logoConstantFunctionFactory( 2 );

const add1 = logoAddFunctionFactory();
add1.setArguments( const2, const5 );
console.log( add1(), "first" );

const prog = [ add1 ];
*/

function RFC({depth = 0})
{
  return depth < 5 ?
    <div class={"depth" + depth}><RFC depth={depth + 1} /></div>
    : null;
}

function App() {
  return (
    <div>
      <LogoExpressionComposer />
      {/*<RFC />
      <Logo />*/}
    </div>
  );
}

export default App;
