<template>
    <div class="px-2 w-100">
        <!-- <div class=""> -->
            <div class="flex-space font-1_2rem">
                <div class="text-info w-25">{{ paramRange.param_min }}</div>
                <div class="text-info">{{ getValue(paramRange.param_value) }}</div>
                <div class="text-info w-25 align-right">{{ paramRange.param_max }}</div>
            </div>
            <input type="range" class="form-range" step="1" :min="paramRange.min" :max="paramRange.max"
                :value="getValue(paramRange.param_value)"
                @change="onChange($event.target.value)"
                >
        </div>

    <!-- </div> -->
</template>

<script>

export default {

    emits: ['onChange'],

    props: {

      paramRange: {
        type: Object
      },

        rangeMin: {
            type: Number,
            defaut: 0
        },

        rangeMax: {
            type: Number,
            defaut: 0
        },

        rangeValue: {
            type: Number,
            defaut: 0
        },

        rangeCaption: {
            type: String,
            defaut: 'Caption'
        },

        param_fullname: {
            type: String,
            defaut: ''
        },

    },

    data() {
        return {
        }
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

<style scoped>

.form-range {
  width: 100%;
}
.flex-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.font-1_2rem{
    font-size: 1.2rem;
}
.align-right {
    text-align: right;
}

.min-width-150px {
    min-width: 200px;
}
</style>
