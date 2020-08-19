import React from 'react';
import {NavLink} from 'react-router-dom'

const AboutNavItem = ({label, to}) => {
    return (
        <li className='AboutNavItem'>
            <NavLink exact to={to} className='aboutLink' activeClassName='aboutLink-active'>
                <span style={style}>{label}</span>
            </NavLink>
        </li>
    );
}

const style = {
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16px',
    letterSpacing: 'normal',
    textTransform: 'none'
}

export default AboutNavItem;
