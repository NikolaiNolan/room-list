<template>
  <VApp dark>
    <main :style="consStyles">
      <Login />
      <Convention
        v-for="con of cons"
        :key="con.id"
        :con="con"
      />
    </main>
  </VApp>
</template>

<script>
import { mapGetters } from 'vuex';

import Convention from '~/components/Convention';
import Login from '~/components/Login';

export default {
  components: {
    Convention,
    Login,
  },
  computed: {
    ...mapGetters({
      cons: 'cons/cons',
    }),
    consStyles() {
      if (this.$vuetify.breakpoint.xs) return;
      return `
        display: flex;
        height: 100vh;
        overflow: auto;
      `;
    }
  },
  beforeCreate() {
    this.$store.dispatch('config/bind', this);
    this.$store.dispatch('cons/bind', this);
  },
  mounted() {
    this.$store.dispatch('geolocation/bind');
  },
}
</script>

<style lang="scss">
html {
  @media (min-width: 600px) {
    overflow: hidden;
  }
}
</style>
