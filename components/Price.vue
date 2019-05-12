<template>
  <div class="price">
    ${{Math.ceil(price)}}
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
  width: 2.5em;
  text-align: right;
}
</style>
