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


        </div>
        <div class="movie-list">
            <div v-for="item, id in this.relatedMovies" :key="id">
                <router-link :to="{name: 'mpage', params: {id: item.id} }">{{id}} {{item.title}}</router-link>
            </div>
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
                getRelatedMovies: "https://api.themoviedb.org/3/discover/movie?api_key=788d8d340536c97e76b580d97ee6c8cc&with_people="+this.id+"",
                // getRelatedMovies: "https://api.themoviedb.org/3/person/"+this.id+"/movie_credits?api_key=788d8d340536c97e76b580d97ee6c8cc",
                person: Object,
                relatedMovies: Object,
                totalPages: 0,
                page: 0,
                personPoster: "https://image.tmdb.org/t/p/original/",
            }
        },
        methods:{
            getBest: async function(){
                // while(this.page<this.totalPages)
                for(let i = 2; i<=this.totalPages; i++){

                    const response = await axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&with_people="+this.id+"&vote_count.gte=1000&page="+i)
                    .then(info=>{
                        console.log(info)
                        return info.data.results
                    })
                    .catch(error=>{
                    })
                    this.relatedMovies = [...this.relatedMovies, ...response]

                }
                   console.log(this.relatedMovies)
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

            this.totalPages = await axios.get(this.getRelatedMovies)
            .then(info=>{
                return info.data.total_pages
            })
            .catch(error=>{
                console.log(error)
            })


            this.relatedMovies = await axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&with_people="+this.id+"&vote_count.gte=1000&page="+1)
            .then(info=>{
                console.log(info)
                return info.data.results
            })
            .catch(error=>{
                console.log(error)
            })
               this.getBest()
        }
    }
</script>
<style>

</style>