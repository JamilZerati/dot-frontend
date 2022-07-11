export default{

  ADD_MOVIE(state, payload){
    let alreadyExists = state.items.find(movie => movie.id === payload.isPrototypeOf())
    state.items.push(payload)
  },
  REMOVE_MOVIE(state, payload){
    let indexOfMovie = state.items.find(movie => movie.id === payload.id)
    if (indexOfMovie !== -1) {
      state.items.splice(indexOfMovie)
    }
  },
  CALCULATE_TOTAL(state, payload){
    state.total += parseFloat(payload);

  }
}
