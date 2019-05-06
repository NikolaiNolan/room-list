<template>
  <div>
    <button
      v-if="!$store.state.loggedIn"
      @click="login"
    >
      Log In
    </button>
    <template v-else>
      <button @click="logout">
        Log Out
      </button>
      <img
        :src="$store.state.user.photo" width="75"
      />
      {{$store.state.user.name}}
    </template>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$fireAuth.onAuthStateChanged(user => {
      this.$store.commit('loggedIn', user);
      if (!user) return;
      this.$store.commit('user', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
      this.$store.commit('admin', user.uid === 'LK7Jn91OK8NgXpBmttGCz2u5cPg2');
    });
  },
  methods: {
    async login() {
      await this.$fireAuth.setPersistence(this.$fireAuthObj.Auth.Persistence.LOCAL);
      const provider = new this.$fireAuthObj.GoogleAuthProvider();
      const { user: { uid }, additionalUserInfo: { profile }} = await this.$fireAuth.signInWithPopup(provider);
      this.$fireDb.ref('users').update({ [uid]: profile });
    },
    async logout() {
      await this.$fireAuth.signOut();
      this.$store.commit('user', null);
    }
  }
}
</script>
