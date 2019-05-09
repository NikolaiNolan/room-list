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
      <VListTileAction>
        <VBtn
          icon
          ripple
          @click="removePerson({ conKey: conId, roomKey: roomId, personKey: personId })"
        >
          <VIcon v-if="personId === $store.state.user.id">delete</VIcon>
        </VBtn>
      </VListTileAction>
    </VListTile>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import Avatar from './Avatar';

export default {
  components: {
    Avatar,
  },
  props: {
    conId: {
      type: String,
      required: true,
    },
    roomId: {
      type: [Number, String],
      required: true,
    },
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
  methods: mapMutations(['removePerson']),
};
</script>
