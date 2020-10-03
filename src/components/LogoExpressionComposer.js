import React, { useState, useEffect, useRef, useContext } from 'react';
import { funcChoiceTree } from '../LogoFunctions'
import { SetFuncFromPathContext } from '../App';

/* This component displays a function selection menu at first.
    Once a function is selected, this component then displays
    its composition interface. The function's render method
    can be treated as a component to do this.
    
    Rather than storing state information locally, the props
    are used to get and set the function being represented by
    this LogoExpressionComposer component.
    logoFunc is the function.
    setFuncCallback and path are used in order to set the function.
    path tells the setFuncCallback where in the expression tree
    this function goes.
    
    As sub-components are rendered deeper into the expression tree,
    their paths get passed to them, calculated by taking the current
    path and appending the appropriate index. Look at the render
    method of a logo function to see an example. */

function LogoExpressionComposer( { logoFunc, path } )
{
    // The block ref is used to turn the function's composition interface pink when the X is hovered over
    const block = useRef();

    console.log( logoFunc, logoFunc?.render, logoFunc?.args );

    const setFuncCallback = useContext(SetFuncFromPathContext);

    return (
        logoFunc === null || logoFunc === undefined
        ?
            // if the function hasn't been set, display the selection menu
            // onChange determine what function was selected and calls setFuncCallback
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
            // if the function has been set, display its composition interface
            // default args are only used for certain functions (like constants).
            // the next div is an X button which will reset this LEC's function to null
            // (which will re-display the selection interface (above))
            <div className="LECBlock" ref={block} path={path}>
                <logoFunc.render
                    logoFunc={logoFunc}
                    path={path}
                    defaultArgs={ logoFunc.args } />
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
