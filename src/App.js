import React, { useEffect, useState } from 'react';
import Logo from './components/Logo';
import LogoExpressionComposer from './components/LogoExpressionComposer';
import './App.css';

export const SetFuncFromPathContext = React.createContext(null);

function App()
{
  const [logoFunc, setLogoFunc] = useState(null);

  /* setFunctionFromPath takes a path (down a tree structure),
    and a value to set. It traverses the tree until it finds
    the leaf specified by the path, and then sets the specified
    leaf to the given value.
    The tree in question is composed of functions, and the children
    of each node are the arguments of the given function. */
  const setFunctionFromPath =
    function ( path, logoFuncToSet )
    {
      // empty path means update the root function
      // (in that case, stored in this component's state)
      if ( path.length === 0 )
        setLogoFunc( logoFuncToSet );
      else
      {
        // copy to new object
        let root = { ...logoFunc };
        let cf = root;
        let prev = cf;

        // follow to the penultimate link
        for ( let i = 0; i < path.length - 1; i++ )
        {
          let index = path[i];
          // duplicate each link (so that all the corresponding components update)
          cf = { ...cf.args[ index ] };
          prev.args[ index ] = cf; // update prev links args
          prev = cf;
        }

        // set the last link
        cf.args = [ ...cf.args ];
        cf.args[ path[ path.length - 1 ] ] = logoFuncToSet;

        // once the new expression tree has been created, update the root function
        setLogoFunc( root );
      }
    };

  return (
    <div>
      Compose expression:<br />
      <SetFuncFromPathContext.Provider value={setFunctionFromPath}>
        <LogoExpressionComposer logoFunc={logoFunc} path={[]} />
      </SetFuncFromPathContext.Provider>
      <br />
      <input type="button" onClick={() => alert( logoFunc.execute() )} value="execute" />
      <div>
        {logoFunc ? logoFunc.display() : null}
      </div>
      {/*<Logo />*/}
    </div>
  );
}

export default App;
