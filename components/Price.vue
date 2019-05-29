<template>
  <div class="price">
    <VListTileTitle class="text-xs-right">
      ${{Math.ceil(price)}}
    </VListTileTitle>
    <VListTileSubTitle
      v-if="toCanadian"
      title="Canadian"
      class="text-xs-right"
    >
      <VIcon small>$vuetify.icons.mapleLeaf</VIcon>
      ${{Math.ceil(price * exchange)}}
    </VListTileSubTitle>
    <VListTileSubTitle
      v-if="fromCanadian"
      title="American"
      class="text-xs-right"
    >
      <VIcon small>$vuetify.icons.star</VIcon>
      ${{Math.ceil(price / exchange)}}
    </VListTileSubTitle>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
    toCanadian: Boolean,
    fromCanadian: Boolean,
  },
  computed: mapGetters({
    exchange: 'config/exchange',
  }),
};
</script>

<style lang="scss" scoped>
.price {
  width: 3.75em;
}

.icon {
  // @include margin(-1px null -3px);
  // @include size(16px);
  // fill: currentColor;
}
</style>
