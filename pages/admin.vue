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
          id: 'name',
          name: 'Name',
        },
        {
          id: 'dates/start',
          name: 'Start Date',
          type: 'date',
        },
        {
          id: 'dates/end',
          name: 'End Date',
          type: 'date',
        },
        {
          id: 'hotel/name',
          name: 'Location',
          type: 'places',
        },
        {
          id: 'photo',
          name: 'Photo',
          type: 'photo',
        },
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
