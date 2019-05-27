<template>
  <div>
    <VDivider inset />
    <VListTile
      avatar
      class="person"
    >
      <VListTileAvatar>
        <VAvatar v-if="person.picture">
          <component
            :is="conIndex <= 1 ? 'img' : 'VLazyImage'"
            :src-placeholder="$placeholder"
            :src="person.picture"
            alt
            :intersection-options="$intersectionOptions"
          />
        </VAvatar>
      </VListTileAvatar>
      <VListTileAction v-if="admin">
        <VCheckbox
          v-model="paid"
          @change="$emit('setPaid', paid)"
        />
      </VListTileAction>
      <VListTileContent
        class="content"
        :class="{ paid: admin && paid }"
      >
        <VLayout align-center>
          <VLayout class="content__pertinent mr-2">
            <VListTileTitle class="name">
              {{person.givenName}}
              <template v-if="multiple">{{person.familyInitial}}.</template>
            </VListTileTitle>
            <VFlex>
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
                  class="pl-1"
                >
                  directions_car
                </VIcon>
                <VDivider class="divider mx-1" />
                <VIcon
                  v-if="person.ride && person.ride.from"
                  small
                  class="pr-1"
                >
                  directions_car
                </VIcon>
                <template v-if="conLength < 3 || stayLength !== 1">
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
          v-if="user && person.id === user.id || admin"
          :title="person.id === user.id ? 'Leave this room' : 'Remove this person'"
          icon
          ripple
          @click="$emit('removePerson')"
        >
          <AccountMinusIcon />
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

import AccountMinusIcon from 'vue-material-design-icons/AccountMinus.vue';
import Price from './Price';

export default {
  components: {
    AccountMinusIcon,
    Price,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    multiple: Boolean,
    conIndex: {
      type: Number,
      required: true,
    },
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
  data() {
    return {
      paid: this.person.paid,
    };
  },
  computed: {
    ...mapState('user', ['admin', 'user']),
    conLength() {
      return differenceInCalendarDays(this.lastDate, this.firstDate);
    },
    dateMargins() {
      return {
        marginLeft: `${differenceInCalendarDays(this.person.dates.arrival, this.firstDate) / this.conLength * 100}%`,
        marginRight: `${differenceInCalendarDays(this.lastDate, this.person.dates.departure) / this.conLength * 100}%`,
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
        filter(
          this.cost.room,
          (nightCost, night) => isWithinInterval(
            +night,
            { start: this.person.dates.arrival, end: this.person.dates.departure },
          ),
        ),
      );
      if (this.person.ride && this.person.ride.to) price += this.cost.ride.to;
      if (this.person.ride && this.person.ride.from) price += this.cost.ride.from;
      return price;
    },
  },
};
</script>

<style lang="scss" scoped>
.paid {
  text-decoration: line-through;
}

.content {
  align-items: stretch;

  &__pertinent {
    @include max-width(sm) {
      flex-direction: column;
    }

    @include min-width(sm) {
      align-items: center;
    }
  }
}

.name {
  width: 7em;

  @include min-width(sm) {
    margin-right: 8px;
  }
}

.dates {
  font-size: 79%;
}

.divider.v-divider.theme--dark {
  border-color: inherit;
}
</style>
