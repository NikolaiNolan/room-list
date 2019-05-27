<template>
  <component
    :is="noLazy ? 'picture' : 'VLazyImage'"
    :use-picture="!noLazy"
    :src="noLazy ? null : $image(largestSrc)"
    :srcset="noLazy ? null : desktopSrcset"
    :sizes="noLazy ? null : desktopWidth"
    v-bind="noLazy ? null : { alt, intersectionOptions }"
  >
    <source
      v-if="webp"
      :media="`(max-width: ${$vuetify.breakpoint.thresholds.xs - 1}px)`"
      type="image/webp"
      :srcset="mobileWebpSrcset"
      :sizes="mobileWidth"
    />
    <source
      :media="`(max-width: ${$vuetify.breakpoint.thresholds.xs - 1}px)`"
      :srcset="mobileSrcset"
      :sizes="mobileWidth"
    />
    <source
      v-if="webp"
      type="image/webp"
      :srcset="desktopWebpSrcset"
      :sizes="desktopWidth"
    />
    <img
      v-if="noLazy"
      :src="$image(largestSrc)"
      :srcset="desktopSrcset"
      :sizes="desktopWidth"
      :alt="alt"
    />
  </component>
</template>

<script>
export default {
  props: {
    template: {
      type: String,
      required: true,
    },
    webp: Boolean,
    noLazy: Boolean,
    alt: {
      type: String,
      default: '',
    },
    mobileWidth: String,
    mobileVariants: {
      type: Array,
      default: () => [800, 1000],
    },
    desktopWidth: String,
    desktopVariants: {
      type: Array,
      default: () => [1200, 1600, 2000, 2400, 2800, 3200],
    },
    intersectionOptions: {
      type: Object,
      default() {
        return this.$intersectionOptions;
      },
    },
  },
  computed: {
    fallbackSize() {
      return this.desktopVariants[Math.floor(this.desktopVariants.length / 2)];
    },
    largestSrc() {
      return this.template.replace('%width%', this.fallbackSize);
    },
    mobileSrcset() {
      return this.buildSrcset(this.mobileVariants);
    },
    mobileWebpSrcset() {
      return this.buildSrcset(this.mobileVariants, { webp: true });
    },
    desktopSrcset() {
      return this.buildSrcset(this.desktopVariants);
    },
    desktopWebpSrcset() {
      return this.buildSrcset(this.desktopVariants, { webp: true });
    },
  },
  methods: {
    buildSrcset(variants, { webp } = {}) {
      let { template } = this;
      if (webp) template = template.replace(/\.(png|jpe?g)$/, '.webp');
      return variants
        .map(size => `${this.$image(template.replace('%width%', size))} ${size}w`)
        .join();
    },
  },
};
</script>
