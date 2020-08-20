import React from 'react'
import PromptButton from '../components/featured-components/PromptButton'
import ReactToolTip from 'react-tooltip'

export default function generateContent(dataTip){
    ReactToolTip.rebuild()
    switch(dataTip){
        case 'create':
            return <TipContent title='Create a playlist' tip='Log in to create and share playlists.'/>
        case 'list':
            return <TipContent title='Enjoy your Liked Songs' tip="Log in to see all the songs you've liked in one easy playlist."/>
        case 'library':
            return <TipContent title='Enjoy Your Library' tip="Log in to see saved songs, podcasts, artists, and playlists in Your Library."/>
        case 'play':
            return <TipContent title='Log in to listen' tip="Due to limitations in the spotify playback api, log in to your PREMIUM account to listen"/>
        case 'like':
            return <TipContent title='Save for later' tip="Log in to save this playlist to Your Library."/>
        case 'follow':
            return <TipContent title='Follow' tip="Log in to follow"/>
        default:
            return null
    }
}


function TipContent({title, tip}){
    return (
        <div className="tipContent">
            <h2>{title}</h2>
            <h3>{tip}</h3>
            <div className="tipOptions">
                <PromptButton name='Not Now' styleName='dark' onClick={() => ReactToolTip.hide()}/>
                <PromptButton to={`${process.env.REACT_APP_BACK_URI}/login`} name='Log In' styleName='light'/>
            </div>
        </div>
    )
}


