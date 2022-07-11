<template>
  <q-layout view="lHh LpR lFf">
      <q-header elevated class="bg-black">
        <div class="header-main">
          <div>
            <q-toolbar-title>LOGO</q-toolbar-title>
          </div>
          <div>
            <q-input class="bg-white" outlined type="text" label="Pesquisar" />
          </div>
          <div>
             <q-btn
              flat
              @click="drawerFavorite = !drawerFavorite"
              round
              dense
              icon="favorite"
            />
            <q-btn
              flat
              @click="drawerCart = !drawerCart"
              round
              dense
              icon="shopping_cart"
            />
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
            <div v-for="(favorite, index) in this.$store.state.favorites.favorites" :key="index">
              aa
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
        <q-scroll-area style="height: 82vh;">
          <div class="q-pa-sm">
            <q-toolbar-title style="font-weigth: 500;" class="flex row justify-between">
              <div class="cart-style">Meu Carrinho</div>
              <q-btn @click="removeAllFromCart()">Esvaziar</q-btn>
            </q-toolbar-title>
            <div v-for="(item, index) in $store.state.cart.items" :key="index">
              <div class="flex row justify-between cart-items q-pa-sm center items-center">
                <img class="image-film-cart" :src="renderFilm(item.poster_path)" />
                <div class="align-cen">{{item.name}}</div>
                <div>{{item.quantity}}</div>
                <div>R$ {{item.value}}</div>
                <q-btn size=1em icon="delete" @click="removeMovie(item.id, item.quantity*item.value)"></q-btn>
              </div>
            </div>
          </div>
        </q-scroll-area>
                  <span>Total: R$ {{($store.state.cart.total).toFixed(2)}}</span>
          <router-link to="/FinishItem">
            <q-btn class="button-added" label="Finalizar"> </q-btn>
          </router-link>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      drawerCart: false,
      drawerFavorite: false
    }
  },

  methods:{
    renderFilm(poster_path){
      return "https://image.tmdb.org/t/p/original"+poster_path
    },
    removeMovie(id, value){
      this.$store.dispatch("cart/removeMovie", {id, value})
    },
    removeAllFromCart(){
      this.$store.dispatch("cart/removeAllFromCart", );
    },
  }
}
</script>

<style scoped>
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

.cart-style{
  font-size: 1em;
}
.cart-items{
font-size: 0.75em;
}

.image-film-cart{
  max-width: 50px;
  max-height: 50px;
}
</style>
