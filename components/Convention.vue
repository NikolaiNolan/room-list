<template>
  <VLayout
    tag="section"
    class="con"
    :class="con.color"
  >
    <ConHeader :con="con" />
    <div
      v-if="roomsAvailable"
      class="rooms"
      @wheel="scrollHorizontally"
    >
      <Room
        v-for="(number, roomId) of con.room.count"
        :key="roomId"
        :con="con"
        :people-object="con.people && con.people[roomId]"
        v-bind="{ roomId, userRoomId, firstDate, lastDate, cost }"
      />
    </div>
  </VLayout>
</template>

<script>
import addDays from 'date-fns/addDays';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';
import isWithinInterval from 'date-fns/isWithinInterval'
import subDays from 'date-fns/subDays';
import filter from 'lodash/filter';
import flatMap from 'lodash/flatMap';
import sum from 'lodash/sum';
import { mapGetters, mapState } from 'vuex';

import ConHeader from './ConHeader';
import Room from './Room';
import { differenceInCalendarDays } from 'date-fns/fp';

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
    ...mapState('user', ['user']),
    ...mapGetters({
      dailyTip: 'config/dailyTip',
      gasCost: 'config/gasCost',
      mpg: 'config/mpg',
    }),
    roomsAvailable() {
      return this.con.room && this.con.room.count && this.cost;
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
      if (!this.user) return false;
      return !!Object.assign(...this.con.people)[this.user.id];
    },
    userRoomId() {
      if (!this.con.people) return null;
      if (!this.user) return null;
      const index = this.con.people.findIndex(room => {
        return room && room[this.user.id];
      });
      return index !== -1 ? index : null;
    },
    cost() {
      const cost = { room: {}, ride: {} };
      const addPersonCost = [];
      const addRoomCost = [];

      if (!this.lastDate) return;
      if (!this.con.room || !this.con.room.rate) return;

      const people = flatMap(this.con.people, room => Object.values(room || {}));
      const roomCount = Object.keys(this.con.people || {}).length;
      const rate = this.con.room.rate;

      eachDayOfInterval({ start: addDays(this.firstDate, 1), end: this.lastDate })
        .map(date => {
          const nightPeople = people.filter(({ dates: { arrival, departure }}) => (
            isWithinInterval(date, { start: arrival, end: departure })
          ));
          cost.room[date.getTime()] = (roomCount * (rate * 1.005 + this.dailyTip)) / nightPeople.length;
          addPersonCost.push((roomCount * (rate * 1.005 + this.dailyTip)) / (nightPeople.length + 1));
          addRoomCost.push(((roomCount + 1) * (rate * 1.005 + this.dailyTip)) / (nightPeople.length + 1));
        });
      if (this.con.ride && this.con.ride.available) {
        const distance = this.con.ride.distance;
        const toll = this.con.ride.toll || 0;
        const parking = this.con.ride.parking || 0;
        const rideCost = ((distance / this.mpg) * this.gasCost) + (toll / 2) + (parking * differenceInCalendarDays(this.firstDate, this.lastDate));
        cost.ride = {
          to: rideCost / filter(people, 'ride.to').length,
          from: rideCost / filter(people, 'ride.from').length,
        };
      }
      return {
        ...cost,
        addPerson: sum(addPersonCost),
        addRoom: sum(addRoomCost),
      };
    }
  },
  methods: {
    scrollHorizontally() {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (event.deltaY < 0 && Math.ceil(scrollTop) === 0) return;
      if (event.deltaY > 0 && Math.floor(scrollHeight - scrollTop) === clientHeight) return;
      event.stopImmediatePropagation();
    },
  },
};
</script>

<style lang="scss" scoped>
.con {
  flex-shrink: 0;

  @include max-width(sm) {
    flex-direction: column;
    padding: 16px;
  }
}

.rooms {
  @include max-width(sm) {
    @include margin(null -16px);
  }

  @include min-width(sm) {
    @include padding(16px 16px 16px null);
    margin-left: -16px;
    box-sizing: content-box;
    width: 480px;
    overflow: auto;
  }

  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    margin-left: -24px;
    @include padding(24px 24px 24px 8px);
  }
}
</style>
