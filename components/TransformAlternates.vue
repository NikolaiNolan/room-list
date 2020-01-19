<template>
  <span
    class="alternates"
    v-html="text"
  />
</template>

<script>
export default {
  computed: {
    text() {
      return this.$slots.default[0].text.replace(/([aeft]+)/g, match => `<span>${match}</span>`);
    },
  },
};
</script>

<style lang="scss" scoped>
.alternates /deep/ span {
  font-family: 'Montserrat Alternates', $font-stack-system, sans-serif;
}
</style>
