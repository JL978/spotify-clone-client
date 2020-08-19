import React from 'react'
import PromptButton from './PromptButton'

export default function UserPrompt() {
    return (
        <div className='UserPrompt'>
            <PromptButton to='https://spotify.com/signup' name='Sign Up' styleName='dark'/>
            <PromptButton to='http://localhost:4000/login' name='Log In' styleName='light'/>
        </div>
    )
}
