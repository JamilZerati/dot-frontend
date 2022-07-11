<template>
  <q-page class="flex flex-center" >
    <div class="q-pa-md row items-start q-gutter-md">
      <!-- <q-infinite-scroll @load="infiniteHandler(page)" :offset="100"> -->
      <q-card class="my-card" v-for="(movie, index) in this.movies" :key="index">
        <div>
          <q-btn class="favorite-button" icon="favorite" @click="handleFavorite(movie.id)"/>
          <img class="image-film" :src="renderFilm(movie.poster_path)" />

        </div>
        <q-card-section class="info-values">
          <div class="name-film">{{movie.title}}</div>
          <div class="justify-evenly row">
            <div class="flex-center row">
            <q-icon name="star"/>
            <div class="name-film">{{movie.vote_average}}</div>
            </div>
            <div class="genre-name">{{movie.genre}}</div>
          </div>
          <div class="text-subtitle2">R$ {{(movie.price)}}</div>
        </q-card-section>
        <q-btn class="button-added" label="Adicionar" @click="addMovieToCart({id: movie.id, quantity: 1, name: movie.title, value: movie.price, poster_path: movie.poster_path, quantity:1})" />
      </q-card>
      <!-- </q-infinite-scroll> -->
    </div>

  </q-page>
</template>

<script>
export default {
  name: "CardFilms",
  data(){
    return{
      page: "1",
      movies: [],
      genreIds: []
    }

  },
  created() {
      this.$axios.get("https://api.themoviedb.org/3/movie/popular?api_key=21b8377928741fe19614b01a1bbb49a3").then((res) => {
        this.movies = res.data.results
        this.$axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=21b8377928741fe19614b01a1bbb49a3&language=en-US").
        then((res) =>{
          this.genreIds = res.data.genres;
          this.movies.forEach(movie => {
          movie.price = (Math.random() * 700/70).toFixed(2);
          movie.genre = this.genreIds.find(data => data.id === movie.genre_ids[0]).name
        }
        )})
      console.log(this.movies)
      });
    console.log(this.movies)
  },
  methods: {
    addMovieToCart(movie) {

      this.$store.dispatch("cart/addMovie", movie)
    },
    renderFilm(poster_path) {
      return "https://image.tmdb.org/t/p/original" + poster_path
    },
    handleFavorite(movie_id) {
      console.log("Procurano por " , movie_id)
      let alreadyAdd = this.$store.state.favorites.favorites.indexOf(movie_id)
      if (alreadyAdd !== -1){
        this.$store.dispatch("favorites/removeFavorite", movie_id);
      } else {
        this.$store.dispatch("favorites/addFavorite", movie_id);
      }
    },
  }
}
</script>

<style scoped>
.my-card {

  max-width: 400px;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgb(124, 120, 120);
  color: #fff;
}
.info-values {
  background-color: #fff;
  color: #000;
  text-align: center;
}
.button-added {
  width: 100%;

  background-color: rgb(96, 32, 121);
}
.name-film {
  font-weight: 900;
  font-size: medium;
}

.image-film{
  max-width: 100%;
  display: flex;
  align-items: stretch;
}

.genre-name{
  font-weight: 800;
}
.favorite-button{
  position: absolute;
  right: 0;
}

</style>
