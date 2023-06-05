<template>
    <section class="container is-max-widescreen">
      <div class="space-4rem"></div>
    <h1 class="has-text-centered window-borders p-2 my-2 mx-0 has-background-dark">
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
