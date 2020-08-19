import React from 'react';

//Playlists components - contain 2 other main component - the featured playlist link (with icons) and the other playlist (just the links)
function PlayLists({top, bottom}){
    return (
        <div className='playlists'>
            <h1 className='play-title'>playlists</h1>
            {top}
            <hr className="list-separator"/>
            {bottom}
        </div>
    );
}

export default PlayLists;

