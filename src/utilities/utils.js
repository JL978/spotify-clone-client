export default function msTimeFormat(ms){
    const s = Math.floor(ms/1000)
    const min = Math.floor(s /60) 
    const sec = (s - min*60) 

    return `${min}:${sec < 10? `0${sec}`: sec}`
}