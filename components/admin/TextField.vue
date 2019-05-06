<template>
  <span>
    <span v-if="label">{{path}}:</span>
    <input
      v-model="model"
      @input="dbRef.update({ [path]: model || null });"
      @keyup.enter="$event.target.blur"
    />
  </span>
</template>

<script>
export default {
  props: {
    label: Boolean,
    dbRef: {
      type: Object,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    value: [Number, String],
  },
  data() {
    return {
      model: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.model = value;
      },
    },
  },
}
</script>
