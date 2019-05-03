<template>
  <div>
    <template v-if="!photos.length">
      <img
        v-if="value && value.thumbnail"
        :src="value.thumbnail"
      />
      <button @click="getPhotos">Change Photo</button>
    </template>
    <template v-else>
      <img
        v-for="photo of photos"
        :key="photo.id"
        :src="photo.url_q"
        @click="setPhoto(photo)"
      />
    </template>
  </div>
</template>

<script>
import { getUnixTime, subYears, toDate } from 'date-fns';
import Flickr from 'flickr-sdk';
import map from 'lodash/map';

const flickr = new Flickr('ee8e8f2645fe385dcf72fbe0aeadd8d8');

export default {
  props: {
    con: {
      type: Object,
      required: true,
    },
    value: Object,
  },
  data() {
    return {
      photos: [],
    }
  },
  computed: {
    photoUrls() {
      if (!this.photos.length) return null;
      return map(this.photos, 'url_q');
    }
  },
  methods: {
    async getPhotos() {
      const { body: { photos: { photo } } } = await flickr.photos.search({
        content_type: 1,
        extras: 'url_sq,url_q,url_l,color_codes',
        license: '1,2,3,4,5,6,7,8,9,10',
        per_page: 12,
        sort: 'interestingness-desc',
        text: `"${this.con.name}"`,
        min_taken_date: getUnixTime(subYears(toDate(this.con.dates.start), 5)),
      });
      this.photos = photo;
    },
    async setPhoto({ owner, url_sq: thumbnail, url_l: url }) {
      const {
        body: {
          person: {
            realname: { _content: credit },
            photosurl: { _content: link },
          },
        },
      } = await flickr.people.getInfo({ user_id: owner });
      this.$emit('input', {
        credit,
        link,
        thumbnail,
        url,
      });
      this.photos = [];
    }
  }
}
</script>
