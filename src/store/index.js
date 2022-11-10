import { createStore } from 'vuex'
import createdPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
export default createStore({
  state: ()=> {
   return {
    searchString: "",
    searchApi: []
  }
  },
  plugins:[createdPersistedState()],
  getters: {
    GetSearch(state){
      return state.searchString
    },
    getMovies(state){
      return state.searchApi
    }
  },
  actions: {
    async fetchMovies(ctx, inputString, page){
      console.log(ctx, inputString, page)
      const res = await axios.get("https://api.themoviedb.org/3/search/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&query="+inputString+"&page="+page)
      .then(info=>{
          console.log(info)
          return info.data.results
      })
      .catch(error=>{
          console.log(error)
      })

      ctx.commit('updateMovieList', res)
    }
  },
  mutations: {
    ChangeSearch(state, newSearch){
      state.searchString = newSearch
    },
    updateMovieList(state, res){
      state.searchApi = res
    },
    clearSearch(state){
      state.searchApi = []
    }
  },

  modules: {
  }
})
