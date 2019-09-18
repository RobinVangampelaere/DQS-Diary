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
            :disabled="intakeIndex > amountDisabled[category.id][food.id] || intakeIndex < amountDisabled[category.id][food.id]-1"
            :key="intakeIndex"
            :categoryId="category.id"
            :foodId="food.id"
            :intake="intake"
          >{{intake}}</md-button>
        </span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import db from "../firestore";

export default {
  name: "counter",
  data: function() {
    return {
      amountDisabled: this.$store.getters.getCategoryNames()
    };
  },
  methods: {
    toggle(e) {
      if (isSelected()) {
        toggleButton(this, false);
        changeTotal(this, -parseInt(e.currentTarget.getAttribute("intake")));
        //sendToFirebase();
      } else {
        toggleButton(this, true);
        changeTotal(this, parseInt(e.currentTarget.getAttribute("intake")));
      }
      e.currentTarget.classList.toggle("md-accent");

      function isSelected() {
        return e.currentTarget.classList.contains("md-accent");
      }
      function changeTotal(currentState, amount) {
        currentState.$store.state.dataStore.currentDayTotal += amount;
      }
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
    }
  }
};

function addPortion() {
  // db.collection("users").doc(this.$store.state.dataStore.categories);
}
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