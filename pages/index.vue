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
}
</script>
