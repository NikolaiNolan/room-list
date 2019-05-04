<template>
  <div>
    <TextField
      v-for="field of config"
      :key="field['.key']"
      label
      refPath="config"
      :keyPath="field['.key']"
      :value="field['.value']"
    />
    <table>
      <thead>
        <tr>
          <th
            v-for="field of fields"
            :key="field.path"
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
  </div>
</template>

<script>
import isAfter from 'date-fns/isAfter';
import toDate from 'date-fns/toDate';

import TextField from '~/components/admin/TextField';
import Row from '~/components/admin/Row';

export default {
  components: {
    TextField,
    Row,
  },
  data() {
    return {
      config: [],
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
          path: 'room/rate',
          name: 'Room Rate',
          type: 'currency',
        },
        {
          path: 'ride/count',
          name: 'Ride Count',
          type: 'number',
        },
        {
          path: 'ride/parking',
          name: 'Parking',
          type: 'currency',
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
      config: this.$fireDb.ref('config'),
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
