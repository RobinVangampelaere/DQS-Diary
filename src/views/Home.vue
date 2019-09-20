<template>
  <div class="home">
    <Trend v-if="this.$store.state.authStore.user" />
    <Login v-else />
    <Counter />
  </div>
</template>

<script>
import Counter from "@/components/Counter.vue";
import Login from "@/components/Login.vue";
import Trend from "@/components/Trend.vue";

export default {
  name: "home",
  components: {
    Counter,
    Login,
    Trend
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
