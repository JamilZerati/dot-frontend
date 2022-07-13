export default {

  addFavorite({commit}, movie) {
    commit("ADD_FAVORITE", movie)
  },
  removeFavorite({commit}, id) {
    commit("REMOVE_FAVORITE", {id})
  }
}
