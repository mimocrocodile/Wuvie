import { createStore } from 'vuex'
import createdPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
export default createStore({
  state: ()=> {
   return {
    searchString: "",
    searchApi: [],
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
     async fetchMovies(ctx, payload){
      let res = []
       await axios.get("https://api.themoviedb.org/3/search/movie?sort_by=vote_average.desc&api_key=788d8d340536c97e76b580d97ee6c8cc&query="+payload.title+"&page="+payload.pageNumb)
      .then(info=>{
          console.log(info)
          res = info.data.results
      })
      .catch(error=>{
          console.log(error)
      })

      ctx.commit('updateMovieList', res)
      ctx.commit('ChangeSearch', payload.title)
    }
  },
  mutations: {
    ChangeSearch(state, newSearch){
      state.searchString = newSearch
    },
    updateMovieList(state, res){
      state.searchApi= [...state.searchApi, ...res]
    },
    clearSearch(state){
      state.searchApi = []
    }
  },

  modules: {
  }
})
