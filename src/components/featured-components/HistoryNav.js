import React from 'react'
import NavButton from './NavButton'

export default function HistoryNav() {
    return (
        <div className='HistoryNav'>
            <NavButton property='Back'/>
            <NavButton property='Forward'/>
        </div>
    )
}
