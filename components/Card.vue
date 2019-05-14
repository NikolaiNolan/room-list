<template>
  <div class="card">
    <VImg
      v-if="photoSrc"
      aspect-ratio="2"
      :src="photoSrc"
      :srcset="photoSrcset"
      sizes="285px"
      class="mt-3"
    />
    <VListTile
      :href="href"
      target="_blank"
      rel="noopener"
    >
      <VLayout align-start>
        <VAvatar
          v-if="icon"
          class="mx-2"
        >
          <VIcon>{{icon}}</VIcon>
        </VAvatar>
        <div class="content mr-2">
          {{smartQuotes(title)}}
          <br v-if="photoSrc" />
          <small v-if="subtitle">
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
    photoSrc: String,
    photoSrcset: String,
    href: String,
    icon: String,
    title: String,
    subtitle: String,
  },
  methods: {
    smartQuotes,
  },
};
</script>

<style lang="scss" scoped>
.card {
  /deep/ .v-list__tile {
    padding: {
      left: 0;
      right: 0;
    }
    height: auto;
  }

  /deep/ .v-avatar {
    margin: {
      top: -7px;
      bottom: -7px;
    }

    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: -8px;
      border: solid;
      border-width: 0 26px 15px;
      border-color: transparent;
      transition: background .3s cubic-bezier(.25, .8, .5, 1);
    }
  }

  .v-avatar ~ .content {
    margin: {
      top: 8px;
      bottom: 8px;
    }
    min-height: 32px;
  }

  small {
    font-size: 13px;
  }
}
</style>
