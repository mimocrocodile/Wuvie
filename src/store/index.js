import { createStore } from 'vuex'

export default createStore({
  state: ()=> {
   return {
    searchString: ""
  }
  },
  getters: {
    GetSearch(state){
      return state.searchString
    }
  },
  mutations: {
    ChangeSearch(state, newSearch){
      console.log(newSearch)
      state.searchString = newSearch
    }
  },
  actions: {
  },
  modules: {
  }
})
