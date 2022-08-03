import articlesApi from '@/API/article'
const state={
    data:null,
    isLoading: false,
    error: null
}

export const mutationTypes ={
    getArticlesStart: '[Articles] Get articles start',
    getArticlesSuccess: '[Articles] Get articles success',
    getArticlesFailure: '[Articles] Get articles failure',

    deleteArticlesStart: '[Articles] Delete articles start',
    deleteArticlesSuccess: '[Articles] Delete articles success',
    deleteArticlesFailure: '[Articles] Delete articles failure',
}

export const actionTypes ={
    getArticles:'[Articles] Get articles',
    deleteArticles:'[Articles] Delete articles',
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
    },

    [mutationTypes.deleteArticlesStart](){},
    [mutationTypes.deleteArticlesSuccess](){},
    [mutationTypes.deleteArticlesFailure](){},

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
    },

    [actionTypes.deleteArticles](context, {slug}){
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteArticlesStart, slug)
            articlesApi
                .deleteArticle(slug)
                .then(()=>{
                    context.commit(mutationTypes.deleteArticlesSuccess)
                    resolve()
                })
                .catch(()=>{
                    context.commit(mutationTypes.deleteArticlesFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}