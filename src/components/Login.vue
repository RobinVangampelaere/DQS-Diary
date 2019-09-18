<template>
  <div id="login">
    <md-card>
      <md-card-header>
        <div class="md-title">Want to keep track of your data?</div>
      </md-card-header>

      <md-card-content>
        <md-button class="md-raised md-accent" v-on:click="login">Login with Google account</md-button>
      </md-card-content>
    </md-card>
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

<style lang="scss" scoped>
#login {
  margin-bottom: 20px;

  .md-card {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
}
</style>