import React from 'react'
import PlayCard from './PlayCard'

export default function RowGrid({type, info}) {
    return (
        <div className="RowGrid">
            {info.map((item) => {
                return <PlayCard key={item.id} info={item} type={type}/> 
            })}
        </div>
    )
}
