import React from 'react'
import Loader from 'react-loader-spinner'

export default function Loading({type}) {
    return (
        <div className='loading'>
        {type === 'app'? 
        <Loader 
            type='Bars'
            color='#1db954'/>
        :
        <Loader 
            type='ThreeDots'
            color='#fff'/>}
        </div>
    )
}
