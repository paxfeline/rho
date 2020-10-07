import React, { useState, useEffect, useRef, useContext } from 'react';
import { statementTree, rhoConstantFunctionFactory } from '../utils/RhoFunctions'
import RhoExpressionComposer from './RhoExpressionComposer';
import RhoSimpleConstant from './RhoSimpleConstant';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import 'react-tabs/style/react-tabs.css';

let uid = 0;

function uidGenerator()
{    
    return (++uid);
}

export const SetFuncFromPathContext = React.createContext(null);

function RhoStatementConsole( {} )
{
    const [cmdMode, setCmdMode] = useState(1); // 1 = fd/bk/rt/lt/pu/pd, 2 = the rest
    const [inputMode, setInputMode] = useState(1); // 1 = constant, 2 = expression
    const [rhoFunc, setRhoFunc] = useState(null);

    const [key, setKey] = useState( uidGenerator() );

    /* setFunctionFromPath takes a path (down a tree structure),
    and a value to set. It traverses the tree until it finds
    the leaf specified by the path, and then sets the specified
    leaf to the given value.
    The tree in question is composed of functions, and the children
    of each node are the arguments of the given function. */

    /**
     * Sets a value given a path
     * @param {string[]} path
     * @param {Object} rhoFuncToSet
     */
    const setFunctionFromPath =
        function ( path, rhoFuncToSet )
        {
            // empty path means update the root function
            // (in that case, stored in this component's state)
            if ( path.length === 0 )
                setRhoFunc( rhoFuncToSet );
            else
            {
                // copy to new object
                let root = { ...rhoFunc };
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
                cf.args[ path[ path.length - 1 ] ] = rhoFuncToSet;

                /*
                function duplicateChildren( func )
                {
                    for ( let i in func.args )
                    {
                        if ( func.args[ i ] instanceof Object )
                        {
                            func.args[ i ] =  { ...func.args[ i ] };
                            duplicateChildren( func.args[ i ] );
                        }
                    }
                }

                duplicateChildren( rhoFuncToSet );
                */

                // once the new expression tree has been created, update the root function
                setRhoFunc( root );
            }
        };
    
        /*
    useEffect(
        () =>
        {
            if ( rhoFunc && !rhoFunc.args[0] )
                setFunctionFromPath( [0], rhoConstantFunctionFactory() );
        }, [rhoFunc] );
        */
    
        console.log( rhoFunc && rhoFunc.args[0] && rhoFunc.args[0].rhoName );

    return (
        <div class="RhoStatementConsoleContainer">
            <div class="RhoStatementConsoleLeft">
                <Tabs>
                    <TabPanel>
                        <div class="container">

                            <div class="row">
                                <div class={`ostar first ${rhoFunc && rhoFunc.rhoName === 'move forward' ? 'bgblue' : ''}`}
                                    onClick={
                                        ()=> {
                                            const fwdFunc = statementTree.forwardFactory();
                                            fwdFunc.args[0] = rhoConstantFunctionFactory()
                                            setRhoFunc( fwdFunc );
                                            //setKey( uidGenerator() );
                                        } }></div>
                                <div class="ostar second"></div>
                                </div>
                            <div class="row">
                                <div class="ostar third"></div>
                                <div class="ostar fourth"></div>
                            </div>

                            <div class="inner-top"></div>
                            <div class="inner-bottom"></div>

                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div style={{height: '20em'}}>
                            MODE B
                        </div>
                    </TabPanel>
                    <TabList id="mode_list">
                        <Tab>MODE A</Tab>
                        <Tab>MODE B</Tab>
                    </TabList>
                </Tabs>
            </div>

            <div class="RhoStatementConsoleRight1">
                {rhoFunc ? rhoFunc.display() : null}
            </div>

            <div class="RhoStatementConsoleRight2">
                <SetFuncFromPathContext.Provider value={setFunctionFromPath}>
                {
                    rhoFunc
                    ?
                        <Tabs>
                            <TabPanel>
                                <div id='statement_expression'>
                                    <RhoSimpleConstant rhoFunc={rhoFunc.args[0]} path={[0]} key={key} />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div id='statement_expression'>
                                    <RhoExpressionComposer rhoFunc={rhoFunc.args[0]} path={[0]} key={key} />
                                </div>
                            </TabPanel>
                            <TabList id="type_list">
                                <Tab disabled={ !(rhoFunc && rhoFunc.args[0] && rhoFunc.args[0].rhoName === 'constant value') }>CONST</Tab>
                                <Tab>EXPR</Tab>
                            </TabList>
                        </Tabs>
                    :
                        null
                }
                </SetFuncFromPathContext.Provider>
            </div>
        </div>
    )
}

export default RhoStatementConsole;