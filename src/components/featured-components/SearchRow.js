import React, {useEffect, useState} from 'react'

import makeAxiosRequest from '../../utilities/makeAxiosRequest'

import SearchRowTitle from './SearchRowTitle'
import SearchRowGrid from './SearchRowGrid'

export default function SearchRow({title, type, query}) {
    const [result, setResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
    }, [query])


    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/search?q=${formatedQuery}&type=${type}&limit=9`)
        if (formatedQuery.length > 0){
            makeRequest()
                .then((data) => {
                    const key = Object.keys(data)[0]
                    const result = data[key].items
                    setResult(result)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        return () => source.cancel()
    }, [formatedQuery, type])


    return (
        <div className='CollectionRow' style={{display: result.length===0? 'none':'grid'}}>
            <SearchRowTitle title={title}/>
            <SearchRowGrid type={type} info={result}/>
        </div>
    )
}
