<template>
  <section>
    <VContainer>
      <VLayout>
        <VFlex sm4>
          <h2 class="display-1">{{con.name}}</h2>
          <p v-if="datesAvailable">
            <DateRange
              :start="con.dates.start"
              :end="con.dates.end"
            />
            <small>{{dateDistance}}</small>
          </p>
        </VFlex>
        <template v-if="roomsAvailable">
          <Room
            v-for="(number, index) of con.room.count"
            :key="index"
            :con-id="con['.key']"
            :count="con.room.count"
            :people="con.people && con.people[index]"
            :rate="con.room.rate"
            :suite="con.room.suite"
            :ride="con.ride && !!con.ride.count"
            :canada="con.canada"
            v-bind="{ index, firstDate, lastDate }"
            @addPerson="(...args) => addPerson(index, ...args)"
          />
        </template>
      </VLayout>
    </VContainer>
  </section>
</template>

<script>
import addDays from 'date-fns/addDays';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import subDays from 'date-fns/subDays';
import toDate from 'date-fns/toDate';

import DateRange from './DateRange';
import Room from './Room';
import { roundToNearestMinutes } from 'date-fns/fp';

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
      const startDate = toDate(this.con.dates.start);
      if (isBefore(startDate, new Date())) return null;
      if (isSameDay(startDate, new Date())) return 'today';
      return formatDistanceStrict(startDate, new Date(), { addSuffix: true });
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
  methods: {
    addPerson(...args) {
      this.$emit('addPerson', ...args);
    }
  }
};
</script>
