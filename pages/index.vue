<template>
  <VApp dark>
    <main
      class="cons"
      @wheel="scrollHorizontally"
    >
      <Header :class="backgroundColor" />
      <Convention
        v-for="con of cons"
        :key="con.id"
        :con="con"
      />
    </main>
  </VApp>
</template>

<script>
import countBy from 'lodash/countBy';
import filter from 'lodash/filter';
import last from 'lodash/last';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import toPairs from 'lodash/toPairs';
import { mapGetters } from 'vuex';

import Convention from '~/components/Convention';
import Header from '~/components/Header';

export default {
  components: {
    Convention,
    Header,
  },
  computed: {
    ...mapGetters({
      cons: 'cons/cons',
    }),
    backgroundColor() {
      if (!this.cons.length) return;
      const sortedColors = sortBy(map(countBy(this.cons.slice(1), 'color'), (count, color) => ({ count, color })), 'count');
      const leastFrequentCount = sortedColors[0].count;
      return last(filter(sortedColors, { count: leastFrequentCount })).color;
    },
  },
  beforeCreate() {
    this.$store.dispatch('config/bind', this);
    this.$store.dispatch('cons/bind', this);
  },
  mounted() {
    this.$store.dispatch('geolocation/bind');
  },
  methods: {
    scrollHorizontally() {
      if (window.innerWidth < this.$vuetify.breakpoint.thresholds.xs) return;
      event.preventDefault();
      event.currentTarget.scrollLeft += event.deltaY;
    },
  },
}
</script>

<style lang="scss">
html {
  @include min-width(sm) {
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
.cons {
  @include min-width(sm) {
    display: flex;
    height: 100vh;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
