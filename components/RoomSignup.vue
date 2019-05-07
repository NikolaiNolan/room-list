<template>
  <section class="room-signup">
    <VListTile>
      <VListTileAvatar>
        <VIcon>date_range</VIcon>
      </VListTileAvatar>
      <VListTileContent>
        <VRangeSlider
          v-model="dayRange"
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
        <VIcon>directions_car</VIcon>
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
    <VBtn
      depressed
      class="text-none"
      @click="joinRoom"
    >
      <VIcon left>check</VIcon>
      Join
    </VBtn>
    <VBtn
      depressed
      class="text-none"
      @click="$emit('close')"
    >
      <VIcon left>cancel</VIcon>
      Cancel
    </VBtn>
  </section>
</template>

<script>
import convert from 'convert-units';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';

export default {
  props: {
    index: {
      type: Number,
      validator: index => index >= 0,
    },
    firstDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    lastDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    ride: Boolean,
  },
  data() {
    return {
      userId: null,
      dayRange: [],
      rideTo: false,
      rideFrom: false,
      step: convert(1).from('d').to('ms'),
    };
  },
  computed: {
    arrivalDate() {
      return this.dayRange[0];
    },
    departureDate() {
      return this.dayRange[1];
    },
    tickLabels() {
      return eachDayOfInterval({ start: toDate(this.firstDate), end: toDate(this.lastDate) })
        .map(date => format(date, 'EEE'));
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
  },
  methods: {
    joinRoom() {
      this.$emit('addPerson', {
        dates: {
          arrival: this.arrivalDate,
          departure: this.departureDate,
        },
        ride: {
          to: this.rideTo || null,
          from: this.rideFrom || null,
        },
      });
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .room-signup {
    /deep/ .v-list__tile__content {
      align-items: stretch;
    }

    /deep/ .v-slider {
      margin: {
        left: 1.2em;
        right: 1.2em;
      }
    }

    /deep/ .v-slider__ticks:first-child > span,
    /deep/ .v-slider__ticks:last-child > span {
      transform: translateX(-50%);
    }
  }
</style>
