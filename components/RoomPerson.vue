<template>
  <div>
    <VDivider
      v-if="personId"
      inset
    />
    <VListTile avatar>
      <VListTileAvatar>
        <Avatar
          v-if="picture"
          :picture="picture"
        />
      </VListTileAvatar>
      <VListTileContent>
        {{givenName}}
        <template v-if="multiple">{{familyInitial}}.</template>
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
    index: Number,
    givenName: {
      type: String,
      required: true,
    },
    familyInitial: {
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
