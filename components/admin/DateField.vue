<template>
  <input
    type="date"
    v-model="model"
    @input="input"
    @keyup.enter="$el.blur"
  />
</template>

<script>
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import toDate from 'date-fns/toDate';

export default {
  props: {
    value: Number,
  },
  data() {
    return {
      model: this.unixToDate(this.value),
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
      if (!this.model) return;
      this.$emit('input', this.dateToUnix(this.model));
    },
  },
};
</script>
