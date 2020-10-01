import React, { useEffect, useState, useRef } from 'react';

export const createLogoFunction = function ( render, execute, name, defaultArguments )
{
  const funcFact =
    function () // logo function factory
    {
      const func =
        function () // specific logo function
        {
          return execute.apply( null, func.args );
        };
      func.render = render;
      func.setArguments = function ( ...args ) { func.args = args; } // different than 'args' from parent function
      if (defaultArguments)
        func.setArguments( ...defaultArguments ); // factory method initializes new object w/ default vals
      return func;
    }
  funcFact.logoName = name;
  return funcFact;
}

export const logoAddFunction = createLogoFunction(
  function ( { LECCallback, args } )
  {
    return (
        <React.Fragment>
            <LECCallback /> + <LECCallback />
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
  function ( { LECCallback, args } )
  {
    const [ value, setValue ] = useState( args[0] );
    const [ editing, setEditing ] = useState( false );

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