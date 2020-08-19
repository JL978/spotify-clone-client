import React from 'react';
import ListItem from './ListItem.js'

//Other playlist component - to be updated with playlists from the spotify api
//The ListItems in here are just placeholders to test out layouts
function OtherPlaylist({playlists}) {
    return (
        <div className="other-playlist-container">
            <ul className="other-list">
                {playlists.map((playlist) => <ListItem key={playlist.id} name={playlist.name} id={playlist.id}/>)}
            </ul>
        </div>
    );
}






export default OtherPlaylist;
