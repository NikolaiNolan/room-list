<template>
  <component
    :is="tag"
    class="heading"
  >
    <TransformAlternates><slot /></TransformAlternates>
    <span class="shadow" aria-hidden="true">
      <TransformAlternates><slot /></TransformAlternates>
    </span>
  </component>
</template>

<script>
import TransformAlternates from '~/components/TransformAlternates';

export default {
  components: {
    TransformAlternates,
  },
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
  @include cover-background;
  color: transparent;
  text-shadow: 0 0 2em #7b6455;
}
</style>
