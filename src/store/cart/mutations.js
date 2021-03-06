export default {

  ADD_MOVIE(state, payload) {
    let alreadyExists = state.items.find(movie => movie.id === payload.id)
    if (alreadyExists) {
      alreadyExists.quantity++;
    } else {
      if (payload.quantity === undefined) {
        payload.quantity = 1;
      }
      state.items.push(payload)
    }
  },
  REMOVE_MOVIE(state, payload) {
    state.items = state.items.filter(movie => movie.id !== payload.id)
  },
  CALCULATE_TOTAL(state, payload) {
    state.total += parseFloat(payload);
  },
  REMOVE_ALL_FROM_CART(state, payload) {
    state.items = [];
    state.total = 0;
  }
}
