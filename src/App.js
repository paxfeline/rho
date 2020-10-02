import React, { useState } from 'react';
import Logo from './components/Logo';
import LogoExpressionComposer from './components/LogoExpressionComposer';
import './App.css';

export const SetFuncFromPathContext = React.createContext(null);

function App()
{
  const [logoFunc, setLogoFunc] = useState(null);

  const setFromPath =
    function ( path, logoFuncToSet )
    {
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

        setLogoFunc( root );
      }
    };

  return (
    <div>
      Compose expression:<br />
      <SetFuncFromPathContext.Provider value={setFromPath}>
        <LogoExpressionComposer logoFunc={logoFunc} path={[]} />
      </SetFuncFromPathContext.Provider>
      <br />
      <input type="button" onClick={() => alert( logoFunc.execute() )} value="execute" />
      {/*<Logo />*/}
    </div>
  );
}

export default App;
