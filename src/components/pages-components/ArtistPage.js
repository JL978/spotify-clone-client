import React from 'react'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'

import makeAxiosRequest from '../../utilities/makeAxiosRequest'
import getLocale from '../../utilities/locale'
import useId from '../../utilities/hooks/useId'
import reqWithToken from '../../utilities/reqWithToken'
import putWithToken from '../../utilities/putWithToken'
import {TokenContext, LoginContext, MessageContext, PlayContext} from '../../utilities/context'

import PageBanner from '../featured-components/PageBanner'
import PlayListFunctions from '../featured-components/PlayListFunctions'
import AboutMenu from '../featured-components/AboutMenu'
import Loading from '../featured-components/Loading'

export default function ArtistPage() {
    const id = useId('artist')
    const token = useContext(TokenContext)
    const loggedIn = useContext(LoginContext)
    const setMessage = useContext(MessageContext)
    const [loading, setLoading] = useState(true)
    const setPlay = useContext(PlayContext)

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: 'rgb(83, 83, 83)',
        images: [],
        total: 0
    })

    const [, locale] = getLocale()

    const [tracks, setTracks] = useState([])
    const [album, setAlbum] = useState([])
    const [single, setSingle] = useState([])
    const [appear, setAppear] = useState([])
    const [compilation, setCompilation] = useState([])
    const [related, setRelated] = useState([])
    const [follow, setFollow] = useState(false)
    const [uri, setUri] = useState('')

    const source = axios.CancelToken.source()
    useEffect(() => {
        setTracks([])
        setAlbum([])
        setSingle([])
        setAppear([])
        setCompilation([])
        setRelated([])
        setFollow(false)
        setUri('')
        setLoading(true)
        
        const [artistSource, requestArtist] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}`)
        const [tracksSource, requestTracks] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${locale}`)
        const [albumSource, requestAlbum] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&country=${locale}`)
        const [singleSource, requestSingle] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=single&country=${locale}`)
        const [appearSource, requestAppear] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=appears_on&country=${locale}`)
        const [compilationSource, requestCompilation] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=compilation&country=${locale}`)
        const [relatedSource, requestRelated] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/related-artists`)

        if (loggedIn && id){
            const requestFollow = reqWithToken(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`, token, source)
            requestFollow()
                .then(response => {
                    setFollow(response.data[0])
                })
                .catch(error => console.log(error))
        }
        

        const makeRequest = async ()=> {
            try{
                const [artistData, 
                        tracksData, 
                        albumData, 
                        singleData, 
                        appearData, 
                        compilationData,
                        relatedData] = await Promise.all([requestArtist(), requestTracks(), requestAlbum(), requestSingle(), requestAppear(), requestCompilation(), requestRelated()])
                
                
                const {name, followers, primary_color, images, uri} = artistData
                setbannerInfo(bannerInfo => ({...bannerInfo, name, followers, primary_color, images}))
                setUri(uri)

                const tracks = tracksData.tracks.length > 5? tracksData.tracks.slice(0,5) : tracksData.tracks
                const album = albumData.items
                const single = singleData.items
                const appear = appearData.items
                const compilation = compilationData.items
                const related = relatedData.artists
                
                setTracks((old) => [...old, ...tracks])
                setAlbum((old) => [...old, ...album])
                setSingle((old) => [...old, ...single])
                setAppear((old) => [...old, ...appear])
                setCompilation((old) => [...old, ...compilation])
                setRelated(old => [...old, ...related])
                setLoading(false)
            }catch(error){ 
                console.log(error)
                setLoading(false)
            }   
        }

        if (id){
            makeRequest()
        }
        return () => {
            artistSource.cancel()
            tracksSource.cancel()
            albumSource.cancel()
            singleSource.cancel()
            appearSource.cancel()
            compilationSource.cancel()
            relatedSource.cancel()
            source.cancel()
        }
    // eslint-disable-next-line
    }, [id])

    const followArtist = () => {
        if (loggedIn) {
            const request = putWithToken(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`, token, source, {}, follow? 'DELETE':'PUT')
            request()
                .then(response => {
                    if (response.status === 204){
                        if (follow){
                            setMessage(`Unsaved from your collection`)
                        }else{
                            setMessage(`Saved to your collection`)
                        }
                        setFollow(!follow)
                    }else{
                        setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                    }
                })
                .catch(error => setMessage(`ERROR: ${error}`))
        }
    }

    const playContext = () => {
        const body = {
            context_uri: uri
        }
        const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body)
        request()
            .then(response => {
                if (response.status === 204){
                    setTimeout(() => setPlay(), 500)
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    const playContextTrack = (trackUri) => {
        const body = {
            uris: [trackUri]
        }
        const request = putWithToken(`https://api.spotify.com/v1/me/player/play`, token, source, body)
        request()
            .then(response => {
                if (response.status === 204){
                    setTimeout(() => setPlay(), 500)
                }else{
                    setMessage(`ERROR: Something went wrong! Server response: ${response.status}`)
                }
            })
            .catch(error => setMessage(`ERROR: ${error}`))
    }

    return (
        loading ? 
            <Loading /> 
            : 
            <div className='listPage' style={{display: tracks.length===0? 'none':'block'}}>
                <PageBanner pageTitle='artist' bannerInfo={bannerInfo}/>
                <div className="playListContent">
                    <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                    <PlayListFunctions type='artist' follow={follow} onFollow={followArtist} setMessage={setMessage} playContext={playContext}/>
                    <div className="page-content">
                        <AboutMenu id={id} related = {related} tracks={tracks} album={album} single={single} appear={appear} compilation={compilation} playContextTrack={playContextTrack}/>
                    </div>
                </div>
            </div>
    )
}


