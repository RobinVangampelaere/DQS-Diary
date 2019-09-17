<template>
  <div id="login">
    <md-button class="md-raised md-accent" v-on:click="login">Login with Google account</md-button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-auth";

export default {
  name: "login",
  methods: {
    login() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
  }
};
</script>