<template>
  <Card
    :title="dateRange"
    :subtitle="dateDistance"
  />
</template>

<script>
import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';

import Card from './Card';

export default {
  components: {
    Card,
  },
  props: {
    start: {
      type: [Number, Object],
      required: true,
    },
    end: {
      type: [Number, Object],
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
    dateDistance() {
      if (isBefore(this.start, new Date())) return null;
      if (isSameDay(this.start, new Date())) return 'today';
      return formatDistanceStrict(this.start, new Date(), { addSuffix: true });
    },
  },
};
</script>
