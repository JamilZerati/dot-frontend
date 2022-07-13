export default {

  addMovie({commit}, payload) {
    commit("ADD_MOVIE", payload)
    commit("CALCULATE_TOTAL", payload.price)

  },
  removeMovie({commit}, {id, price}) {
    commit("CALCULATE_TOTAL", -price)
    commit("REMOVE_MOVIE", {id})
  },
  removeAllFromCart({commit}) {
    commit("REMOVE_ALL_FROM_CART");
  }

}
