import React from 'react';
import {Route} from 'react-router-dom'

import AboutNavItem from './AboutNavItem'
import RowGrid from './RowGrid'
import ArtistRow from './ArtistRow'

const AboutMenu = ({id, related, tracks, album, single, appear, compilation, playContextTrack}) => {
    return (
        <>
            <nav className="menuNav">
                <ul className="menuNavList">
                    <AboutNavItem label='Overview' to={`/artist/${id}`}/>
                    <AboutNavItem label='Related Artist' to={`/artist/${id}/related`}/>
                </ul>
            </nav>
            
            <div style={{paddingTop: '1.5em', position:"relative"}}>
                <Route exact path={`/artist/${id}`}>
                    <ArtistRow title='Popular' display='list' list={tracks} playContextTrack={playContextTrack}/> 
                    <ArtistRow title='Albums' display='grid' list={album}/> 
                    <ArtistRow title='Singles and EPs' display='grid' list={single}/> 
                    <ArtistRow title='Compilations' display='grid' list={appear}/> 
                    <ArtistRow title='Appears On' display='grid' list={compilation}/> 
                </Route>
                <Route exact path={`/artist/${id}/related`}>
                    <RowGrid playlists={related}/>
                </Route>
            </div>
        </>
    );
}



export default AboutMenu;
