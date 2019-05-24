<template>
  <VLayout
    tag="header"
    justify-center
    align-center
    class="header pa-3"
  >
    <Logo class="logo" />
    <h1 class="heading display-1">
      <TransformAlternates>Nikolai’s
        Con Room
        &amp;&nbsp;Ride&nbsp;List</TransformAlternates>
      <span class="shadow" aria-hidden="true">
        <TransformAlternates>Nikolai’s
          Con Room
          &amp;&nbsp;Ride&nbsp;List</TransformAlternates>
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
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 0;
  flex: none;

  @include min-width(sm) {
    flex-direction: column;
    justify-content: flex-start;
    width: $header-width - 16px;
  }

  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    padding: 24px !important;
    width: $header-width;
  }
}

.logo {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  fill: currentColor;

  @include max-width(sm) {
    @include size(96px, 111px);
    margin-right: 16px;
  }

  @include min-width(sm) {
    @include size(192px, 222px);
    margin-bottom: 16px;
  }
}

.heading {
  position: relative;
  z-index: 0;
  width: 5em;

  @include min-width(405px) {
    width: 8em;
  }

  @include min-width(sm) {
    width: auto;
    font-size: 48px !important;
    line-height: 50px !important;
  }
}

.background {
  @include cover-background;

  @include min-width(sm) {
    object-position: top;
  }
}

.shadow {
  @include cover-background;
  color: transparent;
  text-shadow: 0 0 2em #7b6455;
}
</style>
