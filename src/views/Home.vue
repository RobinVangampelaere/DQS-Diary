<template>
  <div class="home">
    <Counter />
    <Login v-if="!this.$store.state.authStore.user" />
    <Overview v-else />
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import Login from "@/components/Login.vue";
import Overview from "@/components/Overview.vue";

export default {
  name: "home",
  components: {
    Counter,
    Login,
    Overview
  }
};
</script>
