import axios from '@/API/axios'

const addToFavorites = slug =>{
    return axios.post(`/articles/${slug}/favorite`).then(response=>response.data.article)
}

const removeFromFavorites = slug =>{
    return axios.delete(`/articles/${slug}/favorite`).then(response=>response.data.article)
}

export default {
    addToFavorites,
    removeFromFavorites
}