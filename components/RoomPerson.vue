<template>
  <div>
    <VDivider inset />
    <VListGroup
      v-model="formOpen"
      :disabled="$nuxt.isOffline"
      :append-icon="null"
      class="no-hover"
    >
      <template v-slot:activator>
        <VListTile
          avatar
          class="person"
          @click.native.stop
        >
          <VListTileAvatar>
            <VAvatar v-if="person.picture">
              <VLazyImage
                v-if="pictureIsPhoto"
                :src-placeholder="$placeholder"
                :src="person.picture.replace(/(\/\w\w)?\/photo/, '/s48/photo')"
                :srcset="`
                  ${person.picture.replace(/(\/\w\w)?\/photo/, '/s48/photo')} 48w,
                  ${person.picture.replace(/(\/\w\w)?\/photo/, '/s72/photo')} 72w,
                  ${person.picture.replace(/(\/\w\w)?\/photo/, '/s96/photo')} 96w,
                `"
                alt
                :intersection-options="$intersectionOptions"
              />
              <VIcon v-else>$vuetify.icons.account</VIcon>
            </VAvatar>
          </VListTileAvatar>
          <VListTileAction v-if="admin && conApproaching">
            <VCheckbox
              v-if="person.id !== user.id"
              v-model="paid"
              :disabled="$nuxt.isOffline"
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
                  {{person.givenName.replace(/,$/, '')}}
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
                      $vuetify.icons.carSide
                    </VIcon>
                    <VDivider class="divider mx-1" />
                    <VIcon
                      v-if="person.ride && person.ride.from"
                      small
                      class="returnCar pl-1"
                    >
                      $vuetify.icons.carSide
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
          <VListTileAction v-if="isFuture || admin">
            <VBtn
              v-if="user && person.id === user.id || admin"
              :title="iconTitle"
              icon
              ripple
              :disabled="$nuxt.isOffline"
              @click="formOpen = !formOpen"
            >
              <VIcon v-if="formOpen">$vuetify.icons.close</VIcon>
              <VIcon v-else>$vuetify.icons.edit</VIcon>
            </VBtn>
          </VListTileAction>
        </VListTile>
      </template>
      <RoomSignup
        v-if="user && person.id === user.id || admin"
        v-bind="{ firstDate, lastDate }"
        :defaults="{
          arrival: person.dates.arrival,
          departure: person.dates.departure,
          rideTo: person.ride && person.ride.to,
          rideFrom: person.ride && person.ride.from,
        }"
        :ride="conRide"
        live-update
        remove-button
        @close="$emit('close')"
        @addPerson="(personId, options) => $emit('addPerson', options)"
        @removePerson="$emit('removePerson')"
      />
      <div v-else />
    </VListGroup>
    <VListTile
      v-if="conApproaching && !paid && user && person.id === user.id"
      class="payment"
    >
      <VListTileAvatar />
      <VListTileContent>
        <VBtn
          :href="`https://paypal.me/nikolain/${Math.ceil(personCost)}`"
          target="_blank"
          rel="noopener"
          depressed
          class="ma-0 text-none"
        >
          <VIcon left>$vuetify.icons.paypal</VIcon>
          Pay Now
        </VBtn>
      </VListTileContent>
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
import RoomSignup from './RoomSignup';

export default {
  components: {
    Price,
    RoomSignup,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    multiple: Boolean,
    conRide: Boolean,
    conCanadian: Boolean,
    firstDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    lastDate: {
      type: Number,
      validator: value => value % 1 === 0,
    },
    isFuture: Boolean,
    cost: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      paid: this.person.paid,
      pictureIsPhoto: !/\/A{11}\//.test(this.person.picture),
      formOpen: false,
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
    conApproaching() {
      return differenceInCalendarDays(this.firstDate, new Date()) <= 4;
    },
    iconTitle() {
      if (this.formOpen) return 'Close';
      if (this.person.id === this.user.id) return 'Edit your preferences';
      return 'Edit this person';
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

.returnCar {
  transform: scaleX(-1);
}

.divider.v-divider.theme--dark {
  border-color: white;
}

.payment {
  margin-top: -6px;
}
</style>
