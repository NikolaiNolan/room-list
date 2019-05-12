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
              v-bind="{ roomId, userRoomId, firstDate, lastDate, cost }"
            />
          </VLayout>
        </VFlex>
      </VLayout>
    </VContainer>
  </section>
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
      gasCost: 'config/gasCost',
      mpg: 'config/mpg',
    }),
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
      const tip = 5;

      eachDayOfInterval({ start: addDays(this.firstDate, 1), end: this.lastDate })
        .map(date => {
          const nightPeople = people.filter(({ dates: { arrival, departure }}) => (
            isWithinInterval(date, { start: arrival, end: departure })
          ));
          cost.room[date.getTime()] = (roomCount * (rate * 1.005 + tip)) / nightPeople.length;
          addPersonCost.push((roomCount * (rate * 1.005 + tip)) / (nightPeople.length + 1));
          addRoomCost.push(((roomCount + 1) * (rate * 1.005 + tip)) / (nightPeople.length + 1));
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
};
</script>
