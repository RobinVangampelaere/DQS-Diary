<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <Top />
      </md-app-toolbar>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";

export default {
  components: {
    Top
  }
};
</script>

<style lang="scss">
@import "./assets/css/fonts.css";

.md-app {
  max-height: 100vh;
  min-height: 100vh;
}
</style>
