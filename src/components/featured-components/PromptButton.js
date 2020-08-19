import React from 'react'

function switchStyle(style){
    switch(style){
        case 'dark':
            return darkStyle
        case 'light':
            return lightStyle
        case 'CTA':
            return ctaStyle
        default:
            return null
    }
}
const darkStyle = {
    backgroundColor: 'transparent',
    color: '#fff'
}


const lightStyle = {
    backgroundColor: '#fff',
    color: '#181818'
}


const ctaStyle ={
    margin: '8px 0 12px',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    color: '#2e77d0',
    padding: '8px 48px'
}

export default function PromptButton({to, name, styleName, onClick}) {
    return (
        to? 
        <a href={to}>
            <button className="PromptButton no-outline" name={name} style={switchStyle(styleName)} >{name}</button>
        </a>
            :
        <button className="PromptButton no-outline" name={name} style={switchStyle(styleName)} onClick={onClick}>{name}</button>
    )
}
