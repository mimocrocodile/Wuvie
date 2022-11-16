<template>
  <ActorMovieTemplate :apiContainer="apiArr" :apiRelated="apiCastArr"/>

</template>

<script>
import ActorMovieTemplate from "@/components/ActorMovieTemplate.vue"
import axios from 'axios'
export default {
    name: "MoviePage",
    props:{
        id: String,
    },
    components:{
        ActorMovieTemplate
    },
    data(){
        return{
            api: "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US",
            apiCast: "https://api.themoviedb.org/3/movie/"+this.id+"/credits?api_key=788d8d340536c97e76b580d97ee6c8cc",
            apiArr: [],
            apiCastArr: [],

        }
    },

    async mounted(){
        this.apiArr = await axios(this.api)
        .then((info)=>{
            console.log("data", info.data)
            return info.data
        })
        .catch((error)=>{
            console.log(error)
        })
        this.apiCastArr = await axios(this.apiCast)
        .then((info)=>{
            console.log("cast", info.data.cast)
            return info.data.cast
        })
        .catch((error)=>{
            console.log(error)
        })
        this.apiCastArr = this.apiCastArr.splice(0, 19)

    }

}
</script>

<style>

</style>