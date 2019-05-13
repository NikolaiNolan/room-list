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
    this.$store.dispatch('user/bind', this);
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
