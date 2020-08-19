import axios from 'axios'

export default function sendConfig(){
    const source = axios.CancelToken.source()

    const config = {
        headers: {'Access-Control-Allow-Origin': '*'},
        'Content-Type': 'application/x-www-form-urlencoded',
        cancelToken: source.token
    };
    return [source, config]
}
