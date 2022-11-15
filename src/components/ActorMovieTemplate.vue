<template>
<div>
     <div class="container">

        <div class="poster">
            <img v-if="apiContainer.profile_path"  :src="personPoster+apiContainer.profile_path" alt="">
            <img v-else :src="personPoster+apiContainer.poster_path" alt="">
        </div>
        <div v-if="apiContainer.name" class="info">
            <p>{{apiContainer.name}}</p>
            <p>{{apiContainer.birthday}}</p>
            <p>{{apiContainer.biography}}</p>
        </div>
          <div v-else class="info">
            <p>{{apiContainer.title}}</p>
            <p>{{apiContainer.release_date}}</p>
            <p>{{apiContainer.overview}}</p>
        </div>
        <div class="movie-list" v-if="apiContainer.name">
            <div  v-for="item, id in this.apiRelated" :key="id">
                <router-link :to="{name: 'MoviePage', params: {id: item.id} }">{{id}} {{item.title}}</router-link>
            </div>
        </div>
        <div class="movie-list" v-else>
            <div  v-for="item, id in this.apiRelated" :key="id">
                <router-link :to="{name: 'ActorPage', params: {id: item.id} }">{{id}} {{item.name}}</router-link>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    name: "ActorMovieTemplate",
    props:{
        apiContainer: Object,
        apiRelated: Object,
    },
    data(){
        return{
            personPoster: "https://image.tmdb.org/t/p/original/",
        }

    },

}
</script>

<style scoped>
    .block{
        padding-top: 140px;

    }
</style>