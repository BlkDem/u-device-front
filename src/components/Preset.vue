<template>

    <article class="panel is-dark py-4">
      <p class="panel-heading">
        {{ cardCaption }}
      </p>
      <p class="panel-tabs">
        {{ cardTabs }}
      </p>
      <div class="panel-block">
        <ColorSelect
          :paramColor="colors.color1"
          @onColorChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.color2"
          @onColorChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.color3"
          @onColorChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.color4"
          @onColorChange="onColorChange"
        />
      </div>
    </article>
</template>

<script>
import ColorSelect from './Color.vue';

export default {

  emits: ['onColorChange'],

  components: {
    ColorSelect
  },

  props: {

    cardCaption: {
      type: String,
      default: 'Caption'
    },

    cardTabs: {
      type: String,
      default: 'Select a preset values',
    },

    colors: {
      color1: {
        type: Object
      },

      color2: {
        type: Object
      },

      color3: {
        type: Object
      },

      color4: {
        type: Object
      }
    }
  },

  methods: {
    onColorChange(e, value) {
      console.log('from preset', e, value)
      this.$emit('onColorChange', e, value)
    },

  }
}
</script>
