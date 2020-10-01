import React, { useState, useEffect, useRef } from 'react';
import { funcChoiceTree } from '../LogoFunctions'

function LogoExpressionComposer( props )
{
    const [logoFunc, setLogoFunc] = useState(null);

    const block = useRef();

    return (
        logoFunc === null
        ?
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
        :
            <div className="LECBlock" ref={block}>
                <logoFunc.render
                    LECCallback={ LogoExpressionComposer }
                    args={ logoFunc.args }
                    closeBtn={
                        <div
                            className="LECCloseBtn"
                            onClick={ () => setLogoFunc( null ) }
                            onMouseOver={ () => block.current.style.background = 'pink' }
                            onMouseOut={ () => block.current.style.background = 'initial' }
                        >X</div>} />
            </div>
    );
}

export default LogoExpressionComposer;
