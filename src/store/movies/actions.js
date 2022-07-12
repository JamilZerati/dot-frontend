export default {

  setMovies({ commit }, payload){
    commit("SET_MOVIES", payload)
  },
  filterMovies({ commit }, payload){
    console.log("filtrando com", payload)
    commit("FILTER_MOVIES", payload)
  }
}
