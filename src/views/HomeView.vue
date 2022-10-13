<template>
  <div class="home">
    <HelloWorld :api="apiArr" :apiImg="apiImg" />
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
export default {
  name: 'HomeView',

  components: {
    HelloWorld,
  },
  data(){
    return{
      apiArr: Object,
      apiImg: "https://image.tmdb.org/t/p/original/",
      page: 1,
      totalPages: 0,
    }

  },
  methods:{
    getNewPages: async function(){
      this.page++
      const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US&page=" + this.page)
      .then(info=>{
        return info.data.results
      })
      .catch(error=>{
        console.log(error)
      })
      if(this.page<=this.totalPages)
        this.apiArr = [...this.apiArr, ...response]
    }
  },
  async mounted(){
      // this.apiArr = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US")
      // console.log(this.apiArr.data.results)
     this.apiArr = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US&page=" + this.page )
    .then((info)=>{
        console.log(info)
        this.totalPages = info.data.total_pages
        return info.data.results
     })
     .catch((error)=>{
        console.log(error)
        return error
    })
      console.log(this.$refs.observer)
      const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
       console.log(entries)
      if(entries[0].isIntersecting){
        this.getNewPages()
      }


    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
}

</script>
<style>
  body{
    /* background: #111111; */
  }
</style>