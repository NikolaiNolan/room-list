<template>
  <div class="card">
    <component
      :is="noLazy ? 'img' : 'VLazyImage'"
      v-if="photoSrc"
      :src-placeholder="$placeholder"
      :src="photoSrc"
      :srcset="photoSrcset"
      :sizes="`
        (max-width: ${$vuetify.breakpoint.thresholds.xs - 1}px) calc(100vw - 16px - 16px),
        288px
      `"
      alt
      :intersection-options="$intersectionOptions"
      class="photo"
    />
    <VListTile
      :href="href"
      target="_blank"
      rel="noopener"
    >
      <VLayout align-center>
        <VAvatar v-if="icon">
          <VIcon>{{icon}}</VIcon>
        </VAvatar>
        <div class="content mr-2">
          {{smartQuotes(title)}}
          <br v-if="photoSrc" />
          <small
            v-if="subtitle"
            class="d-inline-block"
          >
            {{smartQuotes(subtitle)}}
          </small>
        </div>
      </VLayout>
    </VListTile>
  </div>
</template>

<script>
import smartQuotes from 'smartquotes';

export default {
  props: {
    noLazy: Boolean,
    photoSrc: String,
    photoSrcset: String,
    icon: String,
    href: String,
    title: String,
    subtitle: String,
  },
  methods: {
    smartQuotes,
  },
};
</script>

<style lang="scss" scoped>
/deep/ .v-list__tile {
  @include padding(null 0);
  height: auto;
}

.photo {
  @include size($header-width, $header-width / 2);
  @include object-fit(cover);
  display: block;

  @media (max-width: map-get($grid-breakpoints, sm) - 1), (max-height: 700px - 1) {
    display: none;
  }
}

/deep/ .v-avatar {
  @include margin(null 8px null -4px);

  @media (min-width: map-get($grid-breakpoints, sm)) and (min-height: 700px) {
    align-self: flex-start;
    margin: -7px 8px;

    @include generated-block(before) {
      @include position(absolute, -8px null null -2px);
      border: solid;
      border-width: 0 26px 15px;
      border-color: transparent;
      transition: background .3s cubic-bezier(.25, .8, .5, 1);
    }
  }
}

.v-avatar ~ .content {
  @media (min-width: map-get($grid-breakpoints, sm)) and (min-height: 700px) {
    @include margin(8px null);
    min-height: 32px;
  }
}

small {
  font-size: 13px;
}
</style>
