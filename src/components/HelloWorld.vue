<template>
  <div class="hello">


   <div class="card" v-for="item in api" :key="item.id">
    <div class="card__img">
      <router-link :to="{name: 'MoviePage', params: {id: item.id}}" >
          <img :src="apiImg+item.poster_path" alt="">
      </router-link>
    </div>
    <div class="card__bottom">
       <router-link :to="{name: 'MoviePage', params: {id: item.id}}" >{{item.title}}</router-link>
       <p>{{item.imdb_id}}</p>
      <p class="card__grade">{{item.vote_average}}</p>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    api: Object,
    apiImg: String
  },
  mounted(){

  },
  methods:{
    getResult(){
      console.log('asdsad')
    }
  },
  mounted(){
    // console.log(this.api)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  display: flex;
  gap: 30px 50px;
  flex-wrap: wrap;
  width: 1280px;
  margin: 0 auto;
  padding: 80px 0;
}
a{
  text-decoration: none;
  color: whitesmoke;
}
.card{
  display: flex;
  flex-direction: column;
  flex: 1 1 20%;
  background-color: #1d1d1d;
  box-shadow: 5px 0 10px black;
  transition: transform .3s ease-in-out;
}
.card:hover{
  transform: scale(1.1);
}
.card__img{
  width: 100%;
}
.card__title{
  font-size: 23px;
  line-height: 25px;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
  text-decoration: none;
  color: white;
}
.card__grade{
  padding: 5px;
  border: 1px solid white;
  font-size: 23px;
  line-height: 25px;
  color: white;
}
.card__img img{
  width: 100%;
}
.card__bottom{
  display: flex;
  align-items: center;
  padding: 20px 30px;
  gap: 20px;
  justify-content: space-between;
}


</style>
<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
