<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" class="user-img"/>
            <h4>{{userProfile.username}}</h4>
            <p>{{userProfile.bio}}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link
                  :to="{name:'settings'}"
                  v-if="isCurrentUserProfile"
                  class="btn btn-small btn-outline-secondary action-button">
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                    :to="{name:'userProfile', params:{slug: userProfile.username}}"
                    class="nav-link"
                >
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                    :to="{name:'userProfileFavorites', params:{slug: userProfile.username}}"
                    class="nav-link"
                >
                  Favorite Posts
                </router-link>
              </li>
            </ul>
          </div>

          <app-feed :api-url="apiUrl" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import AppFeed from "@/components/Feed";
import {actionTypes} from '@/store/modules/userProfile'
import {gettersTypes as authGettersTypes} from '@/store/modules/auth'

export default {
  name: "AppUserProfile",
  components: {AppFeed},
  computed:{
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      error: state => state.userProfile.error,
      userProfile: state => state.userProfile.data,
    }),
    ...mapState({
      currentUser: authGettersTypes.currentUser
    }),
    isCurrentUserProfile(){
      if(!this.currentUser || !this.userProfile){
        return false
      }
      return this.currentUser.username===this.userProfile.username
    },
    apiUrl(){
      const isFavorites=this.$route.path.includes('favorites')
      return isFavorites ?
          `/articles?favorited=${this.userProfileSlug}`
          :
          `/articles?author=${this.userProfileSlug}`
    },
    userProfileSlug(){
      return this.$route.params.slug
    }
  },
  mounted() {
    this.getUserProfile()
  },
  watch:{
    userProfileSlug(){
      this.getUserProfile()
    }
  },
  methods:{
    getUserProfile(){
      this.$store.dispatch(actionTypes.getUserProfile, {slug: this.userProfileSlug})
    }
  }
}
</script>
<style scoped>

</style>