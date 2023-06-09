<template>
  <section>
    <VDivider
      v-if="roomId"
      inset
      class="divider my-2"
    />
    <VList>
      <VSubheader
        inset
        class="subheader"
      >
        {{roomType[0].toUpperCase()}}{{roomType.slice(1)}} {{roomId + 1}}
        <span class="caption">
          <template v-if="people.length < max">
            {{people.length}}/{{max}} guests
          </template>
          <template v-else>
            Full
          </template>
        </span>
      </VSubheader>
      <RoomPerson
        v-for="person in people"
        :key="person.id"
        :person="person"
        :multiple="nameCount[person.givenName] > 1"
        :con-ride="con.ride && con.ride.available"
        :con-canadian="con.canadian"
        v-bind="{ firstDate, lastDate, isFuture, cost }"
        @addPerson="
          options => addPerson({ conId: con.id, roomId, personId: person.id, options })
        "
        @removePerson="removePerson({ conId: con.id, roomId, personId: person.id })"
        @setPaid="paid => setPaid({ conId: con.id, roomId, personId: person.id, paid })"
        @close="formOpen = false"
      />
      <template v-if="isFuture || admin">
        <template v-if="(people.length < max && userRoomId === null) || admin">
          <VDivider inset />
          <VListGroup
            v-model="formOpen"
            :disabled="$nuxt.isOffline"
            class="signup"
            @click="showForm($event)"
          >
            <template v-slot:activator>
              <VListTile @click="showForm($event)">
                <VListTileAvatar>
                  <VIcon>$vuetify.icons.accountPlus</VIcon>
                </VListTileAvatar>
                <VLayout justify-space-between align-center>
                  Join this {{roomType}}
                  <Price
                    :price="formOpen ? signupCost : allNightCost"
                    :to-canadian="user && user.canadian && !con.canadian"
                    :from-canadian="user && con.canadian && !user.canadian"
                  />
                </VLayout>
              </VListTile>
            </template>
            <RoomSignup
              :ride="con.ride.available"
              v-bind="{ roomId, firstDate, lastDate, people }"
              :add-person-cost="cost[`add${this.people.length ? 'Person' : 'Room'}`]"
              :add-ride-cost="cost.addRide"
              admin-list
              @close="formOpen = false"
              @updateSignupCost="updateSignupCost"
              @addPerson="
                (personId, options) => addPerson({ conId: con.id, roomId, personId, options })
              "
            />
          </VListGroup>
        </template>
        <template v-else-if="people.length < max && userRoomId !== roomId">
          <VDivider inset />
          <VListTile
            :disabled="$nuxt.isOffline"
            @click="movePerson({ conId: con.id, fromRoomId: userRoomId, toRoomId: roomId })"
          >
            <VListTileAvatar>
              <VIcon>$vuetify.icons.accountArrowRight</VIcon>
            </VListTileAvatar>
            <VLayout justify-space-between align-center>
              Move to this {{roomType}}
            </VLayout>
          </VListTile>
        </template>
      </template>
    </VList>
  </section>
</template>

<script>
import auth from '~/plugins/auth';
import countBy from 'lodash/countBy';
import isAfter from 'date-fns/isAfter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
import sum from 'lodash/sum';
import { mapActions, mapGetters, mapState } from 'vuex';

import Price from './Price';
import RoomPerson from './RoomPerson';
import RoomSignup from './RoomSignup';

export default {
  components: {
    Price,
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
    cost: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formOpen: false,
      signupCost: null,
    };
  },
  computed: {
    ...mapState('user', ['loggedIn', 'admin', 'user']),
    ...mapGetters({
      roomMax: 'config/roomMax',
      suiteMax: 'config/suiteMax',
    }),
    roomType() {
      return this.con.room.suite ? 'suite' : 'room';
    },
    people() {
      const peopleArray = map(
        this.peopleObject,
        (person, id) => ({ ...person, id }),
      );
      return sortBy(peopleArray, ['givenName', 'familyInitial']);
    },
    nameCount() {
      return countBy(this.peopleObject, 'givenName');
    },
    max() {
      return this.con.room.max || this[`${this.roomType}Max`];
    },
    userInRoom() {
      if (!this.user) return false;
      return !!this.peopleObject[this.user.id];
    },
    allNightCost() {
      return sum(Object.values(this.cost[`add${this.people.length ? 'Person' : 'Room'}`]));
    },
    isFuture() {
      return isAfter(this.firstDate, new Date());
    },
  },
  watch: {
    loggedIn(loggedIn) {
      if (!loggedIn) this.formOpen = false;
    },
  },
  methods: {
    ...mapActions({
      addPerson: 'person/add',
      movePerson: 'person/move',
      removePerson: 'person/remove',
      setPaid: 'person/setPaid',
    }),
    async showForm(event) {
      if (this.loggedIn) return;
      event.stopPropagation();
      setTimeout(() => {
        this.formOpen = false;
      });
      await this.login();
      if (this.loggedIn) this.formOpen = true;
    },
    updateSignupCost(cost) {
      this.signupCost = cost;
    },
  },
};
</script>

<style lang="scss" scoped>
.divider.v-divider {
  border-color: white;

  @include min-width(sm) {
    margin: {
      top: 24px !important;
      bottom: 24px !important;
    }
  }
}

.subheader {
  justify-content: space-between;
  font-weight: 600;
}

.signup::before,
.signup::after {
  display: none;
}
</style>
