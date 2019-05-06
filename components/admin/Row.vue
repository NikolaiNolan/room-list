<template>
  <tr>
    <td
      v-for="field of fields"
      :key="field.path"
    >
      <Field
        :type="field.type"
        :dbRef="dbRef"
        :con="con"
        :name="field.path"
        :value="get(con, field.path.replace(/\//g, '.'))"
      />
    </td>
    <td>
      <button @dblclick="con.ref.remove()">Delete</button>
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
    dbRef: {
      type: Object,
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
};
</script>
