<template>
  <section :class="con.color">
    <VContainer>
      <VLayout wrap>
        <VFlex
          xs12
          sm6
          md4
          lg6
        >
          <VLayout wrap>
            <VFlex
              xs12
              lg6
            >
              <ConHeader :con="con" />
            </VFlex>
            <VFlex
              xs12
              lg6
            >
            </VFlex>
          </VLayout>
        </VFlex>
        <VFlex
          v-if="roomsAvailable"
          xs12
          sm6
          md8
          lg6
        >
          <VLayout wrap>
            <Room
              v-for="(number, roomId) of con.room.count"
              :key="roomId"
              :con="con"
              :people-object="con.people && con.people[roomId]"
              v-bind="{ roomId, userRoomId, firstDate, lastDate }"
            />
          </VLayout>
        </VFlex>
      </VLayout>
    </VContainer>
  </section>
</template>

<script>
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import flattenDepth from 'lodash/flattenDepth';

import ConHeader from './ConHeader';
import Room from './Room';

export default {
  components: {
    ConHeader,
    Room,
  },
  props: {
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
      if (!this.con.dates.daysEarly) return this.con.dates.start;
      return subDays(this.con.dates.start, this.con.dates.daysEarly).getTime();
    },
    lastDate() {
      if (!this.con.dates.daysLate) return this.con.dates.end;
      return addDays(this.con.dates.end, this.con.dates.daysLate).getTime();
    },
    userInCon() {
      if (!this.con.people) return false;
      if (!this.$store.state.user) return false;
      return !!Object.assign(...this.con.people)[this.$store.state.user.id];
    },
    userRoomId() {
      if (!this.con.people) return null;
      if (!this.$store.state.user) return null;
      const index = this.con.people.findIndex(room => {
        return room && room[this.$store.state.user.id];
      });
      return index !== -1 ? index : null;
    },
  },
};
</script>
