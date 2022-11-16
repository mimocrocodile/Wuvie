<template>

    <div class="block">
        <div class="card" v-for="item,id in actorsArr" :key="id">
            <div class="actor-img">
                <img :src="this.apiImg+item.profile_path" alt="">
            </div>
            <div class="actor-bottom">
                <router-link :to="{name: 'ActorPage', params: {id: item.id}}">{{item.name}}</router-link>
            </div>
        </div>
    </div>
    <div ref="observer"  class="observer"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "ActorsPage",
  data() {
    return {
      api: "https://api.themoviedb.org/3/person/popular/?api_key=788d8d340536c97e76b580d97ee6c8cc&language=en-US&page=",
      actorsArr: [],
      apiImg: "https://image.tmdb.org/t/p/original/",
      page: 1,
    };
  },
  methods: {
    getActors: async function () {
      const res = await axios(this.api + this.page)
        .then((info) => {
            console.log(info.data.results)
            return info.data.results
        })
        .catch((error) => {
          console.log(error);
        });
      this.actorsArr = [...this.actorsArr, ...res]
      this.page++;
      console.log(this.actorsArr)
    },
  },
  async mounted() {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log("test")
        this.getActors();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>

<style scoped>
.block{
    width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}
.actor-bottom{
    position: absolute;
    bottom: 0;
}
.actor-bottom a{
    font-size: 20px;
    line-height: 32px;
    text-shadow: 1px 1px 2px black;
}
.card{
    position: relative;
}
.card img{
    width: 100%;
}
</style>