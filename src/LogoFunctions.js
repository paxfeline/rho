import React, { useEffect, useState, useRef } from 'react';
import LogoExpressionComposer from './components/LogoExpressionComposer';

export const createLogoFunction = function ( render, execute, name, defaultArguments )
{
  const funcFact =
    function () // logo function factory
    {
        const func = {};
        const args = func.args ? func.args : [];
        func.execute = execute.bind( null, ...args );
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
    return a() + b();
  },
  "add (operation)",
);

export const logoConstantFunction = createLogoFunction(
    function ( { logoFunc, setFuncCallback, path, args } )
  {
    const [ value, setValue ] = useState( logoFunc.args[0] );
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
            setValue( e.target.value );
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
                    <span className="LECBlockValue">{value ? value : 0}</span>
            }
        </div>
    );
  },
  function ( args )
  {
    return args;
  },
  "constant value",
  [0]
);

export const funcChoiceTree = [logoAddFunction, logoConstantFunction];