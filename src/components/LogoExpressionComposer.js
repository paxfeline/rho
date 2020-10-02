import React, { useState, useEffect, useRef } from 'react';
import { funcChoiceTree } from '../LogoFunctions'

function LogoExpressionComposer( { logoFunc, setFuncCallback, path } )
{
    const block = useRef();

    console.log( logoFunc, logoFunc?.render, logoFunc?.args );

    return (
        logoFunc === null || logoFunc === undefined
        ?
            <form onChange={ e => setFuncCallback( path, funcChoiceTree.find( f => f.logoName == e.target.value )() ) }>
                <select>
                    <option>...</option>
                    {
                        funcChoiceTree.map(
                            lf => <option value={ lf.logoName }>{ lf.logoName }</option>
                        )
                    }
                </select>
            </form>
        :
            <div className="LECBlock" ref={block} path={path}>
                <logoFunc.render
                    logoFunc={logoFunc}
                    setFuncCallback={setFuncCallback}
                    path={path}
                    args={ logoFunc.args /* should be 'defaults' instead */ } />
                <div
                    className="LECCloseBtn"
                    onClick={ () => setFuncCallback( path, null ) }
                    onMouseOver={ () => block.current.style.background = 'pink' }
                    onMouseOut={ () => block.current.style.background = 'initial' }
                >X</div>
            </div>
    );
}

export default LogoExpressionComposer;
