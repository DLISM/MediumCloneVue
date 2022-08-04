<template>
  <div>
    <app-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-Submiting="isSubmitting"
    @articleSumit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm'
export default {
  name: "AppCreateArticle",
  components:{
    AppArticleForm
  },
  data(){
    return{
      initialValues:{
        title:'',
        description:'',
        body:'',
        tagList:[]
      },
      validationErrors:null,
      isSubmitting:false
    }
  },
  methods:{
    onSubmit(data){
      console.log('onSubmit ', data)
    }
  }
}
</script>

<style scoped>

</style>