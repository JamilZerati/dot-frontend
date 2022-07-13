export default {

  setMovies({ commit }, payload){
    commit("SET_MOVIES", payload)
  },
  filterMovies({ commit }, payload){
    commit("FILTER_MOVIES", payload)
  }
}
