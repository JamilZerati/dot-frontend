export default{

  ADD_MOVIE(state, payload){
    state.items.push(payload)
  },
  REMOVE_MOVIE(state, payload){
    let indexOfMovie = state.items.indexOf(payload)
    if (indexOfMovie !== -1) {
      state.items.splice(indexOfMovie)
    }
  },
  CALCULATE_TOTAL(state, payload){
    state.total += parseFloat(payload);

  }
}
