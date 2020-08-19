import React from 'react';
import ArtistRowItem from './ArtistRowItem'

const ArtistRowGrid = ({list}) => {
    return (
        <div className='ArtistRowGrid'> 
            {list.map((item, index) => <ArtistRowItem key={index} info={item}/>)}
        </div>
    );
}

export default ArtistRowGrid;
