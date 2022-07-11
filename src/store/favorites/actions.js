export default {

  addFavorite({ commit }, id){
    commit("ADD_FAVORITE", id)
  },
  removeFavorite({ commit }, id){
    commit("REMOVE_FAVORITE", id)
  }
}
