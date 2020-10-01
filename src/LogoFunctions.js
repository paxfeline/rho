import React, { useEffect, useState, useRef } from 'react';

export const createLogoFunctionFactory = function ( render, execute, name, defaultArguments )
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

export const logoAddFunctionFactory = createLogoFunctionFactory(
  function ( { LECCallback, args, closeBtn } )
  {
    return (
      <div className="LECblock"> { <LECCallback /> } + { <LECCallback /> } 
      {closeBtn}
      </div>
    );
  },
  function ( a, b )
  {
    return a() + b();
  },
  "add (operation)",
);

export const logoConstantFunctionFactory = createLogoFunctionFactory(
  function ( { LECCallback, args, closeBtn } )
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
    }

    return (
        <div className="LECblock">
            <div className="LECBlock" onClick={ () => setEditing(true) }>
                {
                    editing
                    ?
                        <input ref={infield} className="LECTextInput" onKeyDown={ processInput } />
                    :
                        <span className="LECBlockValue">{value}</span>
                }
                { closeBtn }
            </div>
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

export const funcChoiceTree = [logoAddFunctionFactory, logoConstantFunctionFactory];