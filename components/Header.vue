<template>
  <VLayout
    tag="header"
    column
    class="header"
  >
    <VLayout
      column
      class="header__inner"
    >
      <VLayout
        justify-center
        align-center
        class="header__top pa-3"
      >
        <ResponsivePicture
          template="background/%width%.jpg"
          webp
          :mobile-variants="[800, 1000, 1200]"
          desktop-width="288px"
          :desktop-variants="[576, 768]"
          class="background"
        />
        <Logo class="logo" />
        <Heading class="heading display-1">Nikolai’s
          Con Room
          &amp;&nbsp;Ride&nbsp;List</Heading>
      </VLayout>
      <VSpacer />
      <aside class="login px-3">
        <Login />
        <VBtn
          v-if="admin"
          href="/admin"
          target="_blank"
          block
          depressed
          :disabled="$nuxt.isOffline"
          class="button mx-0 text-none"
        >
          Admin
        </VBtn>
      </aside>
    </VLayout>
    <Rules class="rules" />
  </VLayout>
</template>

<script>
import { mapState } from 'vuex';

import Heading from './Heading';
import Login from './Login';
import Logo from '~/assets/images/logo.svg?inline';
import ResponsivePicture from './ResponsivePicture';
import Rules from './HeaderRules';

export default {
  components: {
    Heading,
    Login,
    Logo,
    ResponsivePicture,
    Rules,
  },
  computed: {
    ...mapState('user', ['admin']),
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 0;
  flex: none;

  @include min-width(sm) {
    padding-bottom: 50px;
    width: $header-width - 16px;
  }

  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    width: $header-width;
  }

  &__inner {
    position: relative;
    z-index: 0;

    @include min-width(sm) {
      background: url(~assets/images/background/placeholder-desktop.png) center top {
        size: cover;
      }
    }
  }

  &__top {
    flex: none;

    @include max-width(sm) {
      position: relative;
      z-index: 0;
      background: url(~assets/images/background/placeholder-mobile.png) center {
        size: cover;
      }
    }

    @include min-width(sm) {
      flex-direction: column;
    }

    @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
      padding: 24px !important;
    }
  }
}

.background /deep/ img {
  @include cover-background;

  @include min-width(sm) {
    object-position: top;
  }
}

.logo {
  align-self: center;
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
  width: 5.5em;

  @include min-width(432px) {
    width: 8.5em;
  }

  @include min-width(sm) {
    width: auto;
    font-size: 52px !important;
    line-height: 50px !important;
  }
}

.login {
  @include min-width(sm) {
    padding: 0 24px 8px !important;
  }
}

.rules {
  @include min-width(sm) {
    @include position(absolute, null 0 0);
  }
}
</style>
