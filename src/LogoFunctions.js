import React, { useEffect, useState, useRef, useContext } from 'react';
import LogoExpressionComposer from './components/LogoExpressionComposer';
import { SetFuncFromPathContext } from './App';

/* createLogoFunction is used to create logo functions.
    The first three parameters are required, the fourth isn't.
    render is a function that displays the function's composition
    interface. It can return some JSX, or act as a full-fledged
    functional component. Often, it will mainly just render
    LogoExpressionComposer components.
    The function takes a single parameter which is an object
    whose fields are the props passed to the component:
        logoFunc - the function
        setFuncCallback - callback used by the LogoExpressionComposer
            component (must be passed along)
        path - used to locate the function in question in the 
            expression tree
    Notice that child LogoExpressionComposer components are passed
    a modified path, corresponding to their positions as arguments
    of the logo function it represents. */

export const createLogoFunctionFactory = function ( render, execute, name, defaultArguments )
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

/* create an add function factory.
    The render method will display the function composition interface.
    It acts as a functional component, and uses some local state
    variables to help with editing.
    The execute function performs the function. */

export const logoAddFunctionFactory = createLogoFunctionFactory(
  function ( { logoFunc, path } )
  {
    return (
        <React.Fragment>
            <LogoExpressionComposer logoFunc={logoFunc.args[0]} path={[...path, 0]} />
            +
            <LogoExpressionComposer logoFunc={logoFunc.args[1]} path={[...path, 1]} />
        </React.Fragment>
    );
  },
  function ( a, b )
  {
    return a.execute() + b.execute();
  },
  "add (operation)",
);

export const logoConstantFunctionFactory = createLogoFunctionFactory(
  function ( { logoFunc, path } )
  {
    const setFuncCallback = useContext(SetFuncFromPathContext);

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

export const funcChoiceTree = [logoAddFunctionFactory, logoConstantFunctionFactory];