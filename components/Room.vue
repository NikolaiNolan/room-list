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
          {{people.length}}/{{max}} guests
        </span>
      </VSubheader>
      <RoomPerson
        v-for="person in people"
        :key="person.id"
        :person="person"
        :multiple="nameCount[person.givenName] > 1"
        :con-canadian="con.canadian"
        v-bind="{ firstDate, lastDate, cost }"
        @removePerson="removePerson({ conId: con.id, roomId, personId: person.id })"
        @setPaid="paid => setPaid({ conId: con.id, roomId, personId: person.id, paid })"
      />
      <template v-if="(people.length < max && userRoomId === null) || admin">
        <VDivider inset />
        <VListGroup
          v-model="formOpen"
          class="signup"
          @click="showForm($event)"
        >
          <template v-slot:activator>
            <VListTile>
              <VListTileAvatar>
                <VIcon>$vuetify.icons.accountPlus</VIcon>
              </VListTileAvatar>
              <VLayout justify-space-between align-center>
                Join this {{roomType}}
                <Price
                  :price="cost[`add${people.length ? 'Person' : 'Room'}`]"
                  :to-canadian="user && user.canadian && !con.canadian"
                  :from-canadian="user && con.canadian && !user.canadian"
                />
              </VLayout>
            </VListTile>
          </template>
          <RoomSignup
            :ride="con.ride.available"
            v-bind="{ roomId, firstDate, lastDate }"
            @close="formOpen = false"
            @addPerson="
              (personId, options) => addPerson({ conId: con.id, roomId, personId, options })
            "
          />
        </VListGroup>
      </template>
      <template v-else-if="people.length < max && userRoomId !== roomId">
        <VDivider inset />
        <VListTile @click="movePerson({ conId: con.id, fromRoomId: userRoomId, toRoomId: roomId })">
          <VListTileAvatar>
            <VIcon>$vuetify.icons.accountArrowRight</VIcon>
          </VListTileAvatar>
          <VLayout justify-space-between align-center>
            Move to this {{roomType}}
          </VLayout>
        </VListTile>
      </template>
    </VList>
  </section>
</template>

<script>
import auth from '~/plugins/auth';
import countBy from 'lodash/countBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';
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
      if (this.admin) return orderBy(peopleArray, ['paid', 'givenName', 'familyInitial'], ['desc']);
      return sortBy(peopleArray, ['givenName', 'familyInitial']);
    },
    nameCount() {
      return countBy(this.peopleObject, 'givenName');
    },
    max() {
      return this[`${this.roomType}Max`];
    },
    userInRoom() {
      if (!this.user) return false;
      return !!this.peopleObject[this.user.id];
    },
  },
  mounted() {
    const openForm = window.sessionStorage.getItem('openForm');
    if (!openForm) return;
    if (openForm === `${this.con.id}/${this.roomId}`) this.formOpen = true;
    window.sessionStorage.removeItem('openForm');
  },
  methods: {
    ...mapActions({
      addPerson: 'person/add',
      movePerson: 'person/move',
      removePerson: 'person/remove',
      setPaid: 'person/setPaid',
    }),
    showForm() {
      if (this.loggedIn) return;
      window.sessionStorage.setItem('openForm', `${this.con.id}/${this.roomId}`);
      this.login();
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
