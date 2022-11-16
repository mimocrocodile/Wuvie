<template>
    <div class="movie-act-container">
            <div class="poster">
                <img v-if="apiContainer.profile_path"  :src="personPoster+apiContainer.profile_path" alt="">
                <img v-else :src="personPoster+apiContainer.poster_path" alt="">
            </div>
            <div v-if="apiContainer.name" class="info">
                <p class="movie-act__title">{{apiContainer.name}}</p>
                <p class="movie-act__date">{{apiContainer.birthday}}</p>
                <p class="movie-act__text">{{apiContainer.biography}}</p>
            </div>
            <div v-else class="info">
                <p class="movie-act__title">{{apiContainer.title}}</p>
                <p class="movie-act__date">{{apiContainer.release_date}}</p>
                <div class="movie-act__countries" >
                    <p v-for="item, id in apiContainer.production_countries" :key='id'>{{item.name}}</p>
                </div>
                <p class="movie-act__text">{{apiContainer.overview}}</p>
            </div>

    </div>
    <div class="movie-act__additional">
        <div class="movie-list" v-if="apiContainer.name">
                <div  v-for="item, id in this.apiRelated" :key="id">
                    <router-link :to="{name: 'MoviePage', params: {id: item.id} }"> {{item.title}}</router-link>
                </div>
            </div>
            <div class="movie-act__cast" v-else>
                <p>Cast</p>
                <div class="movie-act__castlist">
                    <div  v-for="item, id in this.apiRelated" :key="id">
                        <img :src="personPoster+item.profile_path" alt="">
                        <router-link :to="{name: 'ActorPage', params: {id: item.id} }"> {{item.name}}</router-link>
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

<style scss>
    .movie-act-container{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap:  50px;
    }
    .info{
        display: flex;
        flex-direction: column;
        gap: 40px;
        justify-content: center;
    }
    .movie-act__title{
        font-size: 36px;
        line-height: 40px;
    }
    .movie-act__text{
        font-size: 24px;
        line-height: 38px;
    }
    .movie-act__countries{
        display: flex;
        gap: 10px;
        justify-content: center;

    }
    .movie-act__countries p, .movie-act__date{
        font-size: 18px;
        line-height: 20px;
        opacity: .3;
    }
    .poster img{
        width: 100%;
        height: 100%;
    }
    .movie-act__additional{
        margin-top: 70px;
    }
    .movie-act__cast>p{
        font-size: 36px;
        line-height: 40px;
        font-weight: 600;
        text-align: left;
    }
    .movie-act__castlist{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 150px;
        gap: 50px;
        margin-top: 30px;
    }
    .movie-act__castlist div{
        display: flex;
        align-items: center;
        gap: 10px;
        height: 100%;

    }
    .movie-act__castlist img{
        max-width: 150px;
        max-height: 150px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        opacity: .8;
        transition: all .3s ;
        cursor:pointer;
    }
    .movie-act__castlist img:hover{
        opacity: 1;
    }
    .movie-act__castlist a{
        font-size: 20px;
        line-height: 24px;
        white-space: nowrap;
    }
    .movie-act__castlist a:hover{
        opacity: .8;
    }
</style>