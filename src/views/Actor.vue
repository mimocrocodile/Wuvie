<template>
    <ActorMovieTemplate :apiContainer="apiArr" :apiRelated="relatedMovieArr"/>
</template>

<script>
import ActorMovieTemplate from "@/components/ActorMovieTemplate.vue"
import axios from 'axios'
export default {
    name: 'ActorPage',
    props:{
        id: String,
    },
    components:{
        ActorMovieTemplate
    },
    data(){
        return{
            api: "https://api.themoviedb.org/3/person/"+this.id+"?api_key=788d8d340536c97e76b580d97ee6c8cc",
            getRelatedMovies: "https://api.themoviedb.org/3/discover/movie?api_key=788d8d340536c97e76b580d97ee6c8cc&with_people="+this.id+"",
            apiArr: [],
            relatedMovieArr: [],
        }
    },

    async mounted(){
        this.apiArr = await axios.get(this.api)
        .then((info)=>{
            console.log("data", info.data)
            return info.data
        })
        .catch((error)=>{
            console.log(error)
        })
        this.relatedMovieArr = await axios.get(this.getRelatedMovies)
        .then((info)=>{
            return info.data.results
        })
        .catch((error)=>{
            return error
        })
        // this.apiArr = [...this.apiArr, ...res]
    }

}
</script>

<style>

</style>