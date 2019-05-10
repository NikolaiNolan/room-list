<template>
  <VApp dark>
    <VContent>
      <Login />
      <Convention
        v-for="con of cons"
        :key="con.id"
        :con="con"
        @addPerson="(...args) => addPerson(con.id, ...args)"
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
    this.$store.dispatch('config/bind', this.$fireDb);
    this.$store.dispatch('cons/bind', this.$fireDb.ref('cons').orderByChild('dates/start').startAt(new Date().getTime()));
  },
  methods: {
    async addPerson(conId, roomId, options) {
      const userId = this.$store.state.user.id;
      const userSnapshot = await this.$fireDb.ref(`users/${userId}`).once('value');
      const { familyName, givenName, picture } = userSnapshot.val();
      this.$fireDb.ref(`cons/${conId}/people/${roomId}/${userId}`).update({
        givenName,
        familyInitial: familyName[0],
        picture,
        ...options,
      });
    },
  },
}
</script>
