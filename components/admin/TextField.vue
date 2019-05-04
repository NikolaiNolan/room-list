<template>
  <span>
    <span v-if="label">{{keyPath}}:</span>
    <input
      v-model="model"
      @input="$fireDb.ref(refPath).update({ [keyPath]: model || null });"
      @keyup.enter="$event.target.blur"
    />
  </span>
</template>

<script>
export default {
  props: {
    label: Boolean,
    refPath: {
      type: String,
      required: true,
    },
    keyPath: {
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
