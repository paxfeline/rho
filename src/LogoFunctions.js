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

export const createLogoFunctionFactory = function ( render, execute, display, name, defaultArguments )
{
  const funcFact =
    function () // logo function factory
    {
        const func = {};
        const args = func.args ? func.args : [];
        func.render = render;
        func.execute = function () { return execute( ...this.args ); };
        func.display = function () { return display( ...this.args ) };
        func.setArguments = function ( ...args ) { func.args = args; } // different than 'args' from parent function
        func.args = [];
        if (defaultArguments)
            func.setArguments( ...defaultArguments ); // factory method initializes new object w/ default vals
        return func;
    }
  funcFact.logoName = name;
  return funcFact;
}

/* create an "addition operation" function factory.
    The render method will display the function composition interface.
    It's just returning some JSX (a simple functional component).
    The execute function performs the operation (addition). */

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
  function ( a, b )
  {
    return `(${a ? a.display() : '(undefined)'} + ${b ? b.display() : '(undefined)'})`;
  },
  "add (operation)",
);

/* create a "constant function" factory.
    The render method will display the function composition interface.
    It acts as a functional component, and uses some local state
    variables to help with editing.
    It has one argument, which is the value it should return.
    (In a sense it is f(x) = x, but x is relatively constant.
    f(x) = C is the closer mathematical analogy.)
    The execute function performs the function (returns the constant). */

export const logoConstantFunctionFactory = createLogoFunctionFactory(
  function ( { logoFunc, path } )
  {
    const setFuncCallback = useContext(SetFuncFromPathContext);

    // start out in the editing = true state
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
            // the "constant" value returned by this function is technically an argument passed to it
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
  function ( val )
  {
      console.log(this);
    return val;
  },
  function ( val )
  {
    return `${val}`;
  },
  "constant value",
  [0] // default value
);

export const funcChoiceTree = [logoAddFunctionFactory, logoConstantFunctionFactory];