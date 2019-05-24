<template>
  <VApp dark>
    <main class="cons">
      <Header />
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
import Header from '~/components/Header';
import Login from '~/components/Login';

export default {
  components: {
    Convention,
    Header,
    Login,
  },
  computed: mapGetters({
    cons: 'cons/cons',
  }),
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
    overflow: auto;
  }
}
</style>
