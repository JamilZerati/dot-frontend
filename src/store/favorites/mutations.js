export default {
  ADD_FAVORITE(state, payload) {
    state.favorites.push(payload);
  },
  REMOVE_FAVORITE(state, payload) {
    state.favorites = state.favorites.filter(
      (movie) => movie.id !== payload.id
    );
  },
};
