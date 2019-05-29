<template>
  <VBtn
    v-if="!loggedIn"
    block
    depressed
    class="button mx-0 text-none"
    @click="login"
  >
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
        <VLazyImage
          :src-placeholder="$placeholder"
          :src="user.picture.replace(/(\/\w\w)?\/photo/, '/s48/photo')"
          :srcset="`
            ${user.picture.replace(/(\/\w\w)?\/photo/, '/s48/photo')} 48w,
            ${user.picture.replace(/(\/\w\w)?\/photo/, '/s72/photo')} 72w,
            ${user.picture.replace(/(\/\w\w)?\/photo/, '/s96/photo')} 96w,
          `"
          alt
          :intersection-options="$intersectionOptions"
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
  async mounted() {
    const { user, additionalUserInfo } = await this.$fireAuth.getRedirectResult();
    if (!user || !additionalUserInfo) return;
    const {
      email,
      family_name: familyName,
      given_name: givenName,
      name,
      picture,
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
};
</script>

<style lang="scss" scoped>
.button {
  @include margin(10px null);
}

.user {
  @include margin(null -16px);
  text-shadow: 0 0 .25em #7b6455;
}
</style>
