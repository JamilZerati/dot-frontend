<template>
  <q-page>
      <div class="q-pa-lg row items-start q-gutter-lg">
        <q-card
          class="my-card col-4"
          v-for="(movie, index) in $store.state.movies.movies.filter((movie) =>
            movie.title.toLowerCase().includes($store.state.movies.filter)
          )"
          :key="index"
        >
          <div>
            <q-btn
              class="favorite-button no-shadow"
              :class="[isFavorite(movie.id) ? 'favorite-mark' : '']"
              icon="favorite"
              @click="handleFavorite(movie.id)"
            />
            <img class="image-film" :src="renderFilm(movie.poster_path)" />
          </div>
          <q-card-section class="info-values">
            <div class="name-film">{{ movie.title }}</div>
            <div class="justify-evenly row">
              <div class="flex-center row">
                <q-icon name="star" />
                <div class="name-film">{{ movie.vote_average }}</div>
              </div>
              <div class="genre-name">{{ movie.genre }}</div>
            </div>
            <div class="text-subtitle2">R$ {{ movie.price }}</div>
          </q-card-section>
          <q-btn
            class="button-added"
            label="Adicionar"
            @click="
              addMovieToCart({
                id: movie.id,
                quantity: 1,
                title: movie.title,
                price: movie.price,
                poster_path: movie.poster_path,
              })
            "
          />
        </q-card>
      </div>
      <div v-if="$store.state.movies.movies.length" v-observe-visibility="infiniteHandler"/>
  </q-page>
</template>

<script>
export default {
  name: "CardFilms",
  data() {
    return {
      page: "2",
      genreIds: [],
    };
  },

  created() {
    this.$axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=21b8377928741fe19614b01a1bbb49a3"
      )
      .then((res) => {
        let tempMovies = res.data.results;
        this.$axios
          .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=21b8377928741fe19614b01a1bbb49a3&language=en-US"
          )
          .then((res) => {
            this.genreIds = res.data.genres;
            tempMovies.forEach((movie) => {
              movie.price = ((Math.random() * 700) / 70).toFixed(2);
              movie.genre = this.genreIds.find(
                (data) => data.id === movie.genre_ids[0]
              ).name;
            });
            console.log("store", tempMovies);
            this.$store.dispatch("movies/setMovies", tempMovies);
          });
      });
    console.log(this.movies);
  },
  methods: {
    infiniteHandler(isVisible) {
      console.log("infinite");
      if (!isVisible){return;}
       this.$axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?page=${this.page}&api_key=21b8377928741fe19614b01a1bbb49a3`
        )
        .then((res) => {
          this.page++;
          let tempMovies = res.data.results;
          tempMovies.forEach((movie) => {
            movie.price = ((Math.random() * 700) / 70).toFixed(2);
            movie.genre = this.genreIds.find(
              (data) => data.id === movie.genre_ids[0]
            ).name;
          });
          console.log("store", tempMovies);
          this.$store.dispatch("movies/setMovies", tempMovies);
        });
      console.log(this.movies);
      console.log("filterr", this.filter);
    },
    isFavorite(movie_id) {
      return this.$store.state.favorites.favorites.find(
        (movie) => movie.id === movie_id
      );
    },
    addMovieToCart(movie) {
      console.log(movie);
      this.$store.dispatch("cart/addMovie", movie);
    },
    renderFilm(poster_path) {
      return "https://image.tmdb.org/t/p/original" + poster_path;
    },
    handleFavorite(movie_id) {
      console.log("Procurano por ", movie_id);
      let movie = this.$store.state.favorites.favorites.find(
        (movie) => movie.id === movie_id
      );
      if (movie !== undefined) {
        this.$store.dispatch("favorites/removeFavorite", movie_id);
      } else {
        let movieToAdd = this.$store.state.movies.movies.find(
          (movie) => movie.id === movie_id
        );
        console.log("add", movieToAdd);
        this.$store.dispatch("favorites/addFavorite", movieToAdd);
      }
    },
  },
};
</script>

<style scoped>
.my-card {
  max-width: 250px;
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

.image-film {
  max-width: 100%;
  display: flex;
  align-items: stretch;
}

.genre-name {
  font-weight: 800;
}

.favorite-button {
  position: absolute;
  right: 0;
  box-shadow: none !important;
}

.favorite-mark {
  color: red;
}
</style>
