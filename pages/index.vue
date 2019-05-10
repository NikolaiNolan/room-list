<template>
  <VApp dark>
    <VContent>
      <Login />
      <Convention
        v-for="con of cons"
        :key="con.id"
        :con="con"
      />
    </VContent>
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
  computed: mapGetters({
    cons: 'cons/cons',
    roomMax: 'config/roomMax',
    suiteMax: 'config/suiteMax',
  }),
  created() {
    this.$store.dispatch('config/bind', this);
    this.$store.dispatch('cons/bind', this);
  },
}
</script>
