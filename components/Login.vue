<template>
  <VBtn
    v-if="!$store.state.loggedIn"
    depressed
    class="text-none"
    @click="login"
  >
    Log In
  </VBtn>
  <VListTile
    v-else
    avatar
    @click="logout"
  >
    <VListTileAvatar v-if="$store.state.user.picture">
      <Avatar :picture="$store.state.user.picture" />
    </VListTileAvatar>
    <VListTileContent>
      <VListTileTitle>
        {{$store.state.user.name}}
      </VListTileTitle>
      <VListTileSubTitle>
        Log Out
      </VListTileSubTitle>
    </VListTileContent>
  </VListTile>
</template>

<script>
import auth from '~/plugins/auth';

import Avatar from './Avatar';

export default {
  mixins: [
    auth,
  ],
  components: {
    Avatar,
  },
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
