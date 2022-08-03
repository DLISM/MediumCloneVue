<template>
<div class="article-page">
  <div class="banner">
    <div class="container" v-if="article">
      <h1>{{article.title}}</h1>
      <div class="article-meta">

        <router-link :to="{name:'userProfile', params:{slug: article.author.username}}">
          <img :src="article.author.image"/>
        </router-link>

        <div class="info">
          <router-link :to="{name:'userProfile', params:{slug: article.author.username}}">
            {{article.author.username}}
          </router-link>
          <span class="date">{{article.createdAt}}</span>
        </div>
        <span v-if="isAuthor">
          <router-link :to="{name:'editArticle', params:{slug: article.slug}}" class="btn btn-outline-secondary small">
              <i class="ion-edit"></i>
            Edit article
          </router-link>
          <button class="btn btn-outline-danger btn-small" @click="deleteArticle">
            <i class="ion-trash-a"></i>
            Delete Article
          </button>
        </span>
      </div>
    </div>
  </div>

  <div class="container page">
    <app-loading v-if="isLoading"/>
    <app-error-message v-if="error" :message="error"/>
    <div class="row article-content" v-if="article">
      <div class="col-xs-12">
        <div>
          <p>{{article.body}}</p>
        </div>
        <app-tag-list :tags="article.tagList"/>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {mapState, mapGetters} from 'vuex'
import AppErrorMessage from "@/components/ErrorMessage";
import {gettersTypes as authGetterTypes} from '@/store/modules/auth'
import AppTagList from '@/components/TagList'

export default {
  name: "AppArticle",
  components: {
    AppErrorMessage,
    AppTagList
  },
  computed:{
    ...mapState({
      isLoading:state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      currentUser:authGetterTypes.currentUser
    }),
    isAuthor(){
      if(!this.currentUser || !this.article){
        return false;
      }
      return this.currentUser.username===this.article.author.username
    }
  },
  methods:{
    deleteArticle(){
      this.$store.dispatch(articleActionTypes.deleteArticles,
          {
            slug: this.$route.params.slug
          }).then(()=>{
            this.$router.push({name:'globalFeed'})
      })
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticles, {slug: this.$route.params.slug})
  }
}
</script>

<style scoped>

</style>