<template>
  <section>
    <VContainer>
      <VLayout>
        <VFlex sm4>
          <ConHeader :con="con" />
        </VFlex>
        <template v-if="roomsAvailable">
          <Room
            v-for="(number, index) of con.room.count"
            :key="index"
            :con-id="con['.key']"
            :count="con.room.count"
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
import subDays from 'date-fns/subDays';

import ConHeader from './ConHeader';
import Room from './Room';
import { roundToNearestMinutes } from 'date-fns/fp';

export default {
  components: {
    ConHeader,
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
    roomsAvailable() {
      return this.con.room && this.con.room.count;
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
