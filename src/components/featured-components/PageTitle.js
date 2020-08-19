import React from 'react'

export default function PageTitle({name}) {
    return (
        <div className='PageTitle'>
            <h1 style={style}>{name}</h1>
        </div>
    )
}

const style = {
    fontSize: '24px',
    fontSeight: '700',
    lineHeight: '28px',
    letterSpacing: '-.04em',
    textTransform: 'none',
    color: '#fff'
}