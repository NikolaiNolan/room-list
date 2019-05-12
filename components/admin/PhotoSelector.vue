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
        Choose
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
      <button @click="photos = []">Cancel</button>
    </template>
  </div>
</template>

<script>
import getUnixTime from 'date-fns/getUnixTime';
import subYears from 'date-fns/subYears';
import flickrColors from '~/plugins/flickrColors';
import Flickr from 'flickr-sdk';
import find from 'lodash/find';
import map from 'lodash/map';
import reducedColors from '~/plugins/reducedColors';

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
      const response = await flickr.photos.search({
        content_type: 1,
        extras: 'url_sq,url_s,url_z,url_c,url_l,url_o,color_codes',
        license: '1,2,3,4,5,6,7,8,9,10',
        per_page: 20,
        sort: 'interestingness-desc',
        text: `"${this.con.name}"`,
        min_taken_date: getUnixTime(subYears(this.con.dates.start, 10)),
        dimension_search_mode: 'min',
        height: 641,
        width: 641
      });
      this.photos = response.body.photos.photo;
    },
    async setPhoto({
      color_codes: colorString = '',
      owner,
      url_sq: thumbnail,
      url_z: small,
      url_c: medium,
      url_l: large,
      url_o: original,
    }) {
      let photoColors = null;
      let conColor = null;
      if (colorString) {
        photoColors = colorString.split(',').map((codePair) => {
          const id = codePair.split('|')[0];
          const color = find(flickrColors, { id }) || find(flickrColors, { swatch: id.slice(-6) });
          return color.name.toLowerCase();
        });
        conColor = photoColors.map(colorName => reducedColors[colorName]).find(color => color);
      }
      const response = await flickr.people.getInfo({ user_id: owner });
      this.$emit('input', {
        credit: (response.body.person.realname || response.body.person.username)._content,
        link: response.body.person.photosurl._content,
        thumbnail,
        small,
        medium,
        large,
        original,
        colors: photoColors,
      }, conColor);
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
