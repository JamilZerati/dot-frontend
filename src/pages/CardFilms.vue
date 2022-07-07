<template>
  <q-page class="flex flex-center" >
    <div class="q-pa-md row items-start q-gutter-md">
      <!-- <q-infinite-scroll @load="infiniteHandler(page)" :offset="100"> -->
      <q-card class="my-card" v-for="(movie, index) in this.movies" :key="index">
        <q-card-section>
          <div>
          <img class="image-film" :src="renderFilm(movie.poster_path)" />
          </div>
        </q-card-section>
        <q-card-section class="info-values">
          <div class="name-film">{{movie.title}}</div>
          <div class="name-film">{{movie.vote_average}}</div>
          <div class="text-subtitle2">R$ {{(movie.price)}}</div>
        </q-card-section>
        <q-btn class="button-added" label="Adicionar" @click="addMovieToCart({name: movie.title, value: movie.price})" />
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
    }
    
  },
  created() {
      this.$axios.get("https://api.themoviedb.org/3/movie/popular?api_key=21b8377928741fe19614b01a1bbb49a3").then((res) => {
      
        this.movies = res.data.results
        this.movies.forEach(movie => {
          console.log('bom dia pessoal')
        movie.price = (Math.random() * 700/70).toFixed(2);
        })
       console.log(this.movies)
      });
    console.log(this.movies)
  },
  methods: {
    addMovieToCart(movie){
    
      this.$store.dispatch("cart/addMovie", movie)
    },
    renderFilm(poster_path){
      return "https://image.tmdb.org/t/p/original"+poster_path
    },
    // infiniteHandler(page){
    //    this.$axios.get(`https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=21b8377928741fe19614b01a1bbb49a3`)
    // .then((res) => {
    //   console.log("aquiii",res)
    //     if (res.data.results){
    //       this.page +=1
    //     res.data.results.forEach(movie => this.movies.push(movie))
    //       this.movies.push(res.data.results)
    //       console.log(this.movies)
    //     }
    //    });
    // }
  }
};
</script>

<style scoped>
.my-card {
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
  width: 250px;
}

</style>
