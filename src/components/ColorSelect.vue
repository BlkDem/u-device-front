<template v-if="color">
  <div class="w-100 mx-1">
    <label :for="newID" class="font-1_5rem w-100 text-info text-center color-label has-text-centered">
      {{ getHexColor(paramColor.param_value) }}
    </label>
    <input type="color" :id="newID" class="w-100" :value="getHexColor(paramColor.param_value)"
      @input="onColor($event.target.value)" />
  </div>
</template>

<script>

import MakeID from '../components/helpers/makeid';

export default {

  emits: ['onColorChange'],

  props: {

      paramColor: {
        type: Object,
      },

  },

  data() {
      return {
          newID: '',
      }
  },

  created() {
      this.newID = MakeID.makeId(8, 'mqtt_color_')
  },

  mounted(){
  },

  methods: {

      onColor(e) {
          this.$emit('onColorChange', e, this.paramColor.param_fullname)
      },

      getStyle() {
          if (this.color == null) return
          return 'color: ' + this.color + ';'
      },

      getHexColor(value) {
          const a = Number.parseInt(value)
          if (isNaN(a)) return value
              // return HEX color like #AABBCC
              return '#' + a.toString(16).padStart(6, "0").toUpperCase();
      }
  }

}
</script>

<style scoped lang="scss">
@import '../sass/App.scss';

.color-label{
  position: relative;
  display: block;
  text-shadow: 1px 1px 1px #333;
  margin-top: 16px;
  color: $primary;
  margin-bottom: -30px;
}

input[type=color] {
  height: 36px;
  padding: 0 2px;
  margin: 0;
  border: 1px solid grey;
  border-radius: 4px;
  /* width: 100%; */
  /* min-width: 250px; */
}

.font-1_5rem {
  font-size: 1.0rem;
}

</style>
