import axios from '@/API/axios'

const getFeed = apiUrl =>{
    return axios.get(apiUrl)
}

export default {
    getFeed
}