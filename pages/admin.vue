<template>
  <VApp>
    <Login />
    <template v-if="admin">
      <TextField
        v-for="(value, key) of config"
        :key="key"
        label
        :dbRef="$fireDb.ref('config')"
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
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <no-ssr>
            <Row
              v-for="con of cons"
              :key="con.id"
              :dbRef="$fireDb.ref(`cons/${con.id}`)"
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
import { mapGetters, mapState } from 'vuex';

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
          path: 'link',
          name: 'Link',
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
          path: 'ride/available',
          name: 'Ride',
          type: 'checkbox',
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
          path: 'color',
          name: 'Color',
        },
      ],
    };
  },
  computed: {
    ...mapState('config', ['config']),
    ...mapState('user', ['admin']),
    ...mapGetters({
      cons: 'cons/allCons',
    }),
  },
  beforeMount() {
    this.$store.dispatch('user/bind', this);
    this.$store.dispatch('cons/bindAll', this);
    this.$store.dispatch('config/bind', this);
  },
  methods: {
    addCon() {
      this.$fireDb.ref('cons').push(0);
    },
  },
};
</script>

<style lang="scss">
html {
  overflow: auto;
}
</style>
