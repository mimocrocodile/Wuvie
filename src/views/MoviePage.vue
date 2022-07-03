<template>
<h1>ASDFG</h1>
    <div class="container">
        
        <div class="poster">
            <img :src="moviePoster + movie.poster_path" alt="">
        </div>
        <div class="info">
            <!-- <p>{{getData}}</p> -->
            <!-- <p>{{getData}}</p> -->
            <p>{{movie.title}}</p>
            <p>{{movie.overview}}</p>
            <!-- <p>{{movieVideo}}</p> -->
            <iframe :src="'http://www.youtube.com/embed/'+movieFirst " frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "mpage",
      props:{
      id: String,
     
    },
    data() {
        return{
        getData: "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US",
        getVideo: "https://api.themoviedb.org/3/movie/"+this.id+"/videos?api_key=788d8d340536c97e76b580d97ee6c8cc",
        movie: Object,
        movieVideo: String,
        moviePoster: "https://image.tmdb.org/t/p/original/",
        movieFirst: String,
        }
       
    },
  
    async mounted(){
      // this.apiArr = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US")
    
     this.movie = await axios.get(this.getData)
    .then((info)=>{
        console.log(info)
      return info.data
     })
     .catch((error)=>{
          console.log(error)
          return error
    })
     this.movieVideo = await axios.get(this.getVideo)
    .then((info)=>{
        console.log(info)
      return info.data
     })
     .catch((error)=>{
          console.log(error)
          return error
    })
    this.movieFirst = this.movieVideo.results[0].key
    console.log(this.movieFirst)
  }
  
  
}

</script>

<style scoped>
    .container{
        display: flex;
        width: 1280px;
        margin: 0 auto;
        gap: 30px;
    }
    iframe{
        height: 400px;
        width: 700px;
    }
    .poster{
        display: flex;
        flex: 1 1 25%;
    }
    .poster img{
        width: 100%;
    }
    .info{
        display: flex;
        flex-direction: column;
        flex: 1 1 70%;
    }
</style>