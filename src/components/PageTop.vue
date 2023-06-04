<template>
    <section class="container is-max-widescreen">
    <h1 class="has-text-centered">
      <button class="button is-rounded w-40px mr-2"
        :class="{'is-loading is-danger': !isConnected, 'is-success': isConnected}"
      >
        <i class="fa-solid fa-cloud"></i>
      </button>
      UDC Standalone #1 - <span class="has-text-info  ">{{ deviceAddress }}</span>
    </h1>
  </section>
</template>

<script>

export default {
  props: {
    deviceAddress: {
      type: String,
      default: 'Address'
    },

    isConnected: {
      type: Boolean,
      default: false
    }

  }
}

</script>
