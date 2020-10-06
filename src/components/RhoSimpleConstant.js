import React, { useState, useEffect, useRef, useContext } from 'react';
import { rhoConstantFunctionFactory, funcChoiceTree } from '../utils/RhoFunctions'
import { SetFuncFromPathContext } from './RhoStatementConsole';

/* This component displays a function selection menu at first.
    Once a function is selected, this component then displays
    its composition interface. The function's render method
    can be treated as a component to do this.
    
    Rather than storing state information locally, the props
    are used to get and set the function being represented by
    this RhoExpressionComposer component.
    rhoFunc is the function.
    setFuncCallback and path are used in order to set the function.
    path tells the setFuncCallback where in the expression tree
    this function goes.
    
    As sub-components are rendered deeper into the expression tree,
    their paths get passed to them, calculated by taking the current
    path and appending the appropriate index. Look at the render
    method of a rho function to see an example. */

function RhoSimpleConstant( { rhoFunc, path, trigger } )
{
    // The block ref is used to turn the function's composition interface pink when the X is hovered over
    const block = useRef();

    const setFuncCallback = useContext(SetFuncFromPathContext);

    /*
    useEffect(
        () =>
        {
            setFuncCallback( [...path], rhoConstantFunctionFactory() );
    }, [trigger] );
    */

    return (
        rhoFunc
        ?
            <input type='range'
                min='0'
                max='100'
                defaultValue={rhoFunc.args[0]}
                onChange={
                    event =>
                    {
                        setFuncCallback( [...path, 0], event.target.value );
                    }
                }
            />
        :
            null
    );
}

export default RhoSimpleConstant;
