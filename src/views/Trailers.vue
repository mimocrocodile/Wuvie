<template>
    <div class="trailers">
        <div class="trailer" v-for="item, id in movieVideo" :key="id">
            <iframe  :src="'http://www.youtube.com/embed/'+item.key " frameborder="0" allowfullscreen></iframe>
        </div>
       
    </div>
     <div ref="observer" class="observer">Observer</div>
</template>

<script>
import axios from "axios"
    export default{
        name: "TrailerPage",
        props:{
            ginfo:{
                type: String,
                required: true
            }
        },
        data(){
            return{
                 getVideo: "https://api.themoviedb.org/3/movie/"+this.ginfo+"/videos?api_key=788d8d340536c97e76b580d97ee6c8cc",
                 movieVideo: [],
                 count: 0,
                 oldcount: 0,
                 breakPoint: 0,
                 limit: 0,
            }
        },
        methods:{
            getMovie: async function(point, oldpoint){
                if(this.breakPoint == 0){
                    const response = await axios.get(this.getVideo)
                    .then((info)=>{
                        console.log(info.data)
                        point > info.data.results.length ? (point = info.data.results.length, this.breakPoint += 1) : null
                        return info.data.results.filter((item, id)=> id>= oldpoint && id<=point)
                    })
                    .catch((error)=>{
                        console.log(error)
                        return error
                    })
                
                    this.movieVideo = [...this.movieVideo, ...response]
                    console.log(this.movieVideo)
                }
            
            }
        },
         mounted(){
            const options = {
                rootMargin: '0px',
                threshold: 1.0
            }
            const callback = (entries, observer) => {
                if(entries[0].isIntersecting){
                    this.count += 5
                    this.getMovie(this.count, this.oldcount, )
                    this.oldcount = this.count+1
                }
            }
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer)
    }
}
 
</script>

<style scoped>
    .trailers{
        display: flex;
        max-width: 1280px;
        margin:  0 auto;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 30px;
    }
    .trailer{
        display: flex;
        flex: 1 1 40%;
        height: 400px;
    }
    iframe{
        width: 100%;
    }
</style>