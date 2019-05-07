<template>
  <VApp>
    <VContent>
      <VContainer>
        <Login />
        <Convention
          v-for="con of cons"
          :key="con['.key']"
          :dbRef="$firebaseRefs.cons.child(con['.key'])"
          :con="con"
          @addPerson="(...args) => addPerson(con['.key'], ...args)"
        />
      </VContainer>
    </VContent>
  </VApp>
</template>

<script>
import Convention from '~/components/Convention';
import Login from '~/components/Login';

export default {
  components: {
    Convention,
    Login,
  },
  data() {
    return {
      config: [],
      cons: [],
    };
  },
  firebase() {
    return {
      config: this.$fireDb.ref('config'),
      cons: this.$fireDb.ref('cons').orderByChild('dates/start').startAt(new Date().getTime()),
    };
  },
  methods: {
    async addPerson(conId, roomIndex, options) {
      const userId = this.$store.state.user.id;
      const userSnapshot = await this.$fireDb.ref(`users/${userId}`).once('value');
      const { familyName, givenName, picture } = userSnapshot.val();
      this.$firebaseRefs.cons.child(`${conId}/people/${roomIndex}/${userId}`).update({
        givenName,
        familyInitial: familyName[0],
        picture,
        ...options,
      });
    },
  },
}
</script>
