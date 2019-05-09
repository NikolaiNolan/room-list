<template>
  <span>{{dateRange}}</span>
</template>

<script>
import format from 'date-fns/format';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';

export default {
  props: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  computed: {
    dateRange() {
      let date = format(this.start, 'MMMM d');
      if (getYear(this.start) !== getYear(this.end)) {
        date += format(this.start, ', y');
      }
      date += '–';
      if (getMonth(this.start) !== getMonth(this.end)) {
        date += format(this.end, 'MMMM ');
      }
      date += format(this.end, 'd, y');
      return date;
    },
  },
};
</script>
