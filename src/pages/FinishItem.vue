<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <h4 style="margin-left: 55px">Finalizar</h4>
      <div class="row justify-around items-start">
        <div class="col-5">
          <div class="row justify-between items-start" style="height: 50vh">
            <q-input
              class="col-12"
              outlined
              v-model="form.name"
              label="Nome Completo"
            />
            <q-input class="col-5" outlined v-model="form.cpf" label="CPF" />
            <q-input class="col-5"
                     outlined
                     v-model="form.phone"
                     label="Celular"
                     mask="(##) ##### - ####"
                     hint="" />
            <q-input class="col-12" outlined v-model="form.email" type="email" label="Email" />
            <q-input class="col-2" outlined v-model="form.cep" label="Cep" />
            <q-input class="col-8" outlined v-model="form.address" label="Endereço" />
            <q-input class="col-5" outlined v-model="form.city" label="Cidade" />
            <q-input class="col-5" outlined v-model="form.state" label="Estado" />
          </div>
        </div>
        <div class="col-5">
          <div>
            <q-markup-table style="height: 50vh">
              <thead style="font-size: 35px">
              <tr>
                <th class="text-left">Image</th>
                <th class="text-right">Nome</th>
                <th class="text-right">Qtd</th>
                <th class="text-right">Preço</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(movie, index) in $store.state.cart.items" :key="index">
                <td class="text-left"><img class="cart-movie-poster" :src="renderFilm(movie.poster_path)"/></td>
                <td class="text-right">{{movie.name}}</td>
                <td class="text-right">{{movie.quantity}}</td>
                <td class="text-right">R$ {{movie.value*movie.quantity.toFixed(2)}}</td>
              </tr>
              <span class="text-right"> Total: {{$store.state.cart.total.toFixed(2)}}</span>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
name: "FinishItem";

export default {
  data(){
    return{
      form:{
        name: "",
        cpf: "",
        phone: "",
        email: "",
        cep : "",
        address: "",
        city: "",
        state: ""

      }
    }

  },
  methods:{
    renderFilm(poster_path){
      return "https://image.tmdb.org/t/p/original"+poster_path
    },
  }
};
</script>

<style>
.cart-movie-poster{
  width: 50px;
}
</style>
