import React, { useState, useEffect, useRef, useContext } from 'react';
import RhoStatementConsole from './RhoStatementConsole';

let uid = 0;

function uidGenerator()
{    
    return (++uid);
}

const MODE =
    {
        edit: 'edit',
        add: 'add',
        neutral: 'neutral'
    };

function RhoStatementList( {} )
{
    const [mode, setMode] = useState( MODE.neutral );
    const [editIndex, setEditIndex] = useState( null );
    const [list, setList] = useState( [] );

    const [key, setKey] = useState( uidGenerator() );

    const saveRhoFunc =
        rhoFunc =>
        {
            if ( rhoFunc !== null )
            {
                if ( mode === MODE.edit )
                {
                    const newList = [...list];
                    newList[ editIndex ] = rhoFunc;
                    setList( newList );
                }
                else if ( mode === MODE.add )
                {
                    const newList = [...list, rhoFunc];
                    setList( newList );
                }
            }
            setMode( MODE.neutral );
            setKey( uidGenerator() );
        }
    
    return (
        <div>
            {  
                list
                ?
                    list.map(
                        (func, index) =>
                        (
                            <div
                                key={index}
                                onClick={() => { setMode( MODE.edit ); setEditIndex(index); setKey( uidGenerator() ); }}>
                                {func.display()}
                            </div>
                        )
                    )
                :
                    null
            }
            <input type="button" value="add" onClick={() => { setMode( MODE.add ); setKey( uidGenerator() ); }} />
            <RhoStatementConsole
                saveRhoFunc={mode !== MODE.neutral ? saveRhoFunc : null}
                inRhoFunc={mode === MODE.edit ? list[editIndex] : null}
                key={key}
            />
        </div>
    )
}

export default RhoStatementList;