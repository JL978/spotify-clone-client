import React from 'react';

const ConnectDevicesItem = ({name, disable, active,id, onClick}) => {
    return (
        <ul className='connect-devices-list'>
            <button className={`connect-devices-items ${disable? 'disable':''} ${active? 'active':''} ellipsis-one-line no-outline`} data-id={id} onClick={active? null:onClick}>
                <div className='cd-info'>
                    <h1>{name}</h1>
                </div>
            </button>
        </ul>
    );
}

export default ConnectDevicesItem;




