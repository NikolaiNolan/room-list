<template>
  <VLayout
    tag="footer"
    column
    justify-end
    :class="'footer pa-3'"
  >
    <div>
      <h2 class="heading d-inline">Photos courtesy of</h2>
      <ul class="credits d-inline">
        <template v-for="con of cons">
          <li
            :key="con.id"
            v-if="has(con, 'photo.credit')"
            class="credit d-inline"
          >
            <a
              :href="con.photo.link"
              target="_blank"
              rel="noopener"
              class="credit__link"
              v-html="con.photo.credit"
            />
            <template v-if="con.photo.license">
              (<a
                :href="con.photo.license.link"
                target="_blank"
                rel="noopener"
                class="credit__link"
                v-html="con.photo.license.name"
              />)</template></li>
          <template v-if="has(con, 'hotel.photo.attributions.0')">
            <li
              v-for="(attribution, index) of con.hotel.photo.attributions"
              :key="`${con.id}${index}`"
              class="credit d-inline"
            >
              <a
                :href="attribution.link"
                target="_blank"
                rel="noopener"
                class="credit__link"
                v-html="attribution.name"
              />
            </li>
          </template>
        </template>
      </ul>
    </div>
  </VLayout>
</template>

<script>
import has from 'lodash/has';
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    cons: 'cons/cons',
  }),
  methods: {
    has,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  flex-shrink: 0;
  font-size: 11px;

  @include min-width(sm) {
    width: $header-width * 7/9;
  }

  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    padding: 24px !important;
  }
}

.heading {
  font: {
    weight: 600;
    size: inherit;
  }
}

.credits {
  @include list-reset;
}

.credit {
  &:not(:last-child)::after {
    content: ', '
  }

  &__link {
    color: inherit;
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
