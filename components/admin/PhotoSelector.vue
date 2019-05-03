<template>
  <div>
    <template v-if="!photos.length">
      <img
        v-if="value && value.thumbnail"
        :src="value.thumbnail"
        @click="getPhotos"
      />
      <button
        v-else
        @click="getPhotos"
      >
        Choose photo
      </button>
    </template>
    <template v-else>
      <img
        v-for="photo of photos"
        :key="photo.id"
        :src="photo.url_s"
        class="thumbnail"
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

const flickrColors = {
  0: { swatch: '#ff2000', name: 'Red' },
	1: { swatch: '#a24615', name: 'Brown' },
	2: { swatch: '#ff7c00', name: 'Orange' },
	3: { swatch: '#ffcf00', name: 'Amber' },
	4: { swatch: '#fffa00', name: 'Yellow' },
	5: { swatch: '#90e200', name: 'Lime' },
	6: { swatch: '#00ab00', name: 'Green' },
	7: { swatch: '#00b2d4', name: 'Cyan' },
	8: { swatch: '#0062c6', name: 'Blue' },
	9: { swatch: '#8c20ba', name: 'Purple' },
	a: { swatch: '#f52394', name: 'Pink' },
	b: { swatch: '#ff9f9c', name: 'Salmon' },
	c: { swatch: '#ffffff', name: 'White' },
	d: { swatch: '#7c7c7c', name: 'Gray' },
	e: { swatch: '#000000', name: 'Black' },
};

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
        extras: 'url_sq,url_s,url_l,color_codes',
        license: '1,2,3,4,5,6,7,8,9,10',
        per_page: 12,
        sort: 'interestingness-desc',
        text: `"${this.con.name}"`,
        min_taken_date: getUnixTime(subYears(toDate(this.con.dates.start), 5)),
      });
      this.photos = photo;
    },
    async setPhoto({ color_codes: colorString, owner, url_sq: thumbnail, url_l: url }) {
      const colors = colorString.split(',').map((codePair) => {
        return flickrColors[codePair.split('|')[0]].name.toLowerCase();
      });
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
      }, colors.join());
      this.photos = [];
    }
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 160px;
  height: 160px;
  object: {
    fit: cover;
    position: top;
  }
}
</style>
