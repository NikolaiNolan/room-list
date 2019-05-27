<template>
  <VApp dark>
    <main
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
    </main>
  </VApp>
</template>

<script>
import countBy from 'lodash/countBy';
import filter from 'lodash/filter';
import last from 'lodash/last';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
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
  beforeMount() {
    this.$store.dispatch('geolocation/bind');
    this.$store.dispatch('user/bind', this);
    this.$store.dispatch('cons/bind', this);
    this.$store.dispatch('config/bind', this);
  },
  methods: {
    scrollHorizontally(event) {
      if (window.innerWidth < this.$vuetify.breakpoint.thresholds.xs) return;
      event.preventDefault();
      window.scrollBy(event.deltaY, 0);
    },
  },
};
</script>

<style lang="scss">
@include min-width(sm) {
  html {
    height: 100%;
    overflow: {
      x: scroll;
      y: hidden;
    }
  }

  body,
  body > div,
  body > div > div,
  .application,
  .application--wrap,
  .cons {
    flex: 1;
    display: flex;
    height: 100%;
  }

  .application--wrap {
    min-height: 0;
  }
}

.material-design-icon {
  display: inline-block;

  &.left {
    margin-right: 8px;
  }

  .v-avatar & {
    @include flex(row, center, center);
    @include size(inherit);
  }

  .material-design-icon__svg {
    display: block;
  }
}
</style>
