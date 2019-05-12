<template>
  <div>
    <VDivider class="hidden-sm-and-up" />
    <VDivider inset class="hidden-xs-only" />
    <VListTile
      avatar
      class="person"
    >
      <VListTileAvatar class="hidden-xs-only">
        <Avatar
          v-if="person.picture"
          :picture="person.picture"
        />
      </VListTileAvatar>
      <VListTileContent class="content">
        <VLayout align-center>
          <div class="name">
            {{person.givenName}}
            <template v-if="multiple">{{person.familyInitial}}.</template>
          </div>
          <VFlex class="mx-2">
            <VLayout
              justify-space-between
              class="dates"
              :style="dateMargins"
            >
              <VLayout align-center>
                {{arrivalDay}}
                <VIcon
                  v-if="person.ride && person.ride.to"
                  class="icon"
                >
                  mdi-car
                </VIcon>
              </VLayout>
              <VLayout
                justify-end
                align-center
              >
                <VIcon
                  v-if="person.ride && person.ride.from"
                  class="icon"
                >
                  mdi-car
                </VIcon>
                {{departureDay}}
              </VLayout>
            </VLayout>
          </VFlex>
          <Price :price="personCost" />
        </VLayout>
      </VListTileContent>
      <VListTileAction>
        <VBtn
          icon
          ripple
          @click="$emit('removePerson')"
        >
          <VIcon
            v-if="$store.state.user && person.id === $store.state.user.id"
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

import Avatar from './Avatar';
import Price from './Price';

export default {
  components: {
    Avatar,
    Price,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    multiple: Boolean,
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
    conLength() {
      return differenceInCalendarDays(this.lastDate, this.firstDate);
    },
    dateMargins() {
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
.person /deep/ .v-list__tile {
  @media (max-width: 599px) {
    padding: {
      left: 0;
      right: 0;
    }
  }
}

.content {
  align-items: stretch;
}

.name {
  width: 7em;
}

.dates {
  padding: {
    left: .33em;
    right: .33em;
  }
  font-size: 80%;
  color: white;

  .icon {
    margin: {
      left: .17em;
      right: .17em;
    }
    font-size: 1.2em;
    vertical-align: middle;
  }
}
</style>
