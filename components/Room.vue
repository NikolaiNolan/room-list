<template>
  <section>
    <h3 class="title text-lowercase">{{roomType | capitalize}} {{index + 1}}</h3>
    <VBtn
      v-if="!formOpen"
      depressed
      class="text-none"
      @click="showForm"
    >
      <VIcon left>person_add</VIcon>
      Join this {{roomType}}
    </VBtn>
    <RoomSignup
      v-else
      :index="index"
      :firstDate="firstDate"
      :lastDate="lastDate"
      :ride="ride"
      @close="formOpen = false"
      @addPerson="addPerson"
    />
  </section>
</template>

<script>
import auth from '~/plugins/auth';

import RoomSignup from './RoomSignup';

export default {
  components: {
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
    people: Array,
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
