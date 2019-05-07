<template>
  <VAvatar>
    <img
      :src="picture"
      alt
      class="picture"
    />
  </VAvatar>
</template>

<script>
export default {
  props: {
    picture: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.v-avatar .picture {
  @supports (clip-path: polygon(0 0)) {
    border-radius: 0;
    clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
  }
}
</style>
