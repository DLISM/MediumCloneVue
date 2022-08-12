import axios from '@/API/axios'

const getUserProfile = slug =>{
    return axios.get(`/profiles/${slug}`).then(response=>response.data.profile)
}

export default {
    getUserProfile
}