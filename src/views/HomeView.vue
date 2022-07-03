<template>
  <div class="home">
    <HelloWorld :api="apiArr" :apiImg="apiImg" />

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'HomeView',

  components: {
    HelloWorld
  },
  data(){
    return{
      apiArr: Object,
      apiImg: "https://image.tmdb.org/t/p/original/"
    }

  },
  async mounted(){
      // this.apiArr = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US")
      // console.log(this.apiArr.data.results)
     this.apiArr = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US")
    .then((info)=>{
      console.log(info)
      return info.data.results
     })
     .catch((error)=>{
          console.log(error)
          return error
    })
 
  }
}

</script>
<style>
  body{
    /* background: #111111; */
  }
</style>