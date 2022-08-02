import axios from '@/API/axios'

const getArticle=slug=>{
    return axios.get(`/articles/${slug}`).then(response => response.data.article)
}

export default {
    getArticle
}