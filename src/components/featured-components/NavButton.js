import React from 'react'
import Icon from '../icons'

export default function NavButton({property}) {
    return (
        <button className={property === 'Back'? 'navButton no-outline':'navButton mediaNone no-outline'} title="Sorry this is just too much work for something not that entirely useful. Just use the browser's buttons :)"> 
            <Icon name={property} />
        </button>
    )
}
