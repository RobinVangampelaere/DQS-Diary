<template>
  <div class="profile">
    <md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ this.$store.state.authStore.user.displayName}}</div>
          <div class="md-subhead">{{ this.$store.state.authStore.user.email}}</div>
        </md-card-header-text>

        <md-card-media>
          <img :src="this.$store.state.authStore.user.photoURL" alt="People" />
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-raised md-accent" v-on:click="logout">Logout</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-auth";

export default {
  name: "profile",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("logout");
          this.$router.replace("/");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .md-card {
    width: 60%;
    max-width: 500px;
    min-width: 380px;
    border: 1px solid rgba(#000, 0.12);
    margin-bottom: 10px;
  }
}
</style>