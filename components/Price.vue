<template>
  <div class="price">
    <VListTileTitle class="text-xs-right">
      ${{Math.ceil(price)}}
    </VListTileTitle>
    <VListTileSubTitle
      v-if="toCanadian"
      class="text-xs-right"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 80.83" class="icon">
        <path d="M85,42.09a1.5,1.5,0,0,0-.75-1.19l-4.12-2.36c.55-1.79,2.25-7.2,3.43-10.92a1.5,1.5,0,0,0-1.72-1.92l-10.11,2-3-5.33a1.5,1.5,0,0,0-2.44-.24l-8,9.34c.67-3,3-13.23,4.63-20.32a1.5,1.5,0,0,0-2.19-1.65c-2.24,1.23-5.62,3.09-7.19,3.93L46.3.76A1.5,1.5,0,0,0,45,0h0a1.5,1.5,0,0,0-1.31.76L36.56,13.41c-1.57-.84-5-2.7-7.2-3.93a1.5,1.5,0,0,0-2.19,1.65l4.65,20.33L23.77,22.1a1.5,1.5,0,0,0-2.44.24l-3,5.33-10.11-2a1.5,1.5,0,0,0-1.72,1.92c1.18,3.72,2.88,9.13,3.43,10.92L5.8,40.9a1.5,1.5,0,0,0-.19,2.48L24.75,58.6c-.33,1.33-1.3,5.11-1.93,7.55A1.5,1.5,0,0,0,24.59,68L40.5,64V79.33c0,.83,3.67,1.5,4.5,1.5s4.5-.67,4.5-1.5V64l15.92,4a1.5,1.5,0,0,0,1.76-1.84c-.63-2.44-1.6-6.21-1.94-7.55L84.39,43.37A1.5,1.5,0,0,0,85,42.09Z"/>
      </svg>
      ${{Math.ceil(price * exchange)}}
    </VListTileSubTitle>
    <VListTileSubTitle
      v-if="fromCanadian"
      class="text-xs-right"
    >
      <VIcon
        small
        class="icon"
      >
        mdi-star
      </VIcon>
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
  @include margin(-1px null -3px);
  @include size(16px);
  color: inherit;
  fill: currentColor;
}
</style>
