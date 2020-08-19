import React, {useState, useEffect} from 'react';
import axios from 'axios'

import ConnectDevicesItem from './ConnectDevicesItem'

import reqWithToken from '../../utilities/reqWithToken'
import putWithToken from '../../utilities/putWithToken'


const ConnectDevices = ({token, closeTip}) => {
    const [devices, setDevices] = useState([])

    const source = axios.CancelToken.source()
    useEffect(() => {
        
        const requestDevices = reqWithToken('https://api.spotify.com/v1/me/player/devices', token, source) 

        window.addEventListener('click', clickExit)
        requestDevices()
            .then(response => {
                const _devices = response.data.devices
                setDevices(_devices)
            })
            .catch(error => console.log(error))

        return () => {
            window.removeEventListener('click', clickExit)
            source.cancel()
        }
    // eslint-disable-next-line
    }, [])

    const clickExit = (e) => {
        if (e.target.dataset.source !== 'inside'){
            closeTip()
        }
    }

    const switchDevice = (e) => {
        const id = e.currentTarget.dataset.id
        const data = {device_ids:[id]}
        const reqTransfer = putWithToken('https://api.spotify.com/v1/me/player', token, source ,data)
        reqTransfer()
            .then(response => {
                if (response.status === 204){
                    closeTip()
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='connect-devices' data-source='inside'>
            <div className='connect-devices-content' data-source='inside'>
                <div className='connect-devices-title' data-source='inside'>
                    <h1 data-source='inside'>Connect to a device</h1>
                    <p data-source='inside'>Due to the limitation of the Spotify API, no streaming is available from this app.</p>
                    <br data-source='inside'></br>
                    <p data-source='inside'>This app, however, works as a remote controller - log in to an official Spotify app to checkout this feature</p>
                </div>
                <div className='cd-img' data-source='inside'>
                    <img loading='lazy' data-source='inside' src="https://open.scdn.co/cdn/images/connect_header@1x.ecc6912d.png" alt="" draggable='false'/>
                </div>

                {devices.length === 0? 
                    <ConnectDevicesItem name='No devices available' disable/>:
                    devices.map((device, index) => {
                        return <ConnectDevicesItem name={device.name} key={index} active={device.is_active} id={device.id} onClick={switchDevice}/>
                    })    
                }

            </div>
        </div>
    );
}



export default ConnectDevices;
