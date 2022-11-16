<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contact">Contact</router-link>
  </nav> -->
  <div class="main-container">
      <div class="sidebar">
        <div class="logo"></div>
        <div class="sidebar-category">
          <p class="sidebar-title">Menu</p>
          <a href="/">Home</a>
          <a href="/">Discovery</a>
          <a href="/">Comming soon</a>
        </div>
        <div class="sidebar-category">
          <p class="sidebar-title">Socials</p>
          <a href="/">Home</a>
          <a href="/">Discovery</a>
          <a href="/">Comming soon</a>
        </div>
        <div class="sidebar-category">
          <p class="sidebar-title">General</p>
          <a href="/">Settings</a>
          <a href="/">Log out</a>
        </div>
        <!-- <router-link :to="{name: 'ActorsPage'}">Actors</router-link> -->
      </div>
      <div class="center-container">
        <router-view/>
      </div>

      <div class="sidebar">
        <form action="/search" @submit.prevent >
          <input type="text" placeholder="Search" class="search" v-model="searchRequest" v-on:keyup.enter="show" >
        </form>

      </div>


   </div>
</template>


<script>
import {mapActions} from 'vuex'

export default({



 data(){
    return{
      searchRequest: this.$store.state.searchString,
      clickCount: 0,
      pageHeader: 0
    }
  },
  methods:{
    ...mapActions(["fetchMovies"]),

    show: function(){
      this.$store.commit('clearSearch')
      this.$store.commit('zero')
      console.log(this.searchRequest)
      // const payload = {
      //           title: this.searchRequest,
      //           pageNumb: this.pageHeader
      //       }
      // this.fetchMovies(payload)
      this.clickCount++
      console.log("clickCount", this.clickCount)
      console.log('pageHeader', this.pageHeader)
      this.$router.push({name: 'searchPage', params: {name: this.searchRequest, flag: this.clickCount, page: this.pageHeader}})

    }
  }
})
</script>


<style lang="scss">
body{
  background-color: #191A1F;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
p, a, h1{
  color: white;
  text-decoration: none;
}
.main-container{
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 60px 0;
  gap: 0 70px;
}
.sidebar{

}
.sidebar-category{
  display: grid;
  gap: 40px;
  margin-top: 60px;
}
.sidebar-category a, .sidebar-category p{
  font-size: 20px;
  line-height: 24px;
  text-align: left;
  padding-left: 60px;
  opacity: .3;
}
.sidebar-category p{
  text-transform: uppercase;
  font-weight: 500;
}

.center-container{

}
.search{
  background-color: transparent;
  border: 1px solid #626470;
  border-radius:30px;
  padding: 15px 0;
  padding-left: 30px;
  font-size: 20px;
  line-height: 24px;
  color: white;
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
