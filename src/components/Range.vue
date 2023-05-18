<template>
  <div class="mx-2 w-100">
    <div class="flex-space font-1_2rem">
      <div class="text-info w-25">{{ paramRange.min }}</div>
      <div class="has-text-info">{{ getValue(paramRange.param_value) }}</div>
      <div class="text-info w-25 align-right">{{ paramRange.max }}</div>
    </div>
    <div class="flex-space">
      <input type="range" class="w-100" step="1" :min="paramRange.min" :max="paramRange.max"
        :value="getValue(paramRange.param_value)" @change="onChange($event.target.value)">
    </div>
  </div>
</template>

<script>

export default {

    emits: ['onChange'],

    props: {

      paramRange: {
        type: Object
      },

    },

    data() {
        return {
        }
    },

    mounted(){
      console.log(this.paramRange)
    },

    methods: {
        getValue(value){
            if (value === null) return
            const n_value = Number.parseInt(value)
            if (isNaN(n_value)) return
            return n_value
        },

        onChange(e) {
            this.$emit('onChange', e, this.paramRange.param_fullname)
        }

    }
}

</script>

<style scoped lang="scss">

// .form-range {
//   width: 100%;
// }
.flex-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.font-1_2rem{
    font-size: 1.2rem;
    color: antiquewhite;
}
.align-right {
    text-align: right;
}

// .min-width-150px {
//     min-width: 200px;
// }
</style>
