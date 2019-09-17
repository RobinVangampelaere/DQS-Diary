<template>
  <div class="md-toolbar-row">
    <router-link to="/" style="flex: 1">
      <h3 class="md-title">DQS Diary</h3>
    </router-link>

    <router-link to="/profile" v-if="this.$store.state.authStore.user">
      <md-avatar>
        <img
          v-if="this.$store.state.authStore.user"
          :src="this.$store.state.authStore.user.photoURL"
          alt="Avatar"
        />
      </md-avatar>
    </router-link>
    <md-avatar v-else>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
        alt="Avatar"
      />
    </md-avatar>
  </div>
</template>

<script>
export default {
  name: "top"
};
</script>