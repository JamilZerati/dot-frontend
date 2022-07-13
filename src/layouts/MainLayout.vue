<template>
  <q-layout view="lHh LpR lFf">
    <q-header elevated class="bg-black">
      <div class="header-main">
        <div>
          <router-link style="text-decoration: none; color: white" to="/">
            <q-toolbar-title>LOGO</q-toolbar-title>
          </router-link>
        </div>
        <div class="center row search-bar ">
          <q-input
            class="bg-white search-input col-md-8"
            @keyup.enter="filterMovies(model.search)"
            outlined
            v-model="model.search"
            label="Pesquisar"
          >
            <q-btn
              class="search-icon btn--no-hover col-md-auto"
              icon="search"
              style="color: black; background: transparent;"
              unelevated
              flat
              @click="filterMovies(model.search)"
            />
          </q-input>
        </div>
        <div>
          <q-btn
            flat
            @click="handleDrawer('drawerFavorite')"
            round
            dense
            icon="favorite"
          />
          <q-btn
            flat
            @click="handleDrawer('drawerCart')"
            round
            dense
            icon="shopping_cart"
          >
            <q-badge color="orange" floating>
              {{ $store.state.cart.items.length }}
            </q-badge>
          </q-btn>
        </div>
      </div>
    </q-header>
    <q-drawer
      side="right"
      v-model="drawerFavorite"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
    >
      <div class="q-pa-sm">
        <q-toolbar-title>Meus favoritos</q-toolbar-title>
        <div
          v-for="(favorite, index) in this.$store.state.favorites.favorites"
          :key="index"
          class="flex row justify-between cart-items q-pa-sm center items-center"
        >
          <img class="image-film-cart-fav" :src="renderFilm(favorite.poster_path)"/>
          <span>{{ favorite.title }}</span>
          <span>R$ {{ favorite.price }}</span>
          <q-btn
            icon="shopping_cart"
            dense
            @click="addMovieToCart(favorite.id)"
            size="1em"
            color="green"
            flat
          >
            <q-tooltip>Adicionar ao carrinho</q-tooltip>
          </q-btn>
          <q-btn
            icon="delete"
            dense
            flat
            size="1em"
            @click="removeFromFavorite(favorite.id)">
            <q-tooltip>Remover dos favoritos</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-drawer>

    <q-drawer
      side="right"
      v-model="drawerCart"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
    >
      <q-scroll-area style="height: 84vh">
        <div class="q-pa-sm">
          <q-toolbar-title
            style="font-weigth: 500"
            class="flex row justify-between"
          >
            <div class="cart-style">Meu Carrinho</div>
            <q-btn flat @click="removeAllFromCart()">Esvaziar</q-btn>
          </q-toolbar-title>
          <div v-for="(item, index) in $store.state.cart.items" :key="index">
            <div
              class="flex row justify-between cart-items q-pa-sm center items-center"
            >
              <img
                class="image-film-cart-fav"
                :src="renderFilm(item.poster_path)"
              />
              <div class="align-center">{{ item.title }}</div>
              <div>{{ item.quantity }}</div>
              <div>R$ {{ item.price }}</div>
              <q-btn
                size="1em"
                icon="delete"
                flat
                @click="removeMovie(item.id, item.quantity * item.price)"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-scroll-area>
      <span>Total: R$ {{ $store.state.cart.total.toFixed(2) }}</span>
      <router-link to="/FinishItem">
        <q-btn class="button-added" label="Finalizar"></q-btn>
      </router-link>
    </q-drawer>

    <q-page-container>
      <router-view v-bind="{ filterName }"/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      showCartText: false,
      drawerCart: false,
      drawerFavorite: false,
      model: {
        search: "",
      },
      filterName: "",
    };
  },

  methods: {
    renderFilm(poster_path) {
      return "https://image.tmdb.org/t/p/original" + poster_path;
    },
    addMovieToCart(movie_id) {
      let movie = this.$store.state.movies.movies.find(
        (movie) => movie.id === movie_id
      );
      this.$store.dispatch("cart/addMovie", movie);
    },
    removeMovie(id, price) {
      this.$store.dispatch("cart/removeMovie", {id, price});
    },
    removeAllFromCart() {
      this.$store.dispatch("cart/removeAllFromCart");
    },
    handleDrawer(drawer) {
      if ("drawerCart" === drawer) {
        this.drawerFavorite = false;
        this.drawerCart = !this.drawerCart;
      } else {
        this.drawerCart = false;
        this.drawerFavorite = !this.drawerFavorite;

      }
    },
    filterMovies(title) {
      this.$store.dispatch("movies/filterMovies", {
        title: title.toLowerCase(),
      });
    },
    removeFromFavorite(movie_id) {
      this.$store.dispatch("favorites/removeFavorite", movie_id);
    },
  },
};
</script>

<style scoped>
.search-input {
  flex: 5;
}

.header-main {
  background-color: rgb(77, 207, 164);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.button-added {
  width: 100%;
  color: #fff;
  background-color: rgb(96, 32, 121);
}

.cart-style {
  font-size: 1em;
}

.cart-items {
  font-size: 0.75em;
}

.image-film-cart-fav {
  max-width: 45px;
  max-height: 45px;
}

</style>
