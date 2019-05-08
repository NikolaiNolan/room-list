<template>
  <VFlex
    sm4
    tag="section"
  >
    <VSubheader
      inset
      class="subheader"
    >
      {{roomType | capitalize}}
      <template v-if="count > 1">{{index + 1}}</template>
      <span class="caption">
        {{sortedPeople.length}}/{{roomMax}}
      </span>
    </VSubheader>
    <VDivider inset />
    <RoomPerson
      v-for="(person, personId) in sortedPeople"
      :key="personId"
      :multiple="nameCount[person.givenName] > 1"
      v-bind="{ ...person, personId }"
    />
    <VDivider
      v-if="true && sortedPeople.length"
      inset
    />
    <template v-if="true">
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
    people: Object,
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
    };
  },
  computed: {
    roomMax() {
      return this.roomMaxRecord['.value'];
    },
    roomType() {
      return this.suite ? 'suite' : 'room';
    },
    sortedPeople() {
      return sortBy(this.people, ['givenName', 'familyInitial']);
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
