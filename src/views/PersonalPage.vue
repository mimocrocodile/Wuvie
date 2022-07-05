<template>
<div>
     <div class="container">

        <div class="poster">
            <img :src="personPoster+person.profile_path" alt="">
        </div>
        <div class="info">
            <p>{{person.name}}</p>
            <p>{{person.birthday}}</p>
            <p>{{person.biography}}</p>
            <!-- <p>{{getData}}</p> -->


            <!-- <p>{{movieVideo}}</p> -->


        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios'

    export default{
        props: {
            id: String
        },
        data() {
            return{
                getPerson: "https://api.themoviedb.org/3/person/"+this.id+"?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US",
                getRelatedMovies: "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&with_people="+this.id+"&vote_count.gte=50",
                // getRelatedMovies: "https://api.themoviedb.org/3/person/"+this.id+"/movie_credits?api_key=788d8d340536c97e76b580d97ee6c8cc",
                person: Object,
                relatedMovies: Object,
                personPoster: "https://image.tmdb.org/t/p/original/",
            }
        },
        async mounted(){
            this.person = await axios.get(this.getPerson)
            .then((info)=>{
                // console.log(info)
                return info.data
            })
            .catch((error)=>{
                console.log(error)
            })

            this.relatedMovies = await axios.get(this.getRelatedMovies)
            .then(info=>{
                console.log(info)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
</script>
<style>

</style>