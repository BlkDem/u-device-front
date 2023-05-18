<template>

    <article class="panel is-dark">
      <p class="panel-heading">
        {{ cardCaption }}
      </p>
      <p class="panel-tabs">
        {{ cardTabs }}
      </p>
      <div class="panel-block">
        <ColorSelect
          :paramColor="paramColor"
          @onChange="onChange"
        />
      </div>
    </article>
    <RangeSelect
      :paramRange="paramRange"
      @onChange="onRangeChange"
    />
</template>

<script>

import ColorSelect from './ColorSelect.vue';
import RangeSelect from './RangeSelect.vue';

export default {

  emits: ['onColorChange', 'onRangeChange'],

  components: {
    ColorSelect,
    RangeSelect,
  },

  props: {

    paramColor: {
      type: Object,
    },

    paramRange: {
      type: Object,
    },

    cardCaption: {
      type: String,
      default: 'Zone'
    },

    cardTabs: {
      type: String,
      default: 'Please select a color and zone address'
    },
  },

  data() {
    return {

    }
  },

  mounted(){

  },

  methods: {
    onChange(e, value) {
      console.log('from zone', e, value)
      this.$emit('onColorChange', e, value)
    },

    onRangeChange(e, value) {
      console.log('from count', e, value)
      this.$emit('onRangeChange', e, value)
    }
  }


}

</script>
