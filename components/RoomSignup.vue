<template>
  <section class="room-signup">
    <VListTile v-if="admin && adminList">
      <VSelect
        v-model="personId"
        :items="userIds"
        color="white"
      >
        <template
          slot="item"
          slot-scope="data"
        >
          <VListTileContent>
            <VListTileTitle v-html="data.item.text" />
            <VListTileSubTitle v-html="data.item.email" />
          </VListTileContent>
        </template>
      </VSelect>
    </VListTile>
    <VListTile>
      <VListTileAvatar>
        <VIcon>$vuetify.icons.calendarRange</VIcon>
      </VListTileAvatar>
      <VListTileContent>
        <VRangeSlider
          v-model="dayRange"
          color="white"
          :min="firstDate"
          :max="lastDate"
          :step="step"
          :tick-labels="tickLabels"
          tick-size="0"
          class="slider"
        />
      </VListTileContent>
    </VListTile>
    <VListTile v-if="ride">
      <VListTileAvatar>
        <VIcon>$vuetify.icons.carSide</VIcon>
      </VListTileAvatar>
      <VListTileContent class="pt-1">
        <VCheckbox
          v-model="rideTo"
          :disabled="arrivalDate !== firstDate"
          label="Ride to con"
        />
      </VListTileContent>
      <VListTileContent class="pt-1">
        <VCheckbox
          v-model="rideFrom"
          :disabled="departureDate !== lastDate"
          label="Ride from con"
        />
      </VListTileContent>
    </VListTile>
    <VListTile v-if="!defaults || !defaults.vaccinated">
      <VListTileAvatar>
        <VIcon>$vuetify.icons.needle</VIcon>
      </VListTileAvatar>
      <VListTileContent class="pt-1">
        <VCheckbox
          v-model="vaccinated"
          label="I am fully vaccinated against COVID-19"
        />
      </VListTileContent>
    </VListTile>
    <VListTile v-if="!liveUpdate || removeButton">
      <VListTileAvatar />
      <VListTileContent>
        <VBtn
          v-if="!liveUpdate"
          depressed
          :disabled="!vaccinated"
          class="ma-0 text-none"
          @click="joinRoom"
        >
          <VIcon left>$vuetify.icons.check</VIcon>
          Join
        </VBtn>
        <VBtn
          v-if="removeButton"
          depressed
          class="ma-0 text-none"
          @click="$emit('removePerson')"
        >
          <VIcon left>$vuetify.icons.accountMinus</VIcon>
          Leave
        </VBtn>
      </VListTileContent>
    </VListTile>
  </section>
</template>

<script>
import convert from 'convert-units';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';
import isWithinInterval from 'date-fns/isWithinInterval';
import filter from 'lodash/filter';
import some from 'lodash/some';
import sum from 'lodash/sum';
import { mapState } from 'vuex';

export default {
  props: {
    firstDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    lastDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    defaults: Object,
    people: {
      type: Array,
      default: () => [],
    },
    ride: Boolean,
    addPersonCost: Object,
    addRideCost: Object,
    liveUpdate: Boolean,
    removeButton: Boolean,
    adminList: Boolean,
  },
  data() {
    return {
      userId: null,
      dayRange: [],
      rideTo: false,
      rideFrom: false,
      step: convert(1).from('d').to('ms'),
      personId: null,
      vaccinated: false,
    };
  },
  computed: {
    ...mapState('user', ['admin', 'user']),
    ...mapState('users', ['users']),
    arrivalDate() {
      return this.dayRange[0];
    },
    departureDate() {
      return this.dayRange[1];
    },
    tickLabels() {
      return eachDayOfInterval({ start: this.firstDate, end: this.lastDate })
        .map(date => format(date, 'EEE'));
    },
    formData() {
      return `${this.arrivalDate}${this.departureDate}${this.rideTo}${this.rideFrom}`;
    },
    personCost() {
      if (!this.addPersonCost) return null;
      let price = sum(
        filter(
          this.addPersonCost,
          (nightCost, night) => isWithinInterval(
            +night,
            { start: this.arrivalDate, end: this.departureDate },
          ),
        ),
      );
      if (this.rideTo) price += this.addRideCost.to;
      if (this.rideFrom) price += this.addRideCost.from;
      return price;
    },
    userIds() {
      return this.users.map(({ '.key': value, name: text, email }) => {
        if (some(this.people, { id: value })) return null;
        return { text, email, value };
      }).filter(Boolean);
    },
  },
  watch: {
    firstDate: {
      immediate: true,
      handler(firstDate) {
        this.dayRange = [firstDate, this.lastDate];
      },
    },
    lastDate: {
      immediate: true,
      handler(lastDate) {
        this.dayRange = [this.firstDate, lastDate];
      },
    },
    defaults: {
      immediate: true,
      handler(defaults) {
        if (!defaults) return;
        this.dayRange = [defaults.arrival, defaults.departure];
        this.rideTo = defaults.rideTo;
        this.rideFrom = defaults.rideFrom;
        this.vaccinated = defaults.vaccinated;
      },
    },
    arrivalDate(arrivalDate) {
      if (arrivalDate !== this.firstDate) this.rideTo = false;
      if (arrivalDate !== this.departureDate) return;
      this.dayRange = [arrivalDate - this.step, this.departureDate];
    },
    departureDate(departureDate) {
      if (departureDate !== this.lastDate) this.rideFrom = false;
      if (this.arrivalDate !== departureDate) return;
      this.dayRange = [this.arrivalDate, departureDate + this.step];
    },
    formData() {
      if (this.liveUpdate) this.updateRoom();
    },
    personCost: {
      immediate: true,
      handler(cost) {
        this.$emit('updateSignupCost', cost);
      },
    },
    'user.id': {
      immediate: true,
      handler(userId) {
        this.personId = userId;
      },
    },
    admin: {
      immediate: true,
      handler(admin) {
        if (admin) this.$store.dispatch('users/bind', this);
      },
    },
  },
  methods: {
    updateRoom() {
      this.$emit(
        'addPerson',
        this.personId,
        {
          dates: {
            arrival: this.arrivalDate,
            departure: this.departureDate,
          },
          ride: {
            to: this.rideTo || null,
            from: this.rideFrom || null,
          },
        },
      );
    },
    joinRoom() {
      this.updateRoom();
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.room-signup {
  /deep/ .v-input--slider {
    align-self: stretch;
  }

  /deep/ .v-slider {
    @include margin(null 1.2em);
    font-size: 80%;
  }

  /deep/ .v-slider__ticks:first-child > span,
  /deep/ .v-slider__ticks:last-child > span {
    transform: translateX(-50%);
  }
}

</style>
