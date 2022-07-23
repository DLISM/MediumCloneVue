<template>
<div>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{name:'home'}" class="navbar-brand">
        MediumClone
      </router-link>
      <ul class="nav navbar pull-sm-right">
        <li class="nav-item">
          <router-link :to="{name:'home'}" active-class="active" exact>
            Home
          </router-link>
        </li>

        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link :to="{name:'createArticle'}">
              <i class="ion-compose"></i> &nbsp;
              New Article
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{name:'setting'}">
              <i class="ion-gear-a"></i> &nbsp;
              Settings
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{name:'userProfile', params:{slug:currentUser.username}}">
              <img class="user-pic" :src="currentUser.image" />
              &nbsp;
              {{currentUser.user}}
            </router-link>
          </li>

        </template>

        <template v-if="!isLoggedIn">

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
import {mapState} from 'vuex'

export default {
  name: "AppTopbar",
  computed:{
    ...mapState({
      currentUser: state => state.auth.currentUser,
      isLoggedIn: state => state.auth.isLoggedIn
    })
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