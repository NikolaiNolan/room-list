<template>
  <div class="card">
    <VImg
      v-if="photoSrc && $vuetify.breakpoint.smAndUp"
      aspect-ratio="2"
      :src="photoSrc"
      :srcset="photoSrcset"
      sizes="285px"
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
    @media (max-width: 599px) {
      margin: 0 8px 0 -4px;
    }

    @media (min-width: 600px) {
      align-self: flex-start;
      margin: -7px 8px;
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
    @media (min-width: 600px) {
      margin-top: 8px;
      margin-bottom: 8px;
      min-height: 32px;
    }
  }

  small {
    font-size: 13px;
  }
}
</style>
