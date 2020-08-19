import React from 'react';
import CreatePLaylist from './CreatePlaylist.js'



//Featured playlist containing 2 main components - the button to make a new playlist and a featured item (the liked songs playlist)
function FeaturedPlaylist({children}) {
    return (
        <>
            <div className="featured-playlists">
                <CreatePLaylist />
                {children}
            </div>
        </>
    );
}


export default FeaturedPlaylist;
