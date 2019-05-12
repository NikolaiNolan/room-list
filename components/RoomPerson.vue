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
        <VTooltip
          bottom
          nudge-top="5"
          open-delay="500"
          transition="fade"
        >
          <template v-slot:activator="{ on }">
            <VBtn
              icon
              ripple
              v-on="on"
              @click="$emit('removePerson')"
            >
              <VIcon v-if="$store.state.user && person.id === $store.state.user.id">mdi-account-minus</VIcon>
            </VBtn>
          </template>
          <span>Leave this room</span>
        </VTooltip>
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
