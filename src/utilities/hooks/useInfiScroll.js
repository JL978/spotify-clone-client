// eslint-disable-next-line
import React, { useState, useRef, useCallback } from 'react';
import makeAxiosRequest from '../makeAxiosRequest'

function useInfiScroll(setList){
    const [next, setNext] = useState(null) 

    const observer = useRef()
    const lastRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && next){
                const [, makeRequest] = makeAxiosRequest(next)
                makeRequest()
                    .then(data => {
                        let resultList, next
                        if (data.items && data.items[0].track){
                            resultList = data.items.map(track => track.track)
                        }else{
                            resultList = data.items || data.playlists.items
                        }

                        if (data.playlists){
                            next = data.playlists.next
                        }else{
                            next = data.next
                        }

                        setList(tracks => [...tracks, ...resultList])
                        setNext(next)
                    })
                    .catch(error => console.log(error))
            }
        }, {threshold: 0.75})
        if (node) observer.current.observe(node)
    // eslint-disable-next-line
    }, [next])

    return [setNext, lastRef]
}

export default useInfiScroll