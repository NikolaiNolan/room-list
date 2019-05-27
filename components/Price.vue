<template>
  <div class="price">
    <VListTileTitle class="text-xs-right">
      ${{Math.ceil(price)}}
    </VListTileTitle>
    <VListTileSubTitle
      v-if="toCanadian"
      class="text-xs-right"
    >
      <span class="material-design-icon">
        <MapleLeafIcon class="icon material-design-icon__svg" />
      </span>
      ${{Math.ceil(price * exchange)}}
    </VListTileSubTitle>
    <VListTileSubTitle
      v-if="fromCanadian"
      class="text-xs-right"
    >
      <VIcon class="icon">star</VIcon>
      ${{Math.ceil(price / exchange)}}
    </VListTileSubTitle>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import MapleLeafIcon from '~/assets/images/maple-leaf.svg?inline';

export default {
  components: {
    MapleLeafIcon,
  },
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
  @include margin(-1px null -3px);
  @include size(16px);
  fill: currentColor;
}
</style>
