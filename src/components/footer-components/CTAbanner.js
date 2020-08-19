import React from 'react'
import PromptButton from '../featured-components/PromptButton'
export default function CTAbanner() {
    return (
        <div className='CTA-banner'>
            <div className="cta-content">
                <h2 style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                }}>A spotify clone</h2>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '24px',
                    letterSpacing: 'normal',
                    textTransform: 'none'
                }}>This is a clone website intended to be an exercise in web application building - not for profit/commercial use. If you are looking for the real app go to open.spotify.com</h3>
            </div>
            <PromptButton to='https://spotify.com/signup' name='Sign up free' styleName='CTA'/>
        </div>
    )
}
