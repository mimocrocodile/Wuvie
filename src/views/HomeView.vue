<template>
  <div class="home">
  <!-- <VueTinySlider :mouse-drag="true" :loop="false" items="2" gutter="20">
      <div>Slider item #1</div>
      <div>Slider item #2</div>
      <div>Slider item #3</div>
      <div>Slider item #4</div>
      <div>Slider item #5</div>
      <div>Slider item #6</div>
  </VueTinySlider> -->
    <HelloWorld :api="apiArr" :apiImg="apiImg" />
    <div ref="observer"  class="observer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import VueTinySlider from 'vue-tiny-slider'

import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    // VueTinySlider
  },
  data(){
    return{
      apiArr: [],
      apiImg: "https://image.tmdb.org/t/p/original/",
      page: 0,
      totalPages: 0,
      res: [],
      observerDiv: false
    }
  },
  methods:{
    getNewPages:  function(){

      this.page++
      axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US&page=" + this.page )
      .then((info)=>{
          this.totalPages = info.data.total_pages
          this.apiArr = [...this.apiArr, ...info.data.results]
          console.log(this.apiArr)
      })
      .catch((error)=>{
          console.log(error)
          return error
      })


  }
  },
   mounted(){
     const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
      const callback = (entries, observer) => {
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
  .observer{
    margin-bottom: 100px;
  }
  body{
    /* background: #111111; */
  }
</style>