export default{

  SET_MOVIES(state, payload){
      state.movies = state.movies.concat(payload)
  },
  FILTER_MOVIES(state, payload){
    state.filter = payload.title
    console.log(state.movies.filter(movie => movie.title.includes(payload.title)))
    //return state.movies.filter(movie => movie.title.includes(payload.title))
  }
}
