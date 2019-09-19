<template>
  <div class="home">
    <Login v-if="!this.$store.state.authStore.user" />
    <Counter />
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import Login from "@/components/Login.vue";

export default {
  name: "home",
  components: {
    Counter,
    Login
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
