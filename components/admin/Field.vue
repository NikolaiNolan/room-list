<template>
  <div>
    <GmapAutocomplete
      v-if="type === 'places'"
      :value="value"
      @place_changed="setPlace"
    />
    <DateField
      v-else-if="type === 'date'"
      :value="value"
      @input="(value) => update({ [name]: value })"
    />
    <input
      v-else
      :type="type"
      v-model="inputValue"
      @input="update({ [name]: inputValue })"
      @keyup.enter="$el.blur"
    />
  </div>
</template>

<script>
import filter from 'lodash/filter';

import DateField from './DateField';

export default {
  components: {
    DateField,
  },
  props: {
    type: String,
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: [String, Number],
  },
  data() {
    return {
      inputValue: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.inputValue = value;
      },
    },
  },
  methods: {
    setPlace({
      address_components: address,
      geometry: {
        location: { lat, lng },
      },
      name,
      photos: [photo],
      place_id: placeId,
      website: link,
    }) {
      const city = filter(address, { types: ['locality'] })[0].long_name;
      const state = filter(address, { types: ['administrative_area_level_1'] })[0].long_name;
      this.update({
        city: `${city}, ${state}`,
        hotel: {
          link,
          name,
          photo: {
            url: photo.getUrl(),
            attributions: photo.html_attributions,
          },
          placeId,
        },
        location: {
          lat: lat(),
          lng: lng(),
        },
      });
    },
    update(rule) {
      this.$fireDb.ref('cons').child(this.id).update(rule);
    },
  },
};
</script>
