<template>
  <VFlex
    sm12
    xl6
    tag="section"
  >
    <VSubheader
      inset
      class="subheader"
    >
      {{roomType | capitalize}}
      <template v-if="count > 1">{{index + 1}}</template>
      <span class="caption">
        {{people.length}}/{{roomMax}}
      </span>
    </VSubheader>
    <RoomPerson
      v-for="(person, personId) in people"
      :key="personId"
      :person-id="personId"
      :given-name="person.givenName"
      :name="person.name"
      :multiple="nameCount[person.givenName] > 1"
      :picture="person.picture"
      :dates="person.dates"
      :ride="person.ride"
    />
    <template v-if="people.length < roomMax">
      <VDivider inset />
      <VListTile
        v-if="!formOpen"
        @click="showForm"
      >
        <VListTileAvatar>
          <VIcon>person_add</VIcon>
        </VListTileAvatar>
        <VListTileContent>
          Join this {{roomType}}
        </VListTileContent>
      </VListTile>
      <RoomSignup
        v-else
        v-bind="{ index, firstDate, lastDate, ride }"
        @close="formOpen = false"
        @addPerson="addPerson"
      />
    </template>
  </VFlex>
</template>

<script>
import auth from '~/plugins/auth';
import countBy from 'lodash/countBy';
import sortBy from 'lodash/sortBy';

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
    conId: {
      type: String,
      required: true,
    },
    index: {
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
    count: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      validator: rate => /^\d+\.?\d{0,2}$/.test(rate),
    },
    suite: Boolean,
    ride: Boolean,
    canada: Boolean,
  },
  data() {
    return {
      formOpen: false,
    };
  },
  firebase() {
    return {
      roomMaxRecord: {
        source: this.$fireDb.ref(`config/${this.suite ? 'suite' : 'room'}Max`),
        asObject: true,
      },
      people: this.$fireDb.ref(`people/${this.conId}/${this.index}`).orderByChild('name'),
    };
  },
  computed: {
    roomMax() {
      return this.roomMaxRecord['.value'];
    },
    roomType() {
      return this.suite ? 'suite' : 'room';
    },
    nameCount() {
      return countBy(this.people, 'givenName');
    },
  },
  mounted() {
    const openForm = window.sessionStorage.getItem('openForm');
    if (!openForm) return;
    if (openForm === `${this.conId}/${this.index}`) this.formOpen = true;
    window.sessionStorage.removeItem('openForm');
  },
  methods: {
    showForm() {
      if (!this.$store.state.loggedIn) {
        window.sessionStorage.setItem('openForm', `${this.conId}/${this.index}`);
        this.login();
        return;
      }
      this.formOpen = true;
    },
    addPerson(...args) {
      this.$emit('addPerson', ...args);
    },
  },
};
</script>

<style lang="scss" scoped>
.subheader {
  justify-content: space-between;
  font-weight: 600;
}

.count {
  border-radius: 0;
}
</style>
