import React from 'react'

export default function CardDisplay({url, type}) {
    return (
        <div className="CardDisplay" style={{borderRadius: type ==='artist'?'50%':'0'}}>
            <img src={url} loading='lazy' className='previewImg' style={{borderRadius: type ==='artist'?'50%':'0'}} alt=''></img>
        </div>
    )
}

