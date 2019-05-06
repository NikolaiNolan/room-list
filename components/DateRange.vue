<template>
  <span>
    {{dateRange}}
  </span>
</template>

<script>
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import format from 'date-fns/format';
import toDate from 'date-fns/toDate';

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
      const start = toDate(this.start);
      const end = toDate(this.end);
      let date = format(start, 'MMMM d');
      if (getYear(start) !== getYear(end)) {
        date += format(start, ', y');
      }
      date += '–';
      if (getMonth(start) !== getMonth(end)) {
        date += format(end, 'MMMM ');
      }
      date += format(end, 'd, y');
      return date;
    },
  },
};
</script>
