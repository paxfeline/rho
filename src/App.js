import React, { useState } from 'react';
import Logo from './components/Logo';
import LogoExpressionComposer from './components/LogoExpressionComposer';
import './App.css';

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
      <LogoExpressionComposer logoFunc={logoFunc} setFuncCallback={setFromPath} path={[]} />
      {/*<Logo />*/}
    </div>
  );
}

export default App;
