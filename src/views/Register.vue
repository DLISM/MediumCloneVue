<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-1">
          <h1 class="text-xs-center">Sing up</h1>
          <p class="text-xs-center">
            <router-link to="{name: 'login'}">Have an account?</router-link>
          </p>

        <AppValidationErrors
            v-if="validationErrors"
            :validation-errors="validationErrors"
        />

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
            <input type="text" class="form-control form-control-lg" placeholder="User name" v-model="username">
          </fieldset>
          <fieldset class="form-group">
            <input type="text" class="form-control form-control-lg" placeholder="Email" v-model="email">
          </fieldset>
          <fieldset class="form-group">
            <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right" :disabled="isSubmitting">Sing Up</button>
        </form>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors.vue'
import {actionsTypes} from '@/store/modules/auth'

export default {
  name: "AppRegister",
  components:{
    AppValidationErrors
  },
  data(){
    return{
      email:'',
      password:'',
      username:''
    }
  },
  computed:{
    isSubmitting(){
      return this.$store.state.auth.isSubmitting
    },
    validationErrors(){
      return this.$store.state.auth.validationErrors
    }
  },
  methods:{
    onSubmit(){
      this.$store.dispatch(actionsTypes.register,
          {
            username: this.username,
            email: this.email,
            password: this.password
          }
      ).then(
         this.$router.push({name:'globalFeed'})
      )
    }
  }
}
</script>

<style scoped>

</style>