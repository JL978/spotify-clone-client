import React from 'react';
import Icon from '../icons'
import {NavLink} from 'react-router-dom'

const FeaturedItem = ({label, loggedIn}) => {
    return (
        <div className='featured-item' style={{cursor: 'pointer'}} data-tip='list' data-for='tooltip' data-event='click'>
            <NavLink exact to="/tracks" className='featured-item-link' style={{ pointerEvents: loggedIn? 'auto':'none'}} activeStyle={{opacity:'1'}}>
                <div className="playlist-icon">
                    <Icon name='Like' />
                </div>
                <span className="featured-label">{label}</span>
            </NavLink>
        </div>
    );
}

export default FeaturedItem;

