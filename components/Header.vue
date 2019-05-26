<template>
  <VLayout
    tag="header"
    column
    class="header"
  >
    <VLayout
      justify-center
      align-center
      class="header__top pa-3"
    >
      <VLazyImage
        use-picture
        src="~/assets/images/background/576.jpg"
        srcset="
          ~/assets/images/background/576.jpg 576w,
          ~/assets/images/background/768.jpg 584w
        "
        sizes="288px"
        alt
        :intersection-options="$intersectionOptions"
        class="background"
      >
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
      </VLazyImage>
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
    </VLayout>
    <VSpacer />
    <aside class="actions px-3 py-2">
      <Login />
    </aside>
  </VLayout>
</template>

<script>
import Login from '~/components/Login';
import Logo from '~/assets/images/logo.svg?inline';
import TransformAlternates from '~/components/TransformAlternates';

export default {
  components: {
    Login,
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
    width: $header-width - 16px;
  }

  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    width: $header-width;
  }

  &__top {
    flex-grow: 0;

    @include max-width(sm) {
      position: relative;
    }

    @include min-width(sm) {
      flex-direction: column;
    }

    @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
      padding: 24px !important;
    }
  }
}

.background /deep/ img{
  @include cover-background;

  @include min-width(sm) {
    object-position: top;
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

.shadow {
  @include cover-background;
  color: transparent;
  text-shadow: 0 0 2em #7b6455;
}

.actions {
  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    padding: 24px !important;
  }
}
</style>
