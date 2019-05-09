<template>
  <span>{{dateDistance}}</span>
</template>

<script>
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';

export default {
  props: {
    date: {
      type: Number,
      required: true,
    },
  },
  computed: {
    dateDistance() {
      if (isBefore(this.date, new Date())) return null;
      if (isSameDay(this.date, new Date())) return 'today';
      return formatDistanceStrict(this.date, new Date(), { addSuffix: true });
    },
  },
};
</script>
