import React from 'react';
import ArtistRowTitle from './ArtistRowTitle'
import TrackList from './TrackList'
import ArtistRowGrid from './ArtistRowGrid'

const ArtistRow = ({title, display, list, playContextTrack}) => {
    if (list && list.length > 0) {
        return (
            <div>
                <ArtistRowTitle title={title}/>
                {display === 'list' ? 
                    <TrackList tracks={list} styleName='simplify' playContextTrack={playContextTrack}/>:
                    <ArtistRowGrid list={list}/>}
            </div>
        );
    }else{
        return null
    }
}


export default ArtistRow;
