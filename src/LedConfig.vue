<template>
    <section name="zones" class="container py-4 is-max-widescreen window-borders my-4">
    <div class="columns is-desktop has-background-dark mx-0">
      <div class="column">
      <ZonePanel
        :cardCaption = "zones.zone1.caption"
        :paramColor = "zones.zone1.param"
        :paramRange = "zones.count1.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
      <div class="column">
      <ZonePanel
        :cardCaption = "zones.zone2.caption"
        :paramColor = "zones.zone2.param"
        :paramRange = "zones.count2.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
      <div class="column">
      <ZonePanel
        :cardCaption = "zones.zone3.caption"
        :paramColor = "zones.zone3.param"
        :paramRange = "zones.count3.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
      <div class="column">
      <ZonePanel
        :cardCaption = "zones.zone4.caption"
        :paramColor = "zones.zone4.param"
        :paramRange = "zones.count4.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
    </div>
  </section>

  <section name="presets" class="container py-4 is-max-widescreen window-borders">
    <div class="columns is-desktop has-background-dark mx-0">
      <div class="column">

        <PresetPanel
          :cardCaption="'Preset 1'"
          :colors="presets.preset1"
          :presetNum="'preset1'"
          @onColorChange="onColorChange"
          @applyFromPreset="applyFromPreset"
          @presetFromCurrent="presetFromCurrent"
        />
      </div>
      <div class="column">
        <PresetPanel
          :cardCaption="'Preset 2'"
          :colors="presets.preset2"
          :presetNum="'preset2'"
          @onColorChange="onColorChange"
          @applyFromPreset="applyFromPreset"
          @presetFromCurrent="presetFromCurrent"
        />
      </div>
    </div>
  </section>
</template>

<script>

import ZonePanel from './components/ZonePanel.vue';
import PresetPanel from './components/PresetPanel.vue';

export default {

  emits: [
    'onColorChange',
    'applyFromPreset',
    'presetFromCurrent',
    'onRangeChange'
  ],

  props: {

    zones: {
      type: Object
    },

    presets: {
      type: Object
    },

  },

  components: {
    ZonePanel,
    PresetPanel,
  },

  created() {
    console.log(this.zones)
  },

  data() {
    return {

      currentPage: 0,

    }
  },

  methods: {
    onColorChange(e, value) {
      console.log('from zone', e, value)
      this.$emit('onColorChange', e, value)
    },

    onRangeChange(e, value) {
      console.log('from count', e, value)
      this.$emit('onRangeChange', e, value)
    },

    onColorChange(e, value) {
      this.$emit('onColorChange', e, value)
    },

    presetFromCurrent(presetNum) {
      this.$emit('presetFromCurrent', presetNum)
    },

    applyFromPreset(presetNum) {
      this.$emit('applyFromPreset', presetNum)
    }

  }


}

</script>

<style lang="scss">

@import './sass/App.scss';

</style>
