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
          :paramColor="colors.zone1"
          @onChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.zone2"
          @onChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.zone3"
          @onChange="onColorChange"
        />
        <ColorSelect
          :paramColor="colors.zone4"
          @onChange="onColorChange"
        />
      </div>
    </article>
    <div class="flex-space">
      <button class="button is-info w-40 px-2">Apply</button>
      <button class="button is-success w-40 px-2">Save from current</button>
    </div>
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
      type: Object,
    }

  },

  mounted(){
    // console.log(this.colors)
  },

  methods: {
    onColorChange(e, value) {
      this.$emit('onColorChange', e, value)
    },

  }
}
</script>
