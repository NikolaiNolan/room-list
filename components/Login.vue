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
        :src="$store.state.user.picture" width="75"
      />
      {{$store.state.user.name}}
    </template>
  </div>
</template>

<script>
import auth from '~/plugins/auth';

export default {
  mixins: [
    auth,
  ],
  beforeCreate() {
    this.$fireAuth.onAuthStateChanged(user => {
      this.$store.commit('loggedIn', user);
      if (!user) return;
      this.$store.commit('user', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      });
      this.$store.commit('admin', user.uid === 'LK7Jn91OK8NgXpBmttGCz2u5cPg2');
    });
  },
  async mounted() {
    const { user, additionalUserInfo } = await this.$fireAuth.getRedirectResult();
    if (!user || !additionalUserInfo) return;
    const {
      email,
      family_name: familyName,
      given_name: givenName,
      name,
      picture
    } = additionalUserInfo.profile;
    this.$fireDb.ref('users').update({
      [user.uid]: {
        email,
        familyName,
        givenName,
        name,
        picture,
      },
    });
  },
}
</script>
