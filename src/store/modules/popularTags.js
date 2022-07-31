import popularTagApi from '@/API/popularTag'
const state={
    data:null,
    isLoading: false,
    error: null
}

export const mutationTypes ={
    getPopularTagsStart: '[PopularTags] Get popularTags start',
    getPopularTagsSuccess: '[PopularTags] Get popularTags success',
    getPopularTagsFailure: '[PopularTags] Get popularTags failure'
}

export const actionTypes ={
    getPopularTags:'[popularTags] Get popularTags'
}

const mutations ={
    [mutationTypes.getPopularTagsStart](state){
        state.isLoading=true
        state.data=null
    },

    [mutationTypes.getPopularTagsSuccess](state, payload){
        state.isLoading=false
        state.data=payload
    },

    [mutationTypes.getPopularTagsFailure](state){
        state.isLoading=false
    }
}

const actions={
    [actionTypes.getPopularTags](context){
        return new Promise(resolve => {
            context.commit(mutationTypes.getPopularTagsStart)
            popularTagApi.getPopularTags()
                .then(tags=>{
                    context.commit(mutationTypes.getPopularTagsSuccess, tags)
                    resolve(tags)
                })
                .catch(()=>{
                    context.commit(mutationTypes.getPopularTagsFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}