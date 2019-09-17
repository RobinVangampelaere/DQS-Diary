<template>
  <div class="profile">
    <md-button class="md-raised md-accent" v-on:click="logout">Logout</md-button>
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
