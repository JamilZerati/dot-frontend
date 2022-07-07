export default {

  addMovie({ commit }, payload){
    commit("ADD_MOVIE", payload)
    commit("CALCULATE_TOTAL", payload.value)

  },

  removeMovie({ commit }, payload){
    commit("REMOVE_MOVIE", payload)
    commit("CALCULATE_TOTAL", (-1)*payload.value)
  }

}
