<template>
<button @click="handleLike" :class="{
  'btn':true,
  'btn-small':true,
  'btn-primary':isFavoritedOptimistic,
  'btn-outline-primary':!isFavoritedOptimistic
  }">
  <i class="ion-heart"/>
  <span>&nbsp; {{favoritesCountOptimistic}}</span>
</button>
</template>

<script>
import {actionTypes} from "@/store/modules/addToFavorite";

export default {
  name: "AddToFavorites",
  props:{
    isFavorited:{
      type:Boolean,
      required:true
    },
    articleSlug:{
      type:String,
      required: true
    },
    favoritesCount:{
      type:Number,
      required:true
    }
  },
  data(){
    return{
      isFavoritedOptimistic:this.isFavorited,
      favoritesCountOptimistic : this.favoritesCount
    }
  },
  methods:{
    handleLike(){
      this.$store.dispatch(actionTypes.addToFavorites,{
         slug:this.articleSlug,
         isFavorited: this.isFavorited
      })
      if(this.isFavoritedOptimistic){
        this.favoritesCountOptimistic--;
      }else {
        this.favoritesCountOptimistic++;
      }
      this.isFavoritedOptimistic=!this.isFavoritedOptimistic
    }
  }
}
</script>

<style scoped>

</style>