<template>
  <section>
    <h2 class="headline font-weight-medium text-lowercase">{{con.name}}</h2>
    <p v-if="datesAvailable">
      <DateRange
        :start="con.dates.start"
        :end="con.dates.end"
      />
      <small>{{dateDistance}}</small>
    </p>
    <template v-if="roomsAvailable">
      <Room
        v-for="(number, index) of con.room.count"
        :key="index"
        :index="index"
        :firstDate="firstDate"
        :lastDate="lastDate"
        :people="con.room.people"
        :rate="con.room.rate"
        :suite="con.room.suite"
      />
    </template>
  </section>
</template>

<script>
import addDays from 'date-fns/addDays';
import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import subDays from 'date-fns/subDays';
import toDate from 'date-fns/toDate';

import DateRange from './DateRange';
import Room from './Room';

export default {
  components: {
    DateRange,
    Room,
  },
  props: {
    dbRef: {
      type: Object,
      required: true,
    },
    con: {
      type: Object,
      required: true,
    },
  },
  computed: {
    datesAvailable() {
      return this.con.dates && this.con.dates.start && this.con.dates.end;
    },
    dateDistance() {
      return formatDistanceStrict(toDate(this.con.dates.start), new Date(), { addSuffix: true });
    },
    roomsAvailable() {
      return this.datesAvailable && this.con.room && this.con.room.count;
    },
    firstDate() {
      if (!this.roomsAvailable) return;
      return subDays(this.con.dates.start, this.con.dates.daysEarly || 0).getTime();
    },
    lastDate() {
      if (!this.roomsAvailable) return;
      return addDays(this.con.dates.end, this.con.dates.daysLate || 0).getTime();
    },
  },
}
</script>
