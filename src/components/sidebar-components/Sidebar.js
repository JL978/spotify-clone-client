import React, {useContext} from 'react';
import ReactToolTip from 'react-tooltip'

import generateContent from '../../utilities/TipContent'
import {LoginContext} from '../../utilities/context'

//The main sticky left-hand side bar in the app
function Sidebar({children}) {
    const loggedIn = useContext(LoginContext)
    return (
        <>
        <div className="sidebar">
            {children}
        </div>
        <ReactToolTip className='toolTip' id='tooltip' disable={loggedIn} place='right' effect='solid' globalEventOff='click' backgroundColor= '#2e77d0' getContent={dataTip => generateContent(dataTip)} clickable={true}/>
        </>
    );
}

export default Sidebar;
