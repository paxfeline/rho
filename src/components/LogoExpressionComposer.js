import React, { useState, useEffect, useRef } from 'react';
import { funcChoiceTree } from '../LogoFunctions'

function LogoExpressionComposer( props )
{
    const [logoFunc, setLogoFunc] = useState(null);

    console.log( props, "props!" );
    console.log( logoFunc ? logoFunc.render : null, "if you can!" );

    return (
        logoFunc === null
        ?
            <div className="LECblock">
                <form onChange={ e => setLogoFunc( funcChoiceTree.find( f => f.logoName == e.target.value ) ) }>
                    <select>
                        <option>select...</option>
                        {
                            funcChoiceTree.map(
                                lf => <option value={ lf.logoName }>{ lf.logoName }</option>
                            )
                        }
                    </select>
                </form>
            </div>
        :
            <logoFunc.render
                LECCallback={ LogoExpressionComposer }
                args={ logoFunc.args }
                closeBtn={<div className="LECCloseBtn" onClick={ () => setLogoFunc( null ) }>X</div>} />
    );
}

export default LogoExpressionComposer;
