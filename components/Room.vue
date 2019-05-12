<template>
  <VFlex
    xs12
    xl6
    tag="section"
  >
    <VSubheader
      inset
      class="subheader"
    >
      {{roomType | capitalize}}
      <template v-if="con.room.count > 1">{{roomId + 1}}</template>
      <span class="caption">
        {{people.length}}/{{max}}
      </span>
    </VSubheader>
    <RoomPerson
      v-for="person in people"
      :key="person.id"
      :person="person"
      :multiple="nameCount[person.givenName] > 1"
      @removePerson="removePerson({ conId: con.id, roomId, personId: person.id })"
    />
    <template v-if="people.length < max && userRoomId === null">
      <VDivider inset />
      <VListTile
        v-if="!formOpen"
        @click="showForm"
      >
        <VListTileAvatar>
          <VIcon>mdi-account-plus</VIcon>
        </VListTileAvatar>
        <VListTileContent>
          Join this {{roomType}}
        </VListTileContent>
      </VListTile>
      <RoomSignup
        v-else
        :ride="con.ride.available"
        v-bind="{ roomId, firstDate, lastDate }"
        @close="formOpen = false"
        @addPerson="options => addPerson({ conId: con.id, roomId, options })"
      />
    </template>
    <template v-else-if="people.length < max && userRoomId !== roomId">
      <VDivider inset />
      <VListTile @click="movePerson({ conId: con.id, fromRoomId: userRoomId, toRoomId: roomId })">
        <VListTileAvatar>
          <VIcon>mdi-account-arrow-right</VIcon>
        </VListTileAvatar>
        <VListTileContent>
          Move to this {{roomType}}
        </VListTileContent>
      </VListTile>
    </template>
  </VFlex>
</template>

<script>
import auth from '~/plugins/auth';
import countBy from 'lodash/countBy';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { mapActions, mapGetters } from 'vuex';

import RoomPerson from './RoomPerson';
import RoomSignup from './RoomSignup';

export default {
  components: {
    RoomPerson,
    RoomSignup,
  },
  mixins: [
    auth,
  ],
  props: {
    con: {
      type: Object,
      required: true,
    },
    peopleObject: {
      type: Object,
      default: () => ({}),
    },
    roomId: {
      type: Number,
      validator: value => value >= 0 && value % 1 === 0,
    },
    userRoomId: {
      type: Number,
      validator: value => value >= 0 && value % 1 === 0,
    },
    firstDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    lastDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
  },
  data() {
    return {
      formOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      roomMax: 'config/roomMax',
      suiteMax: 'config/suiteMax',
    }),
    roomType() {
      return this.con.room.suite ? 'suite' : 'room';
    },
    people() {
      return sortBy(
        map(
          this.peopleObject,
          (person, id) => ({ ...person, id }),
        ),
        ['givenName', 'familyInitial'],
      );
    },
    nameCount() {
      return countBy(this.peopleObject, 'givenName');
    },
    max() {
      return this[`${this.roomType}Max`];
    },
    userInRoom() {
      if (!this.$store.state.user) return false;
      return !!this.peopleObject[this.$store.state.user.id];
    },
  },
  mounted() {
    const openForm = window.sessionStorage.getItem('openForm');
    if (!openForm) return;
    if (openForm === `${this.con.id}/${this.roomId}`) this.formOpen = true;
    window.sessionStorage.removeItem('openForm');
  },
  methods: {
    ...mapActions(['addPerson', 'movePerson', 'removePerson']),
    showForm() {
      if (!this.$store.state.loggedIn) {
        window.sessionStorage.setItem('openForm', `${this.con.id}/${this.roomId}`);
        this.login();
        return;
      }
      this.formOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.subheader {
  justify-content: space-between;
  font-weight: 600;
  color: white;
}

.count {
  border-radius: 0;
}
</style>
