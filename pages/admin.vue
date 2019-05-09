<template>
  <VApp>
    <Login />
    <template v-if="$store.state.admin">
      <TextField
        v-for="(value, key) of config"
        :key="key"
        label
        :dbRef="$firebaseRefs.config"
        :path="key"
        :value="value"
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
              :dbRef="$firebaseRefs.cons.child(con['.key'])"
              v-bind="{ con, fields }"
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
  </VApp>
</template>

<script>
import isAfter from 'date-fns/isAfter';

import Login from '~/components/Login';
import Row from '~/components/admin/Row';
import TextField from '~/components/admin/TextField';

export default {
  components: {
    Login,
    Row,
    TextField,
  },
  data() {
    return {
      config: {},
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
          path: 'ride/toll',
          name: 'Toll',
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
        },
        {
          path: 'notes',
          name: 'Notes',
          type: 'textarea',
        }
      ],
    };
  },
  computed: {
    futureCons() {
      return this.cons.filter(({ dates }) => {
        if (!dates || !dates.start || !dates.end) return true;
        if (isAfter(dates.start, new Date())) return true;
        if (isAfter(dates.end, new Date())) return true;
        return false;
      });
    },
  },
  firebase() {
    return {
      config: {
        source: this.$fireDb.ref('config'),
        asObject: true,
      },
      cons: this.$fireDb.ref('cons').orderByChild('dates/start'),
    };
  },
  methods: {
    addCon() {
      this.$firebaseRefs.cons.push(0);
    },
  },
};
</script>
