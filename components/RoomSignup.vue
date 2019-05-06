<template>
  <section>
    <VRangeSlider
      v-model="dayRange"
      :min="firstDate"
      :max="lastDate"
      prepend-icon="date_range"
      :step="step"
      :tick-labels="tickLabels"
      tick-size="0"
      class="slider"
    />
    <br>
    <VIcon>directions_car</VIcon> ride to con<br>
    ride from con<br>
    <VBtn
      depressed
      class="text-none"
      @click="$emit('close')"
    >
      <VIcon left>cancel</VIcon>
      Close
    </VBtn>
  </section>
</template>

<script>
import convert from 'convert-units';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';
import range from 'lodash/range';

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
  },
  data() {
    return {
      dayRange: [],
      step: convert(1).from('d').to('ms'),
    };
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
    'dayRange.0'(arrivalDate) {
      if (arrivalDate !== this.dayRange[1]) return;
      this.dayRange = [arrivalDate - this.step, this.dayRange[1]];
    },
    'dayRange.1'(departureDate) {
      if (this.dayRange[0] !== departureDate) return;
      this.dayRange = [this.dayRange[0], departureDate + this.step];
    },
  },
  computed: {
    tickLabels() {
      return range(this.firstDate, this.lastDate + this.step, this.step)
        .map(timestamp => format(toDate(timestamp), 'EEE'));
    },
  },
};
</script>

<style lang="scss" scoped>
  .slider {
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
