import React, { useEffect, useState } from 'react';
import Turtle from './components/Turtle';
import './App.css';
import RhoStatementConsole from './components/RhoStatementConsole';

function App()
{
  return (
    <div>
      <RhoStatementConsole />
      {/*
      Compose expression:<br />
      <SetFuncFromPathContext.Provider value={setFunctionFromPath}>
        <RhoExpressionComposer rhoFunc={rhoFunc} path={[]} />
      </SetFuncFromPathContext.Provider>
      <br />
      <input type="button" onClick={() => alert( rhoFunc.execute() )} value="execute" />
      <div>
        {rhoFunc ? rhoFunc.display() : null}
      </div>
      */}
      {/*<Turtle />*/}
    </div>
  );
}

export default App;
