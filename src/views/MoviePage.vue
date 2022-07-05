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
            <p>{{movie.homepage}}</p>
            <div class="genres" >
                <p v-for="genre, index in movie.genres" :key="index"> {{genre.name}}</p>
            </div>
            <div>
                <p>{{movie.runtime}} - {{calcTime(movie.runtime)}}</p>
            </div>
            <div v-for="img, index in movie.production_companies" :key="index">
                <img class="studio" v-if="img.logo_path"  :src="moviePoster+img.logo_path" alt="">
            </div>
 <p>{{movie.release_date}}</p>
            <!-- <p>{{movieVideo}}</p> -->
            <div v-for="item, index in movieVideo.results" :key="index">
                <iframe v-if="index <= 4"  :src="'http://www.youtube.com/embed/'+item.key " frameborder="0"></iframe>
            </div>
           
        </div>
        <div class="cast">
            <router-link :to="{name: 'personalpage', params: {id: name.id}}" v-for="name, index in cast" :key="index">{{name.name}}</router-link>
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
    methods:{
        calcTime: function(time){return Math.floor(time/60)}
    },
    data() {
        return{
        getData: "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US",
        getVideo: "https://api.themoviedb.org/3/movie/"+this.id+"/videos?api_key=788d8d340536c97e76b580d97ee6c8cc",
        movie: Object,
        cast: Object,
        crew: Object,
        movieVideo: String,
        moviePoster: "https://image.tmdb.org/t/p/original/",
        movieFirst: String,
        }

    },

    async mounted(){
      // this.apiArr = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US")
    console.log()
    this.cast = await axios.get("https://api.themoviedb.org/3/movie/"+this.id+"/credits?api_key=788d8d340536c97e76b580d97ee6c8cc")
    .then((info)=>{
        console.log(info)
        return info.data.cast
    })
    .catch((error)=>{
        console.log(error)
    })

    this.crew = await axios.get("https://api.themoviedb.org/3/movie/"+this.id+"/credits?api_key=788d8d340536c97e76b580d97ee6c8cc")
    .then((info)=>{
        return info.data.crew
    })
    .catch((error)=>{
        console.log(error)
    })

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

    console.log(this.cast)
  }


}

</script>

<style >
    .container{
        width: 1280px;
        margin: 0 auto;
    }
    iframe{
        height: 400px;
        width: 700px;
    }
    .studio{
        width: 400px;
        height: 100px;
    }
    .genres{
        display: flex;
        gap: 15px;
    }
    .genres p {
        display: inline-flex;
    }
    .poster{
        display: flex;
        flex: 1 1 25%;
        max-height: 600px;
    }
    .poster img{
        width: 100%;
    }
    .cast{
        display: flex;
        flex-direction: column;
        flex: 1 1 20%;
    }
    .cast p{
        font-size: 14px;
    }
    .info{
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;
    }
</style>