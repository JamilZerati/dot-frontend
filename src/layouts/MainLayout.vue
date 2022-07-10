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
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area >
          <div class="q-pa-sm">
            <q-toolbar-title>Meus favoritos</q-toolbar-title>
            <span>{{$store.state.cart.items}}</span>
          </div>
        </q-scroll-area>
        <q-footer>
          <span>{{$store.state.cart.total}}</span>
          <router-link to="/FinishItem">
            <q-btn class="button-added" label="Finalizar"> </q-btn>
          </router-link>
        </q-footer>
      </q-drawer>

      <q-drawer
        side="right"
        v-model="drawerCart"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area style="height: 82vh;">
          <div class="q-pa-sm">
            <q-toolbar-title>Meu Carrinho</q-toolbar-title>
            <span>{{$store.state.cart.items}}</span>
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

</style>
