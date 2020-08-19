import React, {useState, useEffect, useRef} from 'react';

const ProgressBar = ({extraClass, value, engageClass, setValue, scrubFunction}) => {
    const [engage, setEngage] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [scrub, setScrub] = useState(null)

    const wrapperRef = useRef(null)


    useEffect(() => {
        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', handleMouseUp)
        
        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    })

    const handleMouseUp = (e) => {
        setIsDragging(false)
        if (engage){
            setValue(scrub)
        }
        setScrub(null)
        if (!e.target.classList.contains('progress-wrapper') &&
            !e.target.classList.contains('progress-bar') &&
            !e.target.classList.contains('progress') &&
            !e.target.classList.contains('progress-slider') ){
            setEngage(false)
        }
    }

    const handleMove = (e) => {
        if (engage && isDragging) {
            const rect = wrapperRef.current.getBoundingClientRect()
            let offsetRatio = (e.pageX - rect.x)/rect.width

            if (offsetRatio < 0){
                offsetRatio = 0.001 
            }else if (offsetRatio > 1){
                offsetRatio = 1
            }
            
            if(scrubFunction){
                scrubFunction(offsetRatio)
            }
            setScrub(offsetRatio)
        }
    }

    const handleEnter = () => {
        setEngage(true)
    }

    const handleLeave = () => {
        if (!isDragging){
            setEngage(false)
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        const rect = wrapperRef.current.getBoundingClientRect()
        const offsetRatio = (e.pageX - rect.x)/rect.width
        setScrub(offsetRatio)
    }

    return (
        <div ref={wrapperRef} className="progress-wrapper" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onMouseDown={handleMouseDown}>
            <div className={`progress-bar`} >
                {/* {console.log(((1-(scrub || value))*100).toFixed(1))} */}
                <div className={`progress ${extraClass} ${engage? engageClass:''}`} style={{transform: `translate(-${((1-(scrub || value))*100).toFixed(2)}%)`}} ></div>
            </div>
            <button className={`progress-slider ${extraClass} no-outline ${engage? engageClass:''}`} style={{left: `${((scrub || value)*100).toFixed(2)}%`}} ></button>
        </div>
    );
}

export default ProgressBar;
