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
      <Field
        type="textarea"
        :dbRef="$fireDb.ref('notes')"
        :con="con"
        :name="con.id"
        :value="notes && notes['.value']"
      />
    </td>
    <td>
      <button @dblclick="dbRef.remove()">Delete</button>
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
      notes: null,
    };
  },
  firebase() {
    return {
      notes: this.$fireDb.ref(`notes/${this.con.id}`),
    }
  }
};
</script>
