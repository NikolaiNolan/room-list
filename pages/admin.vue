<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="field of fields"
          :key="field.id"
        >
          {{field.name}}
        </th>
      </tr>
    </thead>
    <tbody>
      <no-ssr>
        <Row
          v-for="con of futureCons"
          :key="con['.key']"
          :id="con['.key']"
          :con="con"
          :fields="fields"
        />
        <tr>
          <td>
            <button @click="addCon">Add Con</button>
          </td>
        </tr>
      </no-ssr>
    </tbody>
  </table>
</template>

<script>
import { isAfter, toDate } from 'date-fns';

import Row from '~/components/admin/Row';

export default {
  components: {
    Row,
  },
  data() {
    return {
      cons: [],
      fields: [
        {
          path: 'name',
          name: 'Name',
        },
        {
          path: 'dates/start',
          name: 'Start Date',
          type: 'date',
        },
        {
          path: 'dates/daysEarly',
          name: 'Days Early',
          type: 'number',
        },
        {
          path: 'dates/end',
          name: 'End Date',
          type: 'date',
        },
        {
          path: 'dates/daysLate',
          name: 'Days Late',
          type: 'number',
        },
        {
          path: 'hotel/name',
          name: 'Location',
          type: 'places',
        },
        {
          path: 'room/rate',
          name: 'Room Rate',
          type: 'currency',
        },
        {
          path: 'room/count',
          name: 'Room Count',
          type: 'number',
        },
        {
          path: 'room/suite',
          name: 'Suite',
          type: 'checkbox',
        },
        {
          path: 'photo',
          name: 'Photo',
          type: 'photo',
        },
        {
          path: 'colors',
          name: 'Colors',
        }
      ],
    };
  },
  computed: {
    futureCons() {
      return this.cons.filter(({ dates }) => {
        if (!dates || !dates.start || !dates.end) return true;
        if (isAfter(toDate(dates.start), new Date())) return true;
        if (isAfter(toDate(dates.end), new Date())) return true;
        return false;
      });
    },
  },
  firebase() {
    return {
      cons: this.$fireDb.ref('cons').orderByChild('dates/start'),
    };
  },
  methods: {
    addCon() {
      this.$fireDb.ref('cons').push(0);
    },
  },
};
</script>
