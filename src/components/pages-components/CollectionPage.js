import React, {useState, useEffect, useContext} from 'react';
import {Route} from 'react-router-dom'
import axios from 'axios'

import CollectionRow from '../featured-components/CollectionRow'

import {TokenContext} from '../../utilities/context'
import reqWithToken from '../../utilities/reqWithToken'

const CollectionPage = ({playlists}) => {
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])

    const token = useContext(TokenContext)

    useEffect(() => {
        if (token) {
            const cancelSource = axios.CancelToken.source()

            const makeRequests = async () => {
                const requestArtist = reqWithToken('https://api.spotify.com/v1/me/following?type=artist', token, cancelSource)
                const requestAlbum = reqWithToken('https://api.spotify.com/v1/me/albums', token, cancelSource)

                const [_artists, _albums] = await Promise.all([requestArtist(), requestAlbum()])
                setArtists(_artists.data.artists.items)
                setAlbums(_albums.data.items)
            }

            makeRequests()

            return () => cancelSource.cancel()
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div className='page-content' style={{paddingTop:'16px'}}>
            <Route exact path='/collection/playlist'>
                <CollectionRow name='Playlists' playlists={playlists}/>
            </Route>
            <Route exact path='/collection/artist'>
                <CollectionRow name='Artists' playlists={artists}/>
            </Route>
            <Route exact path='/collection/album'>
                <CollectionRow name='Albums' playlists={albums}/>
            </Route>
        </div>
    );
}


export default CollectionPage;
