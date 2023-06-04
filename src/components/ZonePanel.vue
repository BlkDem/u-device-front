<template>

    <article class="panel is-dark">
      <p class="panel-heading">
        <span class="color-system">{{ cardCaption }}</span>
      </p>
      <p class="panel-tabs p-1">
        {{ cardTabs }}
      </p>
      <div class="panel-block">
        <ColorSelect
          :paramColor="paramColor"
          @onColorChange="onColorChange"
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
    onColorChange(e, value) {
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
