import React, {useState, useEffect, useContext} from 'react'

import CollectionRow from '../featured-components/CollectionRow'

import makeAxiosRequest from '../../utilities/makeAxiosRequest'
import getLocale from '../../utilities/locale'
import { MessageContext } from '../../utilities/context'


export default function HomePage() {
    const setMessage = useContext(MessageContext)
    const [collections, setCollections] = useState([])
    const [temp, setTemp] = useState({})
    const [playlistsMap, setplaylistMap] = useState({})

    
    useEffect(() => {
        const [language, locale] = getLocale()
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories?limit=6&country=${locale}&locale=${language}_${locale}`)
        makeRequest()
            .then((data) => {
                setCollections(data.categories.items)
            })
            .catch((error) => setMessage(`ERROR: ${error}`))
        
        return () => source.cancel()
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        collections.map((collection) => {
            const {name, id} = collection
            var [, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=9`)
            makeRequest()
                .then((data) => {
                    const playlists = data.playlists.items
                    setTemp(temp => ({[name]: {id, playlists}}))
                })
                .catch((error) => setMessage(`ERROR: ${error}`))
            return null
        })
    // eslint-disable-next-line
    }, [collections])


    useEffect(() => {
        setplaylistMap(playlistsMap => ({...playlistsMap, ...temp}))
    // eslint-disable-next-line
    }, [temp])

    return (
        <div className="page-content">
            <div className='pageContent'>
                <CollectionRow name='Uniquely Yours' id={null} playlists={[{id:'', to:'/tracks', description:'', name:'Liked Songs', images:[{url: 'https://misc.scdn.co/liked-songs/liked-songs-300.png'}]}]}/>
                {   
                    Object.entries(playlistsMap).map(([name, info]) => {
                        const {id, playlists} = info
                        return <CollectionRow name={name} key={id} id={id} playlists={playlists}/>
                    })
                }
            </div>
        </div>
    )
}


