<template>
  <div
    class="cons"
    @wheel="scrollHorizontally"
  >
    <Header :class="lastBackgroundColor" />
    <Convention
      v-for="(con, index) of (admin ? allCons : futureCons)"
      :key="con.id"
      :con="{ ...con, index }"
    />
    <Footer :class="firstBackgroundColor" />
  </div>
</template>

<script>
import countBy from 'lodash/countBy';
import filter from 'lodash/filter';
import last from 'lodash/last';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import normalizeWheel from 'normalize-wheel';
import { mapGetters, mapState } from 'vuex';

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
    ...mapState('user', ['admin']),
    ...mapGetters({
      futureCons: 'cons/futureCons',
      allCons: 'cons/allCons',
    }),
    backgroundColors() {
      if (!this.futureCons.length) return null;
      const sortedColors = sortBy(map(countBy(this.futureCons, 'color'), (count, color) => ({ count, color })), 'count');
      const leastFrequentCount = sortedColors[0].count;
      return filter(sortedColors, { count: leastFrequentCount });
    },
    firstBackgroundColor() {
      if (!this.backgroundColors) return null;
      return this.backgroundColors[0].color;
    },
    lastBackgroundColor() {
      if (!this.backgroundColors) return null;
      return last(this.backgroundColors).color;
    },
  },
  methods: {
    scrollHorizontally(event) {
      if (window.innerWidth < this.$vuetify.breakpoint.thresholds.xs) return;
      event.preventDefault();
      window.scrollBy(normalizeWheel(event).pixelY, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.cons {
  @include min-width(sm) {
    max-height: 100%;
  }
}
</style>
