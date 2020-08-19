import React from 'react';

//The component that is immediately below the spotify logo
//This is the main nav link list with 3 items - Home, Search and Library

const NavList = ({children}) => {
    return (
        <ul className="nav-list">
            {children}
        </ul>
    );
}

export default NavList;
