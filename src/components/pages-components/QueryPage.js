import React from 'react'
import SearchRow from '../featured-components/SearchRow'

export default function QueryPage({query}) {
    return (
        <div className="page-content">
            <div className='pageContent'>
                <SearchRow title='Songs' type='track' query={query}/>
                <SearchRow title='Artists' type='artist' query={query}/>
                <SearchRow title='Albums' type='album' query={query}/>
                <SearchRow title='Playlists' type='playlist' query={query}/>
            </div>
        </div>
        
    )
}
