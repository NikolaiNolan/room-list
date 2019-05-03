<template>
  <input
    type="date"
    v-model="inputValue"
    @input="input"
    @keyup.enter="$el.blur"
  />
</template>

<script>
import {
  format,
  parseISO,
  toDate,
} from 'date-fns';

export default {
  props: {
    value: Number,
  },
  data() {
    return {
      inputValue: this.unixToDate(this.value),
    };
  },
  methods: {
    dateToUnix(dateString) {
      return parseISO(dateString).getTime();
    },
    unixToDate(timestamp) {
      if (!timestamp) return null;
      return format(toDate(timestamp), 'yyyy-MM-dd');
    },
    input() {
      if (!this.inputValue) return;
      this.$emit('input', this.dateToUnix(this.inputValue));
    },
  },
};
</script>
