<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Settings</h1>
          <app-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="form.image" placeholder="URL">
              </fieldset>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {gettersTypes as authGettersType} from '@/store/modules/auth'
import AppValidationErrors from '@/components/ValidationErrors.vue'

export default {
  name: "AppSettings",
  components:{
    AppValidationErrors
  },
  computed:{
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationErrors
    }),
    ...mapGetters({
      currentUser:authGettersType.currentUser
    }),
    form(){
        return{
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          image: this.currentUser.image,
          email: this.currentUser.email,
          password:'',
        }
    }
  },
  methods:{
    onSubmit(){
      console.log('submit form')
    }
  }
}
</script>

<style scoped>

</style>