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
      class="date"
      @input="(value) => update({ [name]: value })"
    />
    <PhotoSelector
      v-else-if="type === 'photo'"
      :con="con"
      :value="value"
      @input="(photo, color) => update({ photo, color })"
    />
    <input
      v-else-if="type === 'number'"
      type="number"
      v-model="model"
      class="number"
      @input="update({ [name]: +model })"
      @keyup.enter="$event.target.blur"
    />
    <input
      v-else-if="type === 'currency'"
      type="number"
      step="0.01"
      min="0"
      v-model="model"
      class="currency"
      @input="update({ [name]: +model })"
      @keyup.enter="$event.target.blur"
    />
    <input
      v-else-if="type === 'checkbox'"
      type="checkbox"
      v-model="model"
      @change="update({ [name]: model || null })"
    />
    <textarea
      v-else-if="type === 'textarea'"
      v-model="model"
      @change="update({ [name]: model || null })"
    />
    <TextField
      v-else
      :dbRef="dbRef"
      :path="name"
      :value="value"
    />
  </div>
</template>

<script>
import filter from 'lodash/filter';
import convert from 'convert-units';

import DateField from './DateField';
import PhotoSelector from './PhotoSelector';
import TextField from './TextField';

export default {
  components: {
    DateField,
    PhotoSelector,
    TextField,
  },
  props: {
    type: String,
    dbRef: {
      type: Object,
      required: true,
    },
    con: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: [Boolean, Number, String, Object],
  },
  data() {
    return {
      model: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.model = value;
      },
    },
  },
  methods: {
    async setPlace({
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
      const country = filter(address, { types: ['country'] })[0].short_name;

      const directionsService = new google.maps.DirectionsService();
      const response = await new Promise((resolve, reject) => {
        directionsService.route({
          origin: '31 Hawks Landing Cir, Verona, WI',
          destination: `${lat()},${lng()}`,
          travelMode: 'DRIVING',
        }, (response, status) => {
          if (status == 'OK') {
            resolve(response);
            return;
          }
          reject(status);
        })
      });
      const distance = convert(response.routes[0].legs[0].distance.value).from('m').to('mi');

      this.dbRef.child('hotel').update({
        link,
        name,
        photo: {
          url: photo.getUrl(),
          attributions: photo.html_attributions,
        },
        placeId,
      });

      this.dbRef.child('ride').update({ distance });

      this.update({
        city: `${city}, ${state}`,
        location: {
          lat: lat(),
          lng: lng(),
        },
        canada: country === 'CA' || null,
      });
    },
    update(rule) {
      this.dbRef.update(rule);
    },
  },
};
</script>

<style lang="scss" scoped>
.number {
  width: 2.5em;
}

.date {
  width: 9.5em;
}

.currency {
  width: 4.5em;
}
</style>
