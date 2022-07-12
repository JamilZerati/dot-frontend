export default {
  ADD_FAVORITE(state, payload) {
    console.log(payload)
    state.favorites.push(payload);
  },
  REMOVE_FAVORITE(state, payload) {
    console.log('remover!! payload', payload)
    console.log("remover", state.favorites);
    state.favorites = state.favorites.filter(
      (movie) => movie.id !== payload.id
    );
    console.log(state.favorites)
  },
};
