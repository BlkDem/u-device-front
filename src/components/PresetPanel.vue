<template>

    <article class="panel is-dark py-4">
      <p class="panel-heading">
        <span class="color-system">{{ cardCaption }}</span>
      </p>
      <p class="panel-tabs">
        {{ cardTabs }}
      </p>
      <div class="panel-block">
        <ColorSelect
          :paramColor="colors.zone1"
          @onColorChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.zone2"
          @onColorChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.zone3"
          @onColorChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.zone4"
          @onColorChange="onColorChange"
        />
      </div>
    </article>
    <div class="flex-space">
      <button class="button is-info w-40 px-2"
        @click="applyFromPreset"
      >
        Apply this set
      </button>
      <button class="button is-success w-40 px-2"
        @click="presetFromCurrent"
      >Save current</button>
    </div>
</template>

<script>
import ColorSelect from './ColorSelect.vue';

export default {

  emits: ['onColorChange', 'applyFromPreset', 'presetFromCurrent'],

  components: {
    ColorSelect
  },

  props: {

    presetNum: {
      type: String
    },

    cardCaption: {
      type: String,
      default: 'Caption'
    },

    cardTabs: {
      type: String,
      default: 'Select a preset values',
    },

    colors: {
      type: Object,
    },

  },

  mounted(){
    // console.log(this.colors)
  },

  methods: {
    onColorChange(e, value) {
      this.$emit('onColorChange', e, value)
    },

    presetFromCurrent() {
      this.$emit('presetFromCurrent', this.presetNum)
    },

    applyFromPreset() {
      this.$emit('applyFromPreset', this.presetNum)
    }

  }
}
</script>
