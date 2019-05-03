<template>
  <tr>
    <td
      v-for="field of fields"
      :key="field.id"
    >
      <Field
        :type="field.type"
        :id="id"
        :con="con"
        :name="field.id"
        :value="get(con, field.id.replace(/\//g, '.'))"
      />
    </td>
    <td>
      <button @dblclick="deleteCon">Delete</button>
    </td>
  </tr>
</template>

<script>
import get from 'lodash/get';

import Field from './Field';

export default {
  components: {
    Field,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    con: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      get,
    };
  },
  methods: {
    deleteCon() {
      this.$fireDb.ref('cons').child(this.id).remove();
    },
  },
};
</script>
