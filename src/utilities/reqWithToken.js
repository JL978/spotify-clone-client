import axios from 'axios'

const reqWithToken = (endpoint, access_token, cancelSource) =>{
    const request = async () => {
        const cancelToken = cancelSource.token
        const options = {
            url: endpoint,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
            cancelToken
        };
        let result
        try{
            result = await axios(options)
        }catch (err){
            if (axios.isCancel(err)) return
            return err
        }
        return result 
    }
    
    return request
}

export default reqWithToken