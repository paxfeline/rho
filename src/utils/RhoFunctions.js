import React, { useEffect, useState, useRef, useContext } from 'react';
import RhoExpressionComposer from '../components/RhoExpressionComposer';
import { SetFuncFromPathContext } from '../components/RhoStatementConsole';

/* createRhoFunction is used to create rho functions.
    The first three parameters are required, the fourth isn't.
    render is a function that displays the function's composition
    interface. It can return some JSX, or act as a full-fledged
    functional component. Often, it will mainly just render
    RhoExpressionComposer components.
    The function takes a single parameter which is an object
    whose fields are the props passed to the component:
        rhoFunc - the function
        setFuncCallback - callback used by the RhoExpressionComposer
            component (must be passed along)
        path - used to locate the function in question in the 
            expression tree
    Notice that child RhoExpressionComposer components are passed
    a modified path, corresponding to their positions as arguments
    of the rho function it represents. */

export const createRhoFunctionFactory = function ( render, execute, display, name, defaultArguments )
{
  const funcFact =
    function () // rho function factory
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
  funcFact.rhoName = name;
  return funcFact;
}

/* create an "addition operation" function factory.
    The render method will display the function composition interface.
    It's just returning some JSX (a simple functional component).
    The execute function performs the operation (addition). */

export const rhoAddFunctionFactory = createRhoFunctionFactory(
  function ( { rhoFunc, path } )
  {
    return (
        <React.Fragment>
            <RhoExpressionComposer rhoFunc={rhoFunc.args[0]} path={[...path, 0]} />
            +
            <RhoExpressionComposer rhoFunc={rhoFunc.args[1]} path={[...path, 1]} />
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

export const rhoConstantFunctionFactory = createRhoFunctionFactory(
  function ( { rhoFunc, path } )
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
                    <span className="LECBlockValue">{rhoFunc.args[0] ? rhoFunc.args[0] : 0}</span>
            }
        </div>
    );
  },
  function ( val )
  {
    return val;
  },
  function ( val )
  {
    return `${val}`;
  },
  "constant value",
  [0] // default value
);

/**/

export const rhoForwardFunctionFactory = createRhoFunctionFactory(
  function ( { rhoFunc, path } )
  {
    return (
      <React.Fragment>
        Forward: <RhoExpressionComposer rhoFunc={rhoFunc.args[0]} path={[...path, 0]} />
      </React.Fragment>
    );
  },
  function ( val )
  {
    // actually go forward
    return val.execute();
  },
  function ( val )
  {
    return `fd ${val ? val.display() : "(undefined)"}`;
  },
  "move forward",
);

export const statementTree =
  {
    forwardFactory: rhoForwardFunctionFactory,
  };

export const funcChoiceTree = [rhoAddFunctionFactory, rhoConstantFunctionFactory];