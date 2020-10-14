import React, { useEffect, useState } from 'react';
import Turtle from './components/Turtle';
import './App.css';
import RhoStatementList from './components/RhoStatementList';

function App()
{
  return (
    <div>
      <RhoStatementList />
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
