import articlesApi from '@/API/article'
const state={
    data:null,
    isLoading: false,
    error: null
}

export const mutationTypes ={
    getArticlesStart: '[Articles] Get articles start',
    getArticlesSuccess: '[Articles] Get articles success',
    getArticlesFailure: '[Articles] Get articles failure'
}

export const actionTypes ={
    getArticles:'[Articles] Get articles'
}

const mutations ={
    [mutationTypes.getArticlesStart](state){
        state.isLoading=true
        state.data=null
    },

    [mutationTypes.getArticlesSuccess](state, payload){
        state.isLoading=false
        state.data=payload
    },

    [mutationTypes.getArticlesFailure](state){
        state.isLoading=false
    }
}

const actions={
    [actionTypes.getArticles](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationTypes.getArticlesStart, slug)
            articlesApi.getArticle(slug)
                .then(aricle=>{
                    context.commit(mutationTypes.getArticlesSuccess, aricle)
                    resolve(aricle)
                })
                .catch(()=>{
                    context.commit(mutationTypes.getArticlesFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}