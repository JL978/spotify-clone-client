import React from 'react'
import RowTitle from './RowTitle'
import RowGrid from './RowGrid'


 const CollectionRow = React.forwardRef(({name, playlists, id}, ref) => {
    return (
        <div className="CollectionRow">
            <RowTitle title={name} id={id}/>
            <RowGrid ref={ref} playlists={playlists}/>
        </div>
    )
})

export default CollectionRow