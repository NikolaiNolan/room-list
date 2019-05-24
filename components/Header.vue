<template>
  <VLayout
    tag="header"
    :column="$vuetify.breakpoint.smAndUp"
    align-center
    class="header pa-4"
    :style="$vuetify.breakpoint.smAndUp && `width: 288px`"
  >
    <Logo
      class="logo"
      :class="{
        'mr-3': $vuetify.breakpoint.xs,
        'mb-3': $vuetify.breakpoint.smAndUp,
      }"
      :style="logoStyles"
    />
    <h1
      class="heading"
      :class="`display-${$vuetify.breakpoint.xs ? 1 : 2}`"
    >
      <TransformAlternates>Nikolai’s</TransformAlternates>
      <TransformAlternates>Con Room</TransformAlternates>
      &amp;&nbsp;<TransformAlternates>Ride List</TransformAlternates>
      <span class="shadow" aria-hidden="true">
        <TransformAlternates>Nikolai’s</TransformAlternates>
        <TransformAlternates>Con Room</TransformAlternates>
        &amp;&nbsp;<TransformAlternates>Ride List</TransformAlternates>
      </span>
    </h1>
    <picture>
      <source
        :media="`(max-width: ${$vuetify.breakpoint.thresholds.xs - 1}px)`"
        type="image/webp"
        srcset="
          ~/assets/images/background/800.webp 800w,
          ~/assets/images/background/1000.webp 1000w,
          ~/assets/images/background/1200.webp 1200w
        "
      />
      <source
        :media="`(max-width: ${$vuetify.breakpoint.thresholds.xs - 1}px)`"
        srcset="
          ~/assets/images/background/800.jpg 800w,
          ~/assets/images/background/1000.jpg 1000w,
          ~/assets/images/background/1200.jpg 1200w
        "
      />
      <source
        type="image/webp"
        srcset="
          ~/assets/images/background/576.webp 576w,
          ~/assets/images/background/768.webp 584w
        "
        sizes="288px"
      />
      <img
        src="~/assets/images/background/576.jpg"
        srcset="
          ~/assets/images/background/576.jpg 576w,
          ~/assets/images/background/768.jpg 584w
        "
        sizes="288px"
        alt
        class="background"
      />
    </picture>
  </VLayout>
</template>

<script>
import Logo from '~/assets/images/logo.svg?inline';
import TransformAlternates from '~/components/TransformAlternates';

export default {
  components: {
    Logo,
    TransformAlternates,
  },
  computed: {
    logoStyles() {
      if (this.$vuetify.breakpoint.xs) return `
        width: 96px;
        height: 111px;
      `;
      return `
        width: 192px;
        height: 222px;
      `;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 0;
  flex: none;
}

.logo {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.heading {
  position: relative;
  z-index: 0;
}

.background,
.shadow {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shadow {
  color: transparent;
  text-shadow: 0 0 2em rgba(123, 100, 85, .5);
}
</style>
