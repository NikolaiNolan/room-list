<template>
  <section class="room-signup">
    <VListTile v-if="admin">
      <VSelect
        v-model="personId"
        :items="userIds"
        color="white"
      />
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
    <VListTile>
      <VListTileAvatar />
      <VListTileContent>
        <VBtn
          depressed
          class="ma-0 text-none"
          @click="joinRoom"
        >
          <VIcon left>$vuetify.icons.check</VIcon>
          Join
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
    ride: Boolean,
    addPersonCost: {
      type: Object,
      required: true,
    },
    addRideCost: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userId: null,
      dayRange: [],
      rideTo: false,
      rideFrom: false,
      step: convert(1).from('d').to('ms'),
      personId: null,
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
    personCost() {
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
      return this.users.map(({ '.key': value, name: text }) => ({ text, value }));
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
    joinRoom() {
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
