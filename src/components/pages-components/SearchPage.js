import React from 'react'
import BrowsePage from './BrowsePage'
import QueryPage from './QueryPage'

export default function SearchPage({query}) {
    if (query === ''){
        return (
            <BrowsePage />
        )
    }else{
        return (
            <QueryPage query={query}/>
        )
    }
}
