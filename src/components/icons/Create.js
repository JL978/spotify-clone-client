import React from 'react'

const style = {
    padding: '4px',
    width: '32px',
    height: '32px'
}

const Create = (props) => {
    return(
        <svg
        viewBox='0 0 36 36'
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        shapeRendering="crispEdges"
        >
            <path
                fill="black"
                d="m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"
            />
        </svg>
    );
}
export default Create;

