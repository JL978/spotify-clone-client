import React, {useContext} from 'react'
import Icon from '../icons'
import {LoginContext, PlayContext} from '../../utilities/context'

export default function PlayListFunctions({type, follow, onFollow, setMessage, playContext}) {
    const loggedIn = useContext(LoginContext)

    switch (type) {
        case 'playOnly':
            return (
                <div className="playListFunctions">
                    <PlayButtonLarge loggedIn={loggedIn} playContext={playContext}/>
                </div>
            )
        case 'none':
            return (
                <div className="playListFunctions">
                    <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')}/>
                </div>
            )
        case 'user':
            return (
                <div className="playListFunctions">
                    <FollowButton follow={follow} onFollow={onFollow} loggedIn={loggedIn}/>
                    <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')}/>
                </div>
                    
            )
        case 'artist':
            return (
                <div className="playListFunctions">
                    <PlayButtonLarge loggedIn={loggedIn} playContext={playContext}/>
                    <FollowButton follow={follow} onFollow={onFollow} loggedIn={loggedIn}/>
                    <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')}/>
                </div>
            )
        default:
            return (
                <div className="playListFunctions">
                    <PlayButtonLarge loggedIn={loggedIn} playContext={playContext}/>
                    <LikeButton follow={follow} onFollow={onFollow} loggedIn={loggedIn}/>
                    <MoreButton onClick={() => setMessage('Oops, it look like I chose not to implement this feature :)')}/>
                </div>
            )
    }
}


function PlayButtonLarge({loggedIn, playContext}){
    const updatePlayer = useContext(PlayContext)
    if (loggedIn){
        return (
            <button className="playButton no-outline" title="Play" onClick={() => {
                playContext()
                setTimeout(() => updatePlayer(), 500)
            }}>
                <Icon name="Play" height='28' width='28'/>
            </button>
        )
    }else{
        return (
            <button className="playButton no-outline" title="Play" data-tip='play' data-for='tooltipMain' data-event='click' >
                <Icon name="Play" height='28' width='28'/>
            </button>
        )
    }
    
}

function LikeButton({follow, onFollow, loggedIn}){
    if (loggedIn){
        return (
            <button className={`likeButton ${follow? 'noHover':''} no-outline`} style={{color: follow? 'var(--spotify-green)':null}} title={follow? 'Remove from Library':"Save to Your Library"} onClick={onFollow}>
                <Icon name='Heart' fill={follow}/>
            </button>
        )
    }else{
        return (
            <button className="likeButton no-outline" title="Save to Your Library" data-tip='like' data-for='tooltipMain' data-event='click'>
                <Icon name='Heart' fill={follow}/>
            </button>
        )
    }
}

function FollowButton({follow, onFollow, loggedIn}){
    if (loggedIn){
        return (
            <button className="followButton no-outline" onClick={onFollow}>{follow? 'following':'follow'}</button>
        )
    }else{
        return (
            <button className="followButton no-outline" data-tip='follow' data-for='tooltipMain' data-event='click' onClick={() => console.log('hi')}>{follow? 'following':'follow'}</button>
        )
    }
    
}

function MoreButton({onClick}){
    return (
        <button className="moreButton no-outline" title="More" onClick={onClick}>• • •</button>
    )
}