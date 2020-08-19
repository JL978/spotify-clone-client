import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'


import PageBanner from '../featured-components/PageBanner'
import PlayListFunctions from '../featured-components/PlayListFunctions'
import TrackList from '../featured-components/TrackList'
import Loading from '../featured-components/Loading'

import useId from '../../utilities/hooks/useId'
import useInfiScroll from '../../utilities/hooks/useInfiScroll'
import {TokenContext, MessageContext, PlayContext} from '../../utilities/context'
import putWithToken from '../../utilities/putWithToken'
import makeAxiosRequest from '../../utilities/makeAxiosRequest'

export default function AlbumPage() {
    const id = useId()
    const token = useContext(TokenContext)
    const setMessage = useContext(MessageContext)
    const updatePlayer = useContext(PlayContext)
    const [loading, setLoading] = useState(true)

    const highlight = useHighlight()

    const [bannerInfo, setbannerInfo] = useState({
        album_type: '',
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: [],
        release_date: ''
    })

    const [tracks, setTracks] = useState([])
    const [uri, setUri] = useState('')
    const [setNext, lastRef] = useInfiScroll(setTracks)
    const source = axios.CancelToken.source()

    useEffect(() => {
        setTracks([])
        setNext(null)
        setbannerInfo({
            album_type: '',
            name: '',
            description: '',
            user: [],
            followers: 0,
            primary_color: '#262626',
            images: [],
            release_date: ''
        })
        setUri('')
        setLoading(true)
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/albums/${id}`)
        if(id){
            makeRequest()
            .then((data) => {
                const {album_type, name, artists, primary_color, tracks, images, release_date, uri} = data
                setbannerInfo(bannerInfo => ({...bannerInfo, album_type, name, user:artists, primary_color, images, release_date}))
                setTracks(tracks.items)
                setNext(tracks.next)
                setUri(uri)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                setMessage(`ERROR: ${error}`)
            })
        }
        
        
        return () => source.cancel()
    // eslint-disable-next-line
    }, [id])

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
            <PageBanner pageTitle={bannerInfo.album_type} bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions onFollow={() => setMessage('Oops looks like the Spotify API does not support following albums')} setMessage={setMessage} playContext={playContext}/>
                <div className="page-content">
                    <TrackList ref={lastRef} tracks={tracks} highlight={highlight} playContextTrack={playContextTrack}/>
                </div>
            </div>
        </div>
    )
}


function useHighlight(){
    return new URLSearchParams(useLocation().search).get('highlight')
}