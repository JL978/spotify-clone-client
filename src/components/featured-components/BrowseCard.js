import React from 'react'

export default function BrowseCard({info}) {
    const {icons, name, id} = info
    const img_link = icons[0].url
    return (
        <div className="browseLinkContainer">
            <a href={`/genre/${id}`} className='browseLink'>
                    <h3 style={titleStyle}>{name}</h3>
                    <div style={overlayStyle}></div>
                    <img loading="lazy" src={img_link} alt="" style={{width:'100%'}}/>
            </a>
        </div>
    )
}


const titleStyle = {
    fontSize: '24px',
    padding: '16px',
    lineHeight: '1.3em',
    letterSpacing: '-.04em',
    overflowWrap: 'break-word',
    position: 'absolute',
    zIndex: '1',
    bottom:'0',
    textAlign: 'left',
    margin: 'auto',
    hyphens: 'auto'
}

const overlayStyle = {
    background: 'linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.4))',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height:'100%'    
}