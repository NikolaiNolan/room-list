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
    :title="user.email"
    avatar
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
    this.$fireDb.ref('users').update({
      [user.uid]: {
        email,
        familyName,
        givenName,
        name,
        picture,
        canadian,
      },
    });
  },
}
</script>
