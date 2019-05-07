<template>
  <section>
    <h3
      v-if="heading"
      class="title"
    >
      {{roomType | capitalize}} {{index + 1}}
    </h3>
    <RoomPerson
      v-for="(person, personId) in sortedPeople"
      :key="personId"
      :multiple="nameCount[person.givenName] > 1"
      v-bind="{ ...person, personId }"
    />
    <template v-if="true">
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
  </section>
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
    heading: Boolean,
    people: Object,
    rate: {
      type: Number,
      validator: rate => /^\d+\.?\d{0,2}$/.test(rate),
    },
    suite: Boolean,
    ride: Boolean,
  },
  data() {
    return {
      formOpen: false,
    };
  },
  computed: {
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
  methods: {
    showForm() {
      if (!this.$store.state.loggedIn) {
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
