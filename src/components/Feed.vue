<template>
  <div>

    <app-loading v-if="isLoading"/>

    <app-error-message v-if="error" />

    <div v-if="feed">
      <div
          class="article-preview"
          v-for="(article, index) in feed.articles"
          :key="index"
      >
        <div class="article-meta">
          <router-link
              :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
                :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
            :to="{name: 'article', params: {slug: article.slug}}"
            class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <app-tag-list :tags="article.tagList"/>
        </router-link>
      </div>
      <app-pagination
          :total="feed.articlesCount"
          :limit="limit"
          :current-pahe="currentPage"
          :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import AppPagination from '@/components/Pagination.vue'
import {limit} from '@/utils/vars'
import {stringify, parseUrl} from 'query-string'
import AppLoading from '@/components/Loading.vue'
import AppErrorMessage from '@/components/ErrorMessage.vue'
import AppTagList from '@/components/TagList'

export default {
  name: "AppFeed",
  props:{
    apiUrl:{
      type: String,
      required:true
    }
  },
  components:{
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList
  },
  data(){
    return{
      limit:limit
    }
  },
  computed:{
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage(){
      return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
    offset(){
      return this.currentPage*limit-limit
    }
  },
  watch:{
    currentPage(){
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods:{
    fetchFeed(){
      const newUrl = parseUrl(this.apiUrl)

      const stringifyParams = stringify({
        limit,
        offset:this.offset,
        ...newUrl.query
      })

      const apiUrlWithParams = `${newUrl.url}?${stringifyParams}`

      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>

<style scoped>

</style>