import { createStore } from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

export default createStore({
  state: ()=> {
   return {
    searchString: ""
  }
  },
  plugins:[createdPersistedState()],
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
