<template >
    <h1>joj</h1>
    <h1>{{$store.state.searchString}}</h1>
    <div class="search-result" v-for="item, id in searchResult" :key="id">
        <img :src="apiImg+item.poster_path" class="search-img" alt="">
        <router-link :to="{name: 'mpage', params: {id: item.id}}" class="search-title">{{item.title}}</router-link>
    </div>
    <div ref="observer" class="observer">Observer</div>
</template>

<script>
import axios from "axios"
export default{

    data(){
        return{
            searchResult: [],
            totalPages: 0,
            relatedMovies: Object,
        
            apiImg: "https://image.tmdb.org/t/p/original/",
            page: 0,
            changer: this.flag
        }

    },
    props:{
        flag: String,
        name: String,
    },
    methods:{
         getBest: async function(start){
                // while(this.page<this.totalPages)
                    this.page++
                    if(start){
                        this.page = 1
                        this.searchResult = []
                        console.log('pidor')
                    }
                    const response = await axios.get("https://api.themoviedb.org/3/search/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&query="+this.$store.state.searchString+"&page="+this.page)
                    .then(info=>{
                        console.log(info)
                        return info.data.results
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                    console.log("response",response)
                    this.searchResult = [...this.searchResult, ...response]



                //    this.searchResult.sort((a,b) => a.vote_average.localeCompare(b.vote_average))
                   console.log("result",this.searchResult)
            }
    },
    watch:{
        flag: {
            handler:function(){
                console.log("the best")
                this.getBest(1)
            },
            deep: true
            
            } 
    },  
    async mounted(){
        console.log(this.$store.state.searchString)
        this.getBest()
        // this.searchResult = await axios.get("https://api.themoviedb.org/3/search/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&query="+this.$store.state.searchString+"&page="+1)
        // .then(info=>{
        //     this.totalPages = info.data.total_pages
        //     console.log(this.totalPages)
        //     return info.data.results
        // })
        // .catch(error =>{
        //     console.log(error)
        // })
        const options = {
        rootMargin: '0px',
        threshold: 1.0
        }
        const callback = (entries, observer) => {
        console.log(entries)
        if(entries[0].isIntersecting){
            console.log("FASDA")
            this.getBest()
        }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)
    }
}
</script>

<style scoped>
    .search-result{
        display: flex;
        gap: 40px;
    }
    .search-img{
        width: 50px;
        height: 100px;
    }
</style>