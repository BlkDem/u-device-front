<template>
  <div class="column">
    <article class="panel is-dark">
      <p class="panel-heading">
        {{ cardCaption }}
      </p>
      <p class="panel-tabs">
        {{ cardTabs }}
      </p>
      <div class="panel-block">
        <Color
          :paramColor="paramColor"
          @onChange="onChange"
        />
      </div>
    </article>
    <Range
      :paramRange="paramRange"
      @onChange="onRangeChange"
    />
  </div>
</template>

<script>

import Color from './Color.vue';
import Range from './Range.vue';

export default {

  emits: ['onColorChange', 'onRangeChange'],

  components: {
    Color,
    Range,
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
