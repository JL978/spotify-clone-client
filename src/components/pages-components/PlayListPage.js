import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'

import PageBanner from '../featured-components/PageBanner'
import PlayListFunctions from '../featured-components/PlayListFunctions'
import TrackList from '../featured-components/TrackList'
import Loading from '../featured-components/Loading'

import makeAxiosRequest from '../../utilities/makeAxiosRequest'
import {TokenContext, LoginContext, MessageContext, PlayContext} from '../../utilities/context'
import useId from '../../utilities/hooks/useId'
import useInfiScroll from '../../utilities/hooks/useInfiScroll'
import putWithToken from '../../utilities/putWithToken'

export default function PlayListPage({playlists, refreshPlaylist}) {
    const id = useId('playlist')
    const loggedIn = useContext(LoginContext)
    const token = useContext(TokenContext)
    const setMessage = useContext(MessageContext)
    const updatePlayer = useContext(PlayContext)

    const [loading, setLoading] = useState(true)

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: [],
    })
    const [tracks, setTracks] = useState([])
    const [like, setLike] = useState(false)
    const [setNext, lastRef] = useInfiScroll(setTracks)
    const [uri, setUri] = useState('')
    const source = axios.CancelToken.source()

    useEffect(() => {
        setLike(false)
        setUri('')
        setbannerInfo({
            name: '',
            description: '',
            user: [],
            followers: 0,
            primary_color: '#262626',
            images: [], 
        })
        setTracks([])
        setLoading(true)

        const [playSource, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/playlists/${id}`)

        if (id){
            makeRequest()
            .then((data) => {
                const {name, description, owner, followers, primary_color, tracks, images, uri} = data
                setbannerInfo(bannerInfo => ({...bannerInfo, name, description, user:[owner], followers, primary_color, images}))
                setTracks(tracks.items.map((track) => track.track))
                setNext(tracks.next)
                setUri(uri)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setMessage(`ERROR: ${error}`)
            })
        }
        
        
        if (loggedIn && id){
            const playlistIds = playlists.map((playlist) => {
                return playlist.id
            })
            if (playlistIds.includes(id)){
                setLike(true)
            }
        }

        return () => {
            playSource.cancel()
            source.cancel()
        }
    // eslint-disable-next-line
    }, [id, loggedIn])

    const followPlaylist = () => {
        const followReq = putWithToken(`https://api.spotify.com/v1/playlists/${id}/followers`, token, source, {}, like?'DELETE':'PUT')
        followReq()
            .then(response => {
                if (response.status === 200){
                    if(like){
                        setMessage('Removed from your Library')
                    }else{
                        setMessage('Added to your Library')
                    }
                    setLike(!like)
                    setTimeout(() => refreshPlaylist(), 1000)
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    const playContext = () => {
        const body = {
            context_uri: uri
        }
        const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body)
        request()
            .then(response => {
                if (response.status === 204){
                    setTimeout(() => updatePlayer(), 500)
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    const playContextTrack = (trackUri) => {
        const body = {
            context_uri: uri,
            offset: {uri: trackUri}
        }
        const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body)
        request()
            .then(response => {
                if (response.status === 204){
                    setTimeout(() => updatePlayer(), 500)
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    return (
        loading? 
        <Loading />
        : 
        <div className='listPage' style={{display: `${tracks.length===0? 'none':'block'}`}}>
            <PageBanner pageTitle='playlist' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions onFollow={followPlaylist} follow={like} setMessage={setMessage} playContext={playContext}/>
                <div className="page-content">
                    <TrackList ref={lastRef} tracks={tracks} playContextTrack={playContextTrack}/>
                </div>
            </div>
        </div>
    )
}
