<template>
  <q-page class="q-pa-md">
    <q-dialog v-model="finishModal">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>Obrigado {{ form.name }}!</q-card-section>

        <q-card-section>Sua compra foi finalizada com sucesso!</q-card-section>
        <q-card-actions align="center">
          <q-btn
            class="button-added"
            flat
            label="Ir para a loja"
            color="white"
            to="/"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
      <h4 style="margin-left: 55px">Finalizar</h4>
      <div class="row justify-around items-start">
        <div class="col-5">
          <q-form
            @submit="finishOrder()"
            class="row justify-between items-start"
            id="formData"
            style="height: 50vh"
          >
            <q-input
              class="col-12"
              outlined
              v-model="form.name"
              label="Nome Completo"
              :rules="[(val) => !!val || 'O Nome é obrigatorio.']"
            />
            <q-input
              class="col-5"
              outlined
              v-model="form.cpf"
              label="CPF"
              lazy-rules
              :rules="[(val) => customValidation('cpf', val) || 'Cpf inválido']"
            />
            <q-input
              class="col-5"
              outlined
              v-model="form.phone"
              lazy-rules
              label="Celular"
              mask="(##) ##### - ####"
              hint=""
              :rules="[(val) => !!val || 'O telefone é obrigatorio.']"
            />
            <q-input
              class="col-12"
              outlined
              v-model="form.email"
              type="email"
              label="Email"
              lazy-rules
              :rules="[
                (val) => customValidation('email', val) || 'Email invalido',
              ]"
            />
            <q-input
              class="col-4"
              outlined
              v-model="form.cep"
              label="CEP"
              mask="#####-###"
              lazy-rules
              @input="getAddress(form.cep)"
              :error="invalidCep"
              :error-message="'Cep inválido'"
            />
            <q-input
              class="col-7"
              outlined
              v-model="form.address"
              label="Endereço"
              :rules="[(val) => !!val || 'Rua obrigatoria.']"
            />
            <q-input
              class="col-5"
              outlined
              v-model="form.city"
              label="Cidade"
              :rules="[(val) => !!val || 'A cidade é obrigatorio.']"
            />
            <q-input
              class="col-5"
              outlined
              v-model="form.state"
              label="Estado"
              :rules="[(val) => !!val || 'O estado é obrigatorio.']"
            />
          </q-form>
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
              <tr
                v-for="(movie, index) in $store.state.cart.items"
                :key="index"
              >
                <td class="text-left">
                  <img
                    class="cart-movie-poster"
                    :src="renderFilm(movie.poster_path)"
                  />
                </td>
                <td class="text-right">{{ movie.title }}</td>
                <td class="text-right">{{ movie.quantity }}</td>
                <td class="text-right">
                  R$ {{ (movie.price * movie.quantity).toFixed(2) }}
                </td>
                <td>
                  <q-btn flat icon="delete" @click="removeFromCart(movie.id, movie.price*movie.quantity)"></q-btn>
                </td>
              </tr>
              <span class="text-right total-finish q-pa-sm">
                  Total: R${{ $store.state.cart.total.toFixed(2) }}</span
              >
              </tbody>
            </q-markup-table>
            <q-btn form="formData" type="submit" class="q-my-md button-added">Finalizar</q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>


export default {
  name: "FinishItem",
  data() {
    return {
      invalidCep: false,
      finishModal: false,
      form: {
        name: "",
        cpf: "",
        phone: "",
        email: "",
        cep: "",
        address: "",
        city: "",
        state: "",
      },
    };
  },
  methods: {
    async getAddress(zipcode) {
      let cep = zipcode.replace("-", "").replace(/ /g, "");
      if (cep.length < 8) {
        return false;
      }
      await this.$axios
        .get(`https://viacep.com.br/ws/${cep}/json`)
        .then((res) => {
          if (res.data.erro === "true") {
            this.form.state = "";
            this.form.address = "";
            this.form.city = "";
            this.invalidCep = true;
          } else {
            this.invalidCep = false;
            this.form.state = res.data.uf;
            this.form.address = res.data.logradouro;
            this.form.city = res.data.localidade;
          }
        })
        .catch((err) => {
          console.log(err);
          this.invalidCep = true;
        });
    },

    renderFilm(poster_path) {
      return "https://image.tmdb.org/t/p/original" + poster_path;
    },
    removeFromCart(movie_id, price) {
      this.$store.dispatch("cart/removeMovie", {id: movie_id, price: price})
    },
    finishOrder(){
      if (this.$store.state.cart.items.length === 0){
        return
      }else{
        this.finishModal = !this.finishModal
      }
    },
    customValidation(input, value) {
      if (input === "cpf") {
        let cpf = value.replace(/[^\d]+/g, "");
        if (cpf === "") return false;
        // Elimina CPFs invalidos conhecidos
        if (
          cpf.length !== 11 ||
          cpf === "00000000000" ||
          cpf === "11111111111" ||
          cpf === "22222222222" ||
          cpf === "33333333333" ||
          cpf === "44444444444" ||
          cpf === "55555555555" ||
          cpf === "66666666666" ||
          cpf === "77777777777" ||
          cpf === "88888888888" ||
          cpf === "99999999999"
        )
          return false;
        // Valida 1o digito
        let add = 0;
        let i = 0;
        for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return false;
        // Valida 2o digito
        add = 0;
        for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(10))) return false;
        return true;
      }
      if (input === "email") {
        return value
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }
    },
  },
};
</script>

<style>
.total-finish{
  font-weight: 800;
}
.cart-movie-poster {
  width: 50px;
}

.button-added {
  color: white;
  width: 100%;
  background-color: rgb(96, 32, 121);
}
</style>
