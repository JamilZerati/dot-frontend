<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <div>

          </div>
        </q-card-section>
        <q-card-section class="info-values">
          <div class="name-film">Nome do Filme</div>
          <div class="name-film">7</div>
          <div class="text-subtitle2">79,99</div>
        </q-card-section>
        <q-btn class="button-added" label="Adicionar" @click="addMovieToCart({name: 'SHREK 3', value: 10000})" />
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "CardFilms",
  data(){

  },
  methods: {
    addMovieToCart(movie){
      this.$store.dispatch("cart/addMovie", movie)

    },
    teste(){
      this.$axios.get();
    }
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
</style>
