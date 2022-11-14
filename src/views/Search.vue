<template >
    <div class="container">
        <h1>Результаты поиска по запросу {{$store.state.searchString}}</h1>
        <div :key="changer">
        <div class="search">
            <div class="search-result" v-for="item, id in listMovies" :key="id">
                <img :src="apiImg+item.poster_path" class="search-img" alt="">
                <div class="search-info">
                    <router-link :to="{name: 'mpage', params: {id: id}}" class="search-title">{{id}} {{item.title}}</router-link>
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
    props:{
        flag: String,
        name: String,
        page: String,
    },
    data(){
        return{
            searchResult: [],
            totalPages: 0,
            relatedMovies: Object,
            apiImg: "https://image.tmdb.org/t/p/original/",
            inputString: "",
            changer:0,
            newPage: ''
        }
    },

    methods:{
        ...mapActions(["fetchMovies"]),
        getPage(){
            this.newPage = this.$store.getters.getPage;
        },
        getVuex: function(){

              this.$store.commit("zeroPlus")
               console.log("newPage", this.newPage)
            const payload = {
                title: this.name,
                pageNumb: this.newPage
            }

            this.fetchMovies(payload)
        },



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
        },

    },
     mounted(){
        console.log(this.newPage)
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
        if(entries[0].isIntersecting){
            this.getPage()
            this.getVuex()
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



