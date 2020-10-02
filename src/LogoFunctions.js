import React, { useEffect, useState, useRef } from 'react';
import LogoExpressionComposer from './components/LogoExpressionComposer';

export const createLogoFunction = function ( render, execute, name, defaultArguments )
{
  const funcFact =
    function () // logo function factory
    {
        const func = {};
        const args = func.args ? func.args : [];
        func.execute = function () { return execute( ...this.args ); };
        func.render = render;
        func.setArguments = function ( ...args ) { func.args = args; } // different than 'args' from parent function
        func.args = [];
        if (defaultArguments)
            func.setArguments( ...defaultArguments ); // factory method initializes new object w/ default vals
        return func;
    }
  funcFact.logoName = name;
  return funcFact;
}

export const logoAddFunction = createLogoFunction(
  function ( { logoFunc, setFuncCallback, path, args } )
  {
    return (
        <React.Fragment>
            <LogoExpressionComposer logoFunc={logoFunc.args[0]} setFuncCallback={setFuncCallback} path={[...path, 0]} />
            +
            <LogoExpressionComposer logoFunc={logoFunc.args[1]} setFuncCallback={setFuncCallback} path={[...path, 1]} />
        </React.Fragment>
    );
  },
  function ( a, b )
  {
    return a.execute() + b.execute();
  },
  "add (operation)",
);

export const logoConstantFunction = createLogoFunction(
    function ( { logoFunc, setFuncCallback, path, args } )
  {
    const [ editing, setEditing ] = useState( true );

    const infield = useRef();

    useEffect( () => {
        if ( editing )
            infield.current.focus();
    },
    [ editing ] );

    const processInput = e =>
    {
        if ( e.key === 'Enter' )
        {
            setFuncCallback( [...path, 0], Number(e.target.value) );
            setEditing( false );
        }
        else if ( e.key === 'Escape' )
        {
            setEditing( false );
        }
    }

    return (
        <div onClick={ () => setEditing(true) }>
            {
                editing
                ?
                    <input ref={infield} className="LECTextInput" onKeyDown={ processInput } />
                :
                    <span className="LECBlockValue">{logoFunc.args[0] ? logoFunc.args[0] : 0}</span>
            }
        </div>
    );
  },
  function ( args )
  {
      console.log(this);
    return args;
  },
  "constant value",
  [0]
);

export const funcChoiceTree = [logoAddFunction, logoConstantFunction];