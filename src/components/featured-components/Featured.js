import React, { useState } from 'react';
import {Route} from 'react-router-dom'

import Headerbar from './Headerbar'
import PageContent from './PageContent'

import HistoryNav from './HistoryNav'
import UserPrompt from './UserPrompt'
import SearchBar from './SearchBar'
import UserInfo from './UserInfo'
import CollectionNav from './CollectionNav'


function Featured (props){
    const loggedIn = props.loggedIn
    const [query, setQuery] = useState('')

    const resetQuery = ()=>{
        setQuery('')
    }

    return (
        <div className='featured'>
            <Headerbar>
                <HistoryNav />

                <Route exact path='/search'>
                    <SearchBar query={query} setQuery={setQuery} resetQuery={resetQuery}/>
                </Route>

                <Route path='/collection'>
                    <CollectionNav/>
                </Route>

                {loggedIn? <UserInfo />:<UserPrompt />}

            </Headerbar>

            <PageContent query={query} {...props}/>
        </div>
    );
}

export default Featured;

