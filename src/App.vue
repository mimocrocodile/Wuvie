<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contact">Contact</router-link>
  </nav>
  <form action="/search" @submit.prevent >
    <input type="text" class="search" v-model="searchRequest" v-on:keyup.enter="show" >
  </form>
  <router-view/>
</template>


<script>

export default({

 data(){
    return{
      searchRequest: ''
    }
  },
  methods:{
    show: function(){
      this.$store.commit('ChangeSearch', this.searchRequest)
      this.$router.push('/search')
      // console.log(this.searchRequest)
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
