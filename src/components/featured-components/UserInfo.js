import React, {useState, useContext} from 'react';
import axios from 'axios'

import {UserContext} from '../../utilities/context'

const UserInfo = () => {
    const [open, setOpen] = useState(false)
    const user = useContext(UserContext)

    const {images, display_name, id} = user

    const toggleOpen = () => {
        setOpen(open => !open)
    }

    const logout = () => {
        axios(`${process.env.REACT_APP_BACK_URI}/logout`, {withCredentials: true})
            .then(response => {
                window.location.reload()
            })
            .catch(error => console.log(error))
    }


    let imgSrc
    if (images && images.length > 0){
        imgSrc = images[0].url
    }

    return (
        <div style={divStyle}>
            <button className='UserInfoButton no-outline' onClick={toggleOpen}>
                <figure style={figureStyle}>
                    <img loading='eager' src={imgSrc} style={imgStyle} alt=''></img>
                </figure>
                <span className='UserInfoSpan mediaNoneXL'>
                    {display_name}
                </span>
                <span style={spanStyle} className='mediaNoneXL'> 
                    {open? <p>&#9650;</p>:<p>&#9660;</p>}
                </span>
            </button>
            <ul className='UserInfoOptions' style={{display: open?'block':'none'}}>
                <li>
                    <a href="https://www.spotify.com/account/?utm_source=play&amp;utm_campaign=wwwredirect" target="_blank" rel="noopener noreferrer">Account</a>
                </li>
                <li>
                    <a href={`/user/${id}`}>Profile</a>
                </li>
                <li>
                    <button onClick={logout}>Log out</button>
                </li>
            </ul>
        </div>
    );
}

const divStyle = {
    position: 'relative',
    whiteSpace: 'nowrap'
}

const figureStyle = {
    width: '28px',
    height: '28px',
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-block'
}

const imgStyle = {
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
}


const spanStyle = {
    marginRight: '6px',
    marginLeft: '8px',
    fontSize: '10px'
}


export default UserInfo;
