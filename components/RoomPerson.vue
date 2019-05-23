<template>
  <div>
    <VDivider inset />
    <VListTile
      avatar
      class="person"
    >
      <VListTileAvatar>
        <VAvatar v-if="person.picture">
          <img
            :src="person.picture"
            alt
          />
        </VAvatar>
      </VListTileAvatar>
      <VListTileContent class="content">
        <VLayout align-center>
          <VLayout
            :column="$vuetify.breakpoint.xs"
            :align-center="$vuetify.breakpoint.smAndUp"
            class="mr-2"
          >
            <VListTileTitle class="name">
              {{person.givenName}}
              <template v-if="multiple">{{person.familyInitial}}.</template>
            </VListTileTitle>
            <VFlex :class="{ 'ml-2' : $vuetify.breakpoint.smAndUp }">
              <VLayout
                justify-space-between
                align-center
                class="dates"
                :style="dateMargins"
              >
                {{arrivalDay}}
                <VIcon
                  v-if="person.ride && person.ride.to"
                  small
                  class="icon pl-1"
                >
                  mdi-car
                </VIcon>
                <VDivider class="divider mx-1" />
                <VIcon
                  v-if="person.ride && person.ride.from"
                  small
                  class="icon pr-1"
                >
                  mdi-car
                </VIcon>
                <template v-if="conLength < 4 || stayLength !== 1">
                  {{departureDay}}
                </template>
              </VLayout>
            </VFlex>
          </VLayout>
          <Price
            :price="personCost"
            :to-canadian="user && user.canadian && !conCanadian"
            :from-canadian="user && conCanadian && !user.canadian"
          />
        </VLayout>
      </VListTileContent>
      <VListTileAction>
        <VBtn
          icon
          ripple
          @click="$emit('removePerson')"
        >
          <VIcon
            v-if="user && person.id === user.id"
            title="Leave this room"
          >
            mdi-account-minus
          </VIcon>
        </VBtn>
      </VListTileAction>
    </VListTile>
  </div>
</template>

<script>
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import format from 'date-fns/format';
import isWithinInterval from 'date-fns/isWithinInterval';
import filter from 'lodash/filter';
import sum from 'lodash/sum';
import { mapState } from 'vuex';

import Price from './Price';

export default {
  components: {
    Price,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    multiple: Boolean,
    conCanadian: Boolean,
    firstDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    lastDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    cost: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('user', ['user']),
    conLength() {
      return differenceInCalendarDays(this.lastDate, this.firstDate);
    },
    dateMargins() {
      if (this.$vuetify.breakpoint.xs) return;
      return {
        marginLeft: differenceInCalendarDays(this.person.dates.arrival, this.firstDate) / this.conLength * 100 + '%',
        marginRight: differenceInCalendarDays(this.lastDate, this.person.dates.departure) / this.conLength * 100 + '%',
      };
    },
    arrivalDay() {
      return format(this.person.dates.arrival, 'EEE');
    },
    departureDay() {
      return format(this.person.dates.departure, 'EEE');
    },
    stayLength() {
      return differenceInCalendarDays(this.person.dates.departure, this.person.dates.arrival);
    },
    personCost() {
      let price = sum(
        filter(this.cost.room, (nightCost, night) => {
          return isWithinInterval(+night, { start: this.person.dates.arrival, end: this.person.dates.departure })
        }),
      );
      if (this.person.ride && this.person.ride.to) price += this.cost.ride.to;
      if (this.person.ride && this.person.ride.from) price += this.cost.ride.from;
      return price;
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  align-items: stretch;
}

.name {
  width: 7em;
}

.dates {
  font-size: 79%;
}

.divider.v-divider.theme--dark {
  border-color: inherit;
}
</style>
