<template>
  <VApp dark>
    <main
      class="cons"
      @wheel="scrollHorizontally"
    >
      <Header :class="lastBackgroundColor" />
      <Convention
        v-for="con of cons"
        :key="con.id"
        :con="con"
      />
      <Footer :class="firstBackgroundColor" />
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
import Footer from '~/components/Footer';
import Header from '~/components/Header';

export default {
  components: {
    Convention,
    Footer,
    Header,
  },
  computed: {
    ...mapGetters({
      cons: 'cons/cons',
    }),
    backgroundColors() {
      if (!this.cons.length) return;
      const sortedColors = sortBy(map(countBy(this.cons.slice(1), 'color'), (count, color) => ({ count, color })), 'count');
      const leastFrequentCount = sortedColors[0].count;
      return filter(sortedColors, { count: leastFrequentCount });
    },
    firstBackgroundColor() {
      if (!this.backgroundColors) return;
      return this.backgroundColors[0].color;
    },
    lastBackgroundColor() {
      if (!this.backgroundColors) return;
      return last(this.backgroundColors).color;
    }
  },
  beforeMount() {
    this.$store.dispatch('geolocation/bind');
    this.$store.dispatch('config/bind', this);
    this.$store.dispatch('cons/bind', this);
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
