<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contact">Contact</router-link>
  </nav> -->
  <header>
    <div>
      <a href="/">Wuvie</a>
      <form action="/search" @submit.prevent >
        <input type="text" class="search" v-model="searchRequest" v-on:keyup.enter="show" >
      </form>
    </div>

  </header>

  <router-view/>
</template>


<script>
import {mapActions} from 'vuex'
export default({

 data(){
    return{
      searchRequest: this.$store.state.searchString,
      clickCount: 0,
      pageHeader: 1
    }
  },
  methods:{
    ...mapActions(["fetchMovies"]),

    show: function(){
      this.$store.commit('clearSearch')
      console.log(this.searchRequest)
      const payload = {
                title: this.searchRequest,
                pageNumb: this.pageHeader
            }
      this.fetchMovies(payload)
      this.clickCount++
      console.log('pageHeader', this.pageHeader)
      this.$router.push({name: 'searchPage', params: {name: this.searchRequest, flag: this.clickCount, page: this.pageHeader}})
    
    }
  }
})
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  background-color: #31242c;

}
p, a, h1{
  color: white;
  text-decoration: none;
}
header{
  width: 100%;
  background-color: #301B28;
  padding: 30px 0;
  display: flex;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 1);
}
header a{
  color: white;
  font-size: 50px;

  font-weight: 700;
  text-decoration: none;
}
header div{
  width: 1400px;
  margin: 0 auto;
  display: flex;
}
form{
  margin-left: auto;
  margin-right: 100px;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
