export default {

  addMovie({ commit }, payload){
    commit("ADD_MOVIE", payload)
    commit("CALCULATE_TOTAL", payload.value)

  },
  removeMovie({ commit }, {id, value}){
    commit("CALCULATE_TOTAL", -value)
    commit("REMOVE_MOVIE", {id})
  },
  removeAllFromCart({ commit }) {
    commit("REMOVE_ALL_FROM_CART");
  }

}
