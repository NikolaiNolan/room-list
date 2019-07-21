<template>
  <VApp dark>
    <Conventions />
  </VApp>
</template>

<script>
import Conventions from '~/components/Conventions';

export default {
  components: {
    Conventions,
  },
  beforeMount() {
    this.$store.dispatch('geolocation/bind');
    this.$store.dispatch('user/bind', this);
    this.$store.dispatch('cons/bind', this);
    this.$store.dispatch('config/bind', this);
  },
};
</script>

<style lang="scss">
@include min-width(sm) {
  html {
    height: 100%;
    overflow: {
      x: scroll;
      y: hidden;
    }
  }

  body,
  body > div,
  body > div > div,
  .application,
  .application--wrap,
  .cons {
    flex: 1;
    display: flex;
    height: 100%;
  }

  .application--wrap {
    min-height: 0;
  }
}
</style>
