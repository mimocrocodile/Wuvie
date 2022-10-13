<template>

    <div class="container">

        <div class="poster">
            <img :src="moviePoster + movie.poster_path" alt="">
        </div>
        <div class="info">
            <!-- <p>{{getData}}</p> -->
            <!-- <p>{{getData}}</p> -->
            <h1>{{movie.title}}</h1>
            <p>{{movie.release_date}}</p>
            <p>{{movie.overview}}</p>
            <!-- <p>{{movie.homepage}}</p> -->
            <div class="genres" >
                <p v-for="genre, index in movie.genres" :key="index"> {{genre.name}}</p>
            </div>
            <div>
                <p>{{movie.runtime}} minutes</p>
            </div>
            <div v-for="img, index in movie.production_companies" :key="index">
                <img class="studio" v-if="img.logo_path"  :src="moviePoster+img.logo_path" alt="">
            </div>

            <!-- <p>{{movieVideo}}</p> -->
            <router-link :to="{name: 'TrailerPage', params: {ginfo: id}}">Trailers</router-link>
            <!-- <div v-for="item, index in movieVideo.results" :key="index">
                <iframe v-if="index <= 4"  :src="'http://www.youtube.com/embed/'+item.key " frameborder="0" allowfullscreen></iframe>
            </div> -->

        </div>
        <div class="cast">
            <router-link :to="{name: 'personalpage', params: {id: name.id}}" v-for="name, index in cast"  :key="index"><span v-if="index<20">{{name.name}}</span></router-link>
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


    console.log(this.cast)
  }


}

</script>

<style >
    .container{
        width: 1400px;
        margin: 0 auto;
        display: flex;
        gap: 30px;
        padding-top: 150px;
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
        justify-content: center;
    }
    .genres p {
        display: inline-flex;
    }
    .poster{
        display: flex;
        /* flex: 1 1 25%; */
        max-width: 30%;
        max-height: 600px;
    }
    .poster img{
        width: 100%;
    }
    .cast{
        display: flex;
        flex-direction: column;
        flex: 1 1 20%;
        gap: 5px;
    }
    .cast p{
        font-size: 14px;
    }
    .info{
        display: flex;
        flex-direction: column;
        flex: 1 1 50%;
        gap: 30px;
    }
</style>