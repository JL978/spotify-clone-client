import React from 'react'
import Icon from '../icons'

export default function ControlButton({title, icon, size, active, extraClass, onClick}) {
    return (
        <button title={title} className={`control-button ${size && size} ${active? 'active':''} ${extraClass&&extraClass} no-outline`} onClick={onClick}>
            <Icon name={icon}/>
        </button>
    )
}
