<template>
  <div>
    <VDivider inset />
    <VListTile avatar>
      <VListTileAvatar>
        <Avatar
          v-if="picture"
          :picture="picture"
        />
      </VListTileAvatar>
      <VListTileContent>
        <template v-if="!multiple">{{givenName}}</template>
        <template v-else>{{name}}.</template>
      </VListTileContent>
    </VListTile>
  </div>
</template>

<script>
import Avatar from './Avatar';

export default {
  components: {
    Avatar,
  },
  props: {
    personId: {
      type: [Number, String],
      required: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    multiple: Boolean,
    picture: String,
    dates: {
      type: Object,
      required: true,
    },
    ride: Object,
  },
  data() {
    return {
      profile: {},
    };
  },
  firebase() {
    return {
      profile: {
        source: this.$fireDb.ref(`users/${this.personId}/public`),
        asObject: true,
      },
    };
  },
};
</script>
