<template>
  <VBtn
    v-if="!loggedIn"
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
    <VListTileAvatar v-if="user.picture">
      <Avatar :picture="user.picture" />
    </VListTileAvatar>
    <VListTileContent>
      <VListTileTitle>
        {{user.name}}
      </VListTileTitle>
      <VListTileSubTitle>
        Log Out
      </VListTileSubTitle>
    </VListTileContent>
  </VListTile>
</template>

<script>
import auth from '~/plugins/auth';
import { mapState } from 'vuex';

import Avatar from './Avatar';

export default {
  mixins: [
    auth,
  ],
  components: {
    Avatar,
  },
  computed: mapState('user', ['loggedIn', 'user']),
  beforeCreate() {
    this.$fireAuth.onAuthStateChanged(async user => {
      this.$store.commit('user/setLoggedIn', user);
      if (!user) return;
      this.$store.commit('user/updateUser', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      });
      this.$store.commit('user/setAdmin', user.uid === 'LK7Jn91OK8NgXpBmttGCz2u5cPg2');
      const userSnapshot = await this.$fireDb.ref(`users/${user.uid}`).once('value');
      this.$store.commit('user/updateUser', userSnapshot.val());
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
