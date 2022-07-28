<template>
<div>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{name:'globalFeed'}" class="navbar-brand">
        MediumClone
      </router-link>
      <ul class="nav navbar pull-sm-right">
        <li class="nav-item">
          <router-link :to="{name:'globalFeed'}" active-class="active" exact>
            Home
          </router-link>
        </li>

        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link :to="{name:'createArticle',}">
              <i class="ion-compose"></i> &nbsp;
              New Article
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{name:'settings'}">
              <i class="ion-gear-a"></i> &nbsp;
              Settings
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{name:'userProfile', params:{slug:currentUser.username}}">
              <img class="user-pic" :src="currentUser.image" />
              {{currentUser.username}}
            </router-link>
          </li>

        </template>

        <template v-if="isAnonymous">

          <li class="nav-item">
            <router-link :to="{name:'login'}" active-class="active">
              Sing In
            </router-link>
          </li>

          <li class="nav-item" >
            <router-link :to="{name:'register'}" active-class="active">
              Sing Up
            </router-link>
          </li>

        </template>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
import {gettersTypes} from '@/store/modules/auth'

export default {
  name: "AppTopbar",
  computed:{
    currentUser(){
      return this.$store.getters[gettersTypes.currentUser]
    },
    isLoggedIn(){
      return this.$store.getters[gettersTypes.isLoggedIn]
    },
    isAnonymous(){
      return this.$store.getters[gettersTypes.isAnonymous]
    }
  }
}
</script>

<style scoped>
.nav{
  display: flex;
  justify-content: space-between;
}
.nav li{
  margin: 0 15px;
}
.nav li .active{
  font-weight: bold;
  color: dimgray;
}
</style>