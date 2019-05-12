<template>
  <div class="price">
    <VListTileTitle class="text-xs-right">
      ${{Math.ceil(price)}}
    </VListTileTitle>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.price {
  width: 2.75em;
}
</style>
