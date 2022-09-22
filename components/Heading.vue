<template>
  <component
    :is="tag"
    class="heading"
  >
    <slot />
    <span class="shadow" aria-hidden="true">
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'h1',
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  position: relative;
  z-index: 0;
}

.shadow {
  @include absolute-center;
  z-index: -1;
  color: transparent;
  text-shadow: 0 0 2em #7b6455;
}
</style>
