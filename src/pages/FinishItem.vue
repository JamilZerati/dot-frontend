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
              v-model="text"
              label="Nome Completo"
            />
            <q-input class="col-5" outlined v-model="text" label="CPF" />
            <q-input class="col-5" outlined v-model="text" label="Celular" />
            <q-input class="col-12" outlined v-model="text" label="Email" />
            <q-input class="col-2" outlined v-model="text" label="Cep" />
            <q-input class="col-8" outlined v-model="text" label="Endereço" />
            <q-input class="col-5" outlined v-model="text" label="Cidade" />
            <q-input class="col-5" outlined v-model="text" label="Estado" />
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
                <td class="text-left">{{movie.name}}</td>
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

export default {};
</script>
