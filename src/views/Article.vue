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
        <span>
          <router-link :to="{name:'editArticle', params:{slug: article.slug}}" class="btn btn-outline-secondary small">
              <i class="ion-edit"></i>
            Edit article
          </router-link>
          <button class="btn btn-outline-danger btn-small">
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
        TAGLIST
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {actionTypes} from '@/store/modules/article'
import {mapState} from 'vuex'
import AppErrorMessage from "@/components/ErrorMessage";

export default {
  name: "AppArticle",
  components: {AppErrorMessage},
  computed:{
    ...mapState({
      isLoading:state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticles, {slug: this.$route.params.slug})
  }
}
</script>

<style scoped>

</style>