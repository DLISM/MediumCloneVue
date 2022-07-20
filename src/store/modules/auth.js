import authAPI from '@/API/auth'
import {setItem} from '@/utils/persistenStorage'

const state={
    isSubmitting:false,
    currentUser:null,
    validationErrors:null,
    isLoggedIn:null
}

const mutations={
    registerStart(state){
        state.isSubmitting=true
        state.validationErrors=null
    },
    registerSuccess(state, payload){
        state.isSubmitting=false
        state.currentUser=payload
        state.isLoggedIn=true
    },
    registerFailure(state, payload){
        state.isSubmitting=false
        state.validationErrors=payload
    }
}

const actions ={
    register(context, credentials){
       return new Promise(resolve => {
           context.commit('registerStart')
           authAPI.register(credentials)
               .then(response =>{
                   context.commit('registerSuccess', response.data.user)
                   setItem('accessToken', response.data.user.token)
                   resolve(response.data.user)
               })
               .catch(result =>{
                   context.commit('registerFailure', result.response.data.errors)
               })
       })
    }
}
export default {
    state,
    mutations,
    actions
}