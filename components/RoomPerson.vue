<template>
  <div>
    <VDivider inset />
    <VListTile avatar>
      <VListTileAvatar>
        <Avatar
          v-if="person.picture"
          :picture="person.picture"
        />
      </VListTileAvatar>
      <VListTileContent>
        {{person.givenName}}
        <template v-if="multiple">{{person.familyInitial}}.</template>
      </VListTileContent>
      <VListTileAction>
        <VBtn
          icon
          ripple
          @click="$emit('removePerson')"
        >
          <VIcon
            v-if="$store.state.user && person.id === $store.state.user.id"
            title="Leave this room"
          >
            mdi-account-minus
          </VIcon>
        </VBtn>
      </VListTileAction>
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
    person: {
      type: Object,
      required: true,
    },
    multiple: Boolean,
  },
};
</script>
