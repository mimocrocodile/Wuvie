<template >
    <div class="container">
        <h1>Результаты поиска по запросу {{$store.state.searchString}}</h1>
        <div :key="changer">
        <div class="search">
            <div class="search-result" v-for="item, id in listMovies" :key="id">
                <img :src="apiImg+item.poster_path" class="search-img" alt="">
                <div class="search-info">
                    <router-link :to="{name: 'mpage', params: {id: item.id}}" class="search-title">{{id}} {{item.title}}</router-link>
                    <p>{{item.overview}}</p>
                </div>

            </div>
        </div>

        </div>

        <div ref="observer" class="observer"></div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default{

    data(){
        return{
            searchResult: [],
            totalPages: 0,
            relatedMovies: Object,
            apiImg: "https://image.tmdb.org/t/p/original/",
            page: 0,
            inputString: "",
            changer:0
        }
    },
    props:{
        flag: String,
        name: String,
    },
    methods:{
        //  getBest: async function(){
        //     this.page++
        //     this.searchResult = [...this.searchResult, ...response]
        //     },
        // refresh: function (){
        //     this.changer += 1
        //     this.searchResult = []
        //     this.page = 0
        //     this.getBest()
        // },
        ...mapActions(["fetchMovies"])

    },
    watch:{
        flag: {
            handler:function(){
                // this.refresh()
            },
            deep: true
            }
    },
    computed:{
        listMovies(){
            return this.$store.getters.getMovies;
        }
    },
    async mounted(){
        console.log(this.$store.state.searchString)
        const options = {
        rootMargin: '0px',
        threshold: 1.0
        }
        const callback = (entries, observer) => {
        if(entries[0].isIntersecting){
            this.page++
            console.log(this.page)
            this.fetchMovies(this.name, this.page)
}
        };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    }
}
</script>

<style scoped>
    .container{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .search-title{
        font-size: 40px;
        line-height: 48px;
    }
    .search-title + p{
        font-size: 30px;
        line-height: 38px;
        margin-top: 30px;
    }
    .search{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .search-title{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-result{
        display: flex;
        gap: 40px;
    }
    .search-img{
        width: 300px;
        height: auto;
    }
</style>



