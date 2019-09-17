<template>
  <div id="counter">
    <md-list v-if="this.$store.state.dataStore.currentDayData">
      <md-list-item class="vegetables">
        <span>Vegetables</span>
        <span>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+1</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
        </span>
      </md-list-item>
      <md-list-item class="fruit">
        <span>Fruit</span>
        <span>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+1</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
        </span>
      </md-list-item>
      <md-list-item class="nutsseeds">
        <span>Nuts, seeds, etc.</span>
        <span>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+1</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
          <md-button class="md-icon-button md-raised">-1</md-button>
        </span>
      </md-list-item>
      <md-list-item class="wholegrains">
        <span>Whole Grains</span>
        <span>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+2</md-button>
          <md-button class="md-icon-button md-raised">+1</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
          <md-button class="md-icon-button md-raised">+0</md-button>
          <md-button class="md-icon-button md-raised">-1</md-button>
        </span>
      </md-list-item>
      <md-list-item class="dairy">
        <span>Dairy</span>
        <span>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-bind:class="{ 'md-accent': this.$store.state.dataStore.currentDayData.dairy[0] }"
          >+2</md-button>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-bind:class="{ 'md-accent': this.$store.state.dataStore.currentDayData.dairy[1] }"
          >+1</md-button>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-bind:class="{ 'md-accent': this.$store.state.dataStore.currentDayData.dairy[2] }"
          >+1</md-button>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-bind:class="{ 'md-accent': this.$store.state.dataStore.currentDayData.dairy[3] }"
          >+0</md-button>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-bind:class="{ 'md-accent': this.$store.state.dataStore.currentDayData.dairy[4] }"
          >-1</md-button>
          <md-button
            class="md-icon-button md-raised"
            v-on:click="toggle"
            v-bind:class="{ 'md-accent': this.$store.state.dataStore.currentDayData.dairy[5] }"
          >-2</md-button>
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
      isActive: true
    };
  },
  methods: {
    toggle: e => {
      e.currentTarget.classList.toggle("md-accent");
    }
  }
};
</script>

<style lang="scss" scoped>
#counter {
  width: 50%;
}
</style>