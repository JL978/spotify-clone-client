import React, {useState, useEffect, useContext, useImperativeHandle, useRef} from 'react';
import axios from 'axios'
import Heartbeat from 'react-heartbeat'

import ProgressBar from './ProgressBar'
import NowPlaying from './NowPlaying'
import ConnectDevices from './ConnectDevices'
import ControlButton from './ControlButton'

import reqWithToken from '../../utilities/reqWithToken'
import msTimeFormat from '../../utilities/utils'
import putWithToken from '../../utilities/putWithToken'
import { MessageContext } from '../../utilities/context';

const Player = React.forwardRef(({token}, ref) => {
    const setMessage = useContext(MessageContext)
    const [playbackState, setPlaybackState] = useState({
        play: false,
        shuffle: false,
        repeat: false,
        progress: 0,
        total_time: 0
    })

    const [scrubPb, setScrubPb] = useState(null)
    const [playback, setPlayback] = useState(0)
    const [volume, setVolume] = useState(1)
    const [connectTip, setConnectTip] = useState(false)
    const [playInfo, setPlayInfo] = useState({
        album: {}, 
        artists: [], 
        name: '', 
        id: ''
    })

    const timerRef = useRef(null)

    useEffect(() => {
        updateState()
        const tipAccess = localStorage.getItem('tipAccess')
        if (!tipAccess){
            localStorage.setItem('tipAccess', 'true')
            setConnectTip(true)
        }
        return () => {
            source.cancel()
            clearTimeout(timerRef.current)
        }
    // eslint-disable-next-line
    }, [])


    const updateState = () => {
        if (timerRef.current){
            clearTimeout(timerRef.current)
        }
        const requestInfo = reqWithToken('https://api.spotify.com/v1/me/player', token, source)
        requestInfo()
            .then(response => {
                if (response.status === 200){
                    const {repeat_state, shuffle_state, is_playing, progress_ms, item, device} = response.data
                    setPlayback(progress_ms/item.duration_ms)
                    timerRef.current = setTimeout(()=> updateState(), item.duration_ms - progress_ms + 10)
                    setVolume(device.volume_percent/100)
                    setPlaybackState(state => ({...state, play: is_playing, shuffle: shuffle_state, repeat: repeat_state !== 'off', progress:progress_ms, total_time: item.duration_ms}))
                    setPlayInfo(item)
                }else if (response.status === 204){
                    setMessage('Please login to an official Spotify app and/or start playing to use the player')
                    setConnectTip(true)
                }else{
                    setMessage(`ERROR: server response with ${response}. Player feature is unavailable!`)
                }
            })
            .catch(error => console.log(error))
    }

    useImperativeHandle(ref, () =>({
        updateState: () => {
            setPlaybackState(state => ({...state, play:true}))
            updateState()
        }
    }))

    const updatePlayback = () => {
        const interval = 500/playbackState.total_time
        setPlayback(playback => (playback + interval))
        setPlaybackState(state => ({...state, progress: state.progress+500}))
    }

    const source = axios.CancelToken.source()

    const togglePlay = () => {
        if (playbackState.play){
            const request = putWithToken('https://api.spotify.com/v1/me/player/pause', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, play: false}))
                        updateState()
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response}`)
                    }
                }) 
                .catch(error => setMessage(`ERROR: ${error}`))
        }else{
            const request = putWithToken('https://api.spotify.com/v1/me/player/play', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, play: true}))
                        updateState()
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response}`)
                    }
                }) 
                .catch(error => setMessage(`ERROR: ${error}`))
        }
        updateState()
    }

    const toggleShuffle = () => {
        if (playbackState.shuffle){
            const request = putWithToken('https://api.spotify.com/v1/me/player/shuffle?state=false', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, shuffle: false}))
                        updateState()
                        setMessage('Shuffle Off')
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                    }
                }) 
                .catch(error => setMessage(`ERROR: ${error}`))
        }else{
            const request = putWithToken('https://api.spotify.com/v1/me/player/shuffle?state=true', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, shuffle: true}))
                        updateState()
                        setMessage('Shuffle Off')
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                    }
                }) 
                .catch(error => setMessage(`ERROR: ${error}`))
        }
    }

    const toggleRepeat = () => {
        if (playbackState.repeat){
            const request = putWithToken('https://api.spotify.com/v1/me/player/repeat?state=off', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, repeat: false}))
                        updateState()
                        setMessage('Repeat Track Off')
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                    }
                }) 
                .catch(error => setMessage(`ERROR: ${error}`))
        }else{
            const request = putWithToken('https://api.spotify.com/v1/me/player/repeat?state=track', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, repeat: true}))
                        updateState()
                        setMessage('Repeat Track On')
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                    }
                }) 
                .catch(error => setMessage(`ERROR: ${error}`))
        }
        
    }

    const skipNext = () => {
        const request = putWithToken('https://api.spotify.com/v1/me/player/next', token, source, {}, 'POST')
        request()
            .then(response => {
                if (response.status === 204){
                    updateState()
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            }) 
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    const skipPrev = () => {
        const request = putWithToken('https://api.spotify.com/v1/me/player/previous', token, source, {}, 'POST')
        request()
            .then(response => {
                if (response.status === 204){
                    updateState()
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            }) 
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    const seekPlayback = (ratio) => {
        const time = Math.round(ratio * playbackState.total_time)
        const request = putWithToken(`https://api.spotify.com/v1/me/player/seek?position_ms=${time}`, token, source, {})
        request()
            .then(response => {
                if (response.status === 204){
                    setPlayback(ratio)
                    setPlaybackState(state => ({...state, progress_ms: time}))
                    updateState()
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            }) 
            .catch(error => setMessage(`ERROR: ${error}`))
        
        setScrubPb(null)
    }

    const scrubPlayback = (ratio) => {
        const time = ratio * playbackState.total_time
        setScrubPb(time)
    }

    const seekVolume = (ratio) => {
        const integer = Math.round(ratio * 100)
        const request = putWithToken(`https://api.spotify.com/v1/me/player/volume?volume_percent=${integer}`, token, source, null)
        request()
            .then(response => {
                if (response.status === 204){
                    setVolume(ratio)
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            }) 
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    return (
        <>
        {/* {playbackState.play ? null:<Heartbeat heartbeatFunction={updateState} heartbeatInterval={10000}/>} */}
        {playbackState.play ? <Heartbeat heartbeatFunction={updatePlayback} heartbeatInterval={500}/>:null}
        <div className='player'>

            <div className="player-left">
                <NowPlaying playInfo={playInfo}/>
            </div>

            <div className="player-center">
                <div className="player-control-buttons">
                    <ControlButton title='Toggle Shuffle' icon='Shuffle' active={playbackState.shuffle} onClick={toggleShuffle} /> 
                    <ControlButton title='Previous' icon='TrackBack' size='x-smaller' onClick={skipPrev}/> 
                    <ControlButton 
                        title={playbackState.play ? 'Pause':'Play'} 
                        icon={playbackState.play ? 'Pause':'Play'} 
                        size={playbackState.play? 'smaller':'larger'} 
                        extraClass='circle-border'
                        onClick={togglePlay}/> 
                    <ControlButton title='Next' icon='TrackNext' size='x-smaller' onClick={skipNext}/> 
                    <ControlButton title='Toggle Repeat' icon='Repeat' active={playbackState.repeat} onClick={toggleRepeat} /> 
                </div>

                <div className="player-playback" draggable='false'>
                    <div className="playback-time" draggable='false'>{scrubPb? msTimeFormat(scrubPb) : msTimeFormat(playbackState.progress)}</div>
                    <ProgressBar extraClass='playback' value={playback} engageClass='engage' setValue={(ratio) => seekPlayback(ratio)} scrubFunction={scrubPlayback}/> 
                    <div className="playback-time" draggable='false'>{msTimeFormat(playbackState.total_time)}</div>
                </div>
            </div>

            <div className="player-right">
                <div className="extra-controls">
                    <span className='connect-devices-wrapper'>
                        {connectTip && <ConnectDevices token={token} closeTip={() => setConnectTip(false)}/>}
                        <ControlButton title='Devices' icon='Speaker' size='x-larger' onClick={() => setConnectTip(!connectTip)} active={playbackState.play}/> 
                    </span>
                    
                    <div className="volume-control">
                        <ControlButton title='Volume' icon='Volume' size='x-larger' extraClass='volume'/> 
                        <div style={{width:'100%'}}>
                            <ProgressBar extraClass='volume' value={volume} engageClass='engage' setValue={(ratio) => seekVolume(ratio)}/> 
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    );
})

export default Player;
