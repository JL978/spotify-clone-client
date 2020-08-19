import React, {useState, useEffect} from 'react'

import makeAxiosRequest from '../../utilities/makeAxiosRequest'

import BrowseCard from '../featured-components/BrowseCard'
import PageTitle from '../featured-components/PageTitle'

export default function BrowsePage() {
    const [genre, setGenre] = useState([])

    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest('https://api.spotify.com/v1/browse/categories?limit=50')

        makeRequest()
            .then((data) => {
                setGenre(data.categories.items)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [])

    return (
        <div className="page-content">
            <div className='browsePage'>
                <PageTitle name='Browse All' />
                <div className="browseGrid">
                    {genre.map((genre) => {
                        return <BrowseCard key={genre.id} info={genre}/>
                    })}
                </div>
            </div>
        </div>
    )
}
