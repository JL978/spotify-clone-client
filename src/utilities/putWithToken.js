import axios from 'axios'

const putWithToken = (endpoint, access_token, cancelSource, data, method='PUT') =>{
    const request = async () => {
        const cancelToken = cancelSource.token
        const options = {
            url: endpoint,
            method,
            headers: { 
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json' },
            data,
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

export default putWithToken