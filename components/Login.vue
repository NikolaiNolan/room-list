<template>
  <VBtn
    v-if="!loggedIn"
    block
    depressed
    class="ma-0 text-none"
    @click="login"
  >
    <VIcon left>mdi-account</VIcon>
    Log In
  </VBtn>
  <VListTile
    v-else
    :title="user.email"
    avatar
    class="user"
    @click="logout"
  >
    <VListTileAvatar v-if="user.picture">
      <VAvatar>
        <img
          :src="user.picture"
          alt
        />
      </VAvatar>
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

export default {
  mixins: [
    auth,
  ],
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
    const canadian = familyName === 'Easterbrook' || null;
    this.$fireDb.ref(`users/${user.uid}`).update({
      email,
      familyName,
      givenName,
      name,
      picture,
      canadian,
    });
  },
}
</script>

<style lang="scss" scoped>
.user {
  @include margin(null -16px);
  text-shadow: 0 0 .25em #7b6455;
}
</style>
