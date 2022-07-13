<template>
      <router-view id="q-app"/>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    return {
      drawerRight: ref(false),
    };
  },
};
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

