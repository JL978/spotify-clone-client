import React from 'react'

const Install = (props) => {
    return(
        <svg
        viewBox={props.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        width={props.width}
        height={props.height}
        >
            <path
                fill="currentColor"
                d="M12 11.657V6h-1v5.65L9.076 9.414l-.758.65 3.183 3.702 3.195-3.7-.758-.653L12 11.657zM11.5 2C7.358 2 4 5.358 4 9.5c0 4.142 3.358 7.5 7.5 7.5 4.142 0 7.5-3.358 7.5-7.5C19 5.358 15.642 2 11.5 2zm0 14C7.916 16 5 13.084 5 9.5S7.916 3 11.5 3 18 5.916 18 9.5 15.084 16 11.5 16z" 
                fillRule="evenodd"
            />
        </svg>
    );
}
export default Install;



