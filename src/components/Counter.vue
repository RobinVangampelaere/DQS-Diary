<template>
  <div id="counter" v-if="this.$store.state.dataStore.categories">
    <md-list>
      <md-subheader
        v-if="this.$store.state.dataStore.currentDate"
      >{{ this.$store.state.dataStore.currentDate.format("dddd DD/MM/YYYY") }}</md-subheader>
      <md-subheader v-else>{{ moment().startOf('day').format("dddd DD/MM/YYYY") }}</md-subheader>
      <md-list-item>
        <p>OVERALL SCORE</p>
        <md-button
          class="md-icon-button md-raised md-accent"
        >{{this.$store.state.dataStore.currentDayTotal}}</md-button>
      </md-list-item>
    </md-list>

    <md-list
      v-for="category in this.$store.state.dataStore.categories"
      :key="category.id"
      :class="category.id"
    >
      <md-subheader>{{category.name}}</md-subheader>

      <md-list-item v-for="food in category.foods" :key="food.id" :class="food.id">
        <span>{{ food.name }}</span>
        <span>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-for="(intake, intakeIndex) in food.intakes"
            v-bind:class="{ 'md-accent': checkIfActive(food.id, intakeIndex) }"
            :key="intakeIndex"
            :categoryId="category.id"
            :foodId="food.id"
            :intake="intake"
            :intakeIndex="intakeIndex"
          >{{intake}}</md-button>
        </span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import db from "../firestore";

export default {
  name: "counter",
  data: function() {
    return {
      //amountDisabled: this.$store.getters.getCategoryNames()
    };
  },
  methods: {
    checkIfActive(foodId, index) {
      if (this.$store.state.dataStore.currentDayData[foodId]) {
        if (this.$store.state.dataStore.currentDayData[foodId][index]) {
          return true;
        }
      }
      return false;
    },
    toggle(e) {
      const fromActiveToNotActive = e.currentTarget.classList.contains(
        "md-accent"
      );
      const categoryId = e.currentTarget.getAttribute("categoryId");
      const foodId = e.currentTarget.getAttribute("foodId");
      const intake = parseInt(e.currentTarget.getAttribute("intake"));
      const intakeIndex = parseInt(e.currentTarget.getAttribute("intakeIndex"));

      //toggleButton(this, isSelected);
      sendToLocalData(this, foodId, intake, intakeIndex, fromActiveToNotActive);
      if (this.$store.state.authStore.user) {
        sendToFirebase(
          this,
          categoryId,
          foodId,
          intake,
          intakeIndex,
          !fromActiveToNotActive
        );
      }
      e.currentTarget.classList.toggle("md-accent");

      function toggleButton(currentState, operator) {
        if (operator) {
          currentState.amountDisabled[
            e.currentTarget.getAttribute("categoryId")
          ][e.currentTarget.getAttribute("foodId")] += 1;
        } else {
          currentState.amountDisabled[
            e.currentTarget.getAttribute("categoryId")
          ][e.currentTarget.getAttribute("foodId")] -= 1;
        }
      }
      function sendToLocalData(
        state,
        foodId,
        intake,
        intakeIndex,
        fromActiveToNotActive
      ) {
        if (foodId in state.$store.state.dataStore.currentDayData) {
          state.$store.state.dataStore.currentDayData[foodId][
            intakeIndex
          ] = !fromActiveToNotActive;
        } else {
          state.$store.state.dataStore.currentDayData[foodId] = {
            [intakeIndex]: !fromActiveToNotActive
          };
        }
        if (intake !== 0) {
          state.$store.state.dataStore.currentDayTotal += fromActiveToNotActive
            ? -intake
            : intake;
        }
      }
      function sendToFirebase(
        state,
        categoryId,
        foodId,
        intake,
        intakeIndex,
        fromActiveToNotActive
      ) {
        const foodRef = state.$store.state.dataStore.dayRef
          .collection("categories")
          .doc(categoryId)
          .collection("foods")
          .doc(foodId);

        state.$store.state.dataStore.dayRef.get().then(doc => {
          if (!doc.exists) {
            state.$store.state.dataStore.dayRef.set({
              score: 0
            });
          }

          foodRef.get().then(doc => {
            if (doc.exists && fromActiveToNotActive) {
              foodRef.update({
                [intakeIndex]: true
              });
            } else if (doc.exists && !fromActiveToNotActive) {
              intakeIndex === 0
                ? foodRef.delete()
                : foodRef.update({
                    [intakeIndex]: firebase.firestore.FieldValue.delete()
                  });
            } else {
              foodRef.set({
                [intakeIndex]: true
              });
            }
            if (intake !== 0) {
              state.$store.state.dataStore.dayRef.update({
                score: firebase.firestore.FieldValue.increment(
                  fromActiveToNotActive ? intake : -intake
                )
              });
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#counter {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .md-list {
    width: 60%;
    max-width: 800px;
    min-width: 480px;
    border: 1px solid rgba(#000, 0.12);
    margin-bottom: 10px;

    .md-accent {
      color: #fff;
      color: var(--md-theme-default-text-primary-on-accent, #fff);
      background-color: #ff5252;
      background-color: var(--md-theme-default-accent, #ff5252);

      &:disabled {
        opacity: 0.8;
      }
    }
  }
}
</style>