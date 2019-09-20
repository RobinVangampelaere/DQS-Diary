<template>
  <div class="trend">
    <md-list>
      <md-subheader>Trend last 7 days</md-subheader>
      <md-list-item>
        <trend :data="getlastDays()" :gradient="['#448aff']" auto-draw smooth></trend>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  methods: {
    getlastDays: function() {
      return this.$store.state.dataStore.currentWeekTotal;
    }
  }
};
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .md-list {
    width: 60%;
    max-width: 800px;
    min-width: 480px;
    border: 1px solid rgba(#000, 0.12);
    margin-bottom: 10px;

    .md-subheader {
      align-self: center;
    }
  }
}
</style>