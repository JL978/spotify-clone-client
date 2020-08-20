import React, {useContext} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import HomePage from '../pages-components/HomePage'
import SearchPage from '../pages-components/SearchPage'
import GenrePage from '../pages-components/GenrePage'
import PlayListPage from '../pages-components/PlayListPage'
import AlbumPage from '../pages-components/AlbumPage'
import UserPage from '../pages-components/UserPage'
import ArtistPage from '../pages-components/ArtistPage'
import CollectionPage from '../pages-components/CollectionPage'
import LikePage from '../pages-components/LikePage'

import ReactToolTip from 'react-tooltip'
import generateContent from '../../utilities/TipContent'
import {LoginContext} from '../../utilities/context'

export default function PageContent({query, playlists, refreshPlaylist, message, status}) {
    const loggedIn = useContext(LoginContext)

    return (
        <>
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route path={`/search`}>
                <SearchPage query={query}/>
            </Route>
            <Route path='/genre'>
                <GenrePage />
            </Route>
            <Route path='/playlist'>
                <PlayListPage playlists={playlists} refreshPlaylist={refreshPlaylist} />
            </Route>
            <Route path='/album' >
                <AlbumPage />
            </Route>
            <Route path='/user' >
                <UserPage />
            </Route>
            <Route path='/artist' >
                <ArtistPage />
            </Route>
            <Route path='/collection'>
                {loggedIn ? <Redirect to='/collection/playlist'/>:<Redirect to='/'/>}
                <CollectionPage playlists={playlists}/>
            </Route>
            <Route path='/tracks'>
                {loggedIn ? <LikePage />:<Redirect to='/'/>}
            </Route>
        </Switch>
        <div className={`status-bar-wrapper ${status? 'active':''}`}>
            <div className={`status-bar ${status? 'active':''}`}>{message}</div>
        </div>
        <ReactToolTip className='toolTip ttMain' id='tooltipMain' disable={loggedIn} place='bottom' effect='solid'  backgroundColor= '#2e77d0' globalEventOff='click' getContent={dataTip => generateContent(dataTip)} clickable={true}/>
        </>
    )
}
