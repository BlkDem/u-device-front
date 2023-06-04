<template>
  <div class="tabs is-centered mx-4">
  <ul>
    <!-- <li>
      <a class="navbar-item" href="https://umolab.ru">
        <img src="https://iotman.blkdem.ru/apple-icon-60x60.png" height="32">
      </a>

    </li> -->

    <li
      :class="{'is-active': currentPage === PAGE_SYSTEM}"
      @click="currentPage=PAGE_SYSTEM"
    >
      <a>
        <i class="fa-solid fa-microchip mx-2"></i>
        <span>System</span>
      </a>
    </li>
    <li
      :class="{'is-active': currentPage === PAGE_CLOCK}"
      @click="currentPage=PAGE_CLOCK"
    >
      <a>
        <i class="fa-solid fa-clock mx-2"></i>
        <span>Clock</span>
      </a>
    </li>
    <li
      :class="{'is-active': currentPage === PAGE_LED}"
      @click="currentPage=PAGE_LED"
    >
      <a>
        <i class="fa-solid fa-palette mx-2"></i>
        <span>LED</span>
      </a>
    </li>
    <li
      @click="currentPage=PAGE_SYSTEM"
    >
      <a href="/config">
        <i class="fa-solid fa-gear mx-2"></i>
        <span>Setup</span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>

import pages from '../pages.js';

export default {

  emits: ['onPageChange'],

  data() {
    return {
      currentPage: 0,
      PAGE_SYSTEM: pages.PAGE_SYSTEM,
      PAGE_LED: pages.PAGE_LED,
      PAGE_CLOCK: pages.PAGE_CLOCK,
      PAGE_CONFIG: pages.PAGE_CONFIG,
    }
  },

  created() {
    // const {PAGE_SYSTEM, PAGE_CLOCK, PAGE_LED, PAGE_CONFIG} = pages
    // console.log(PAGE_SYSTEM);
  },

  watch: {
    currentPage() {
      this.$emit('onPageChange', this.currentPage)
    }
  },

  methods: {
    getCurrentPage() {
      return this.currentPage;
    }
  }
}
</script>
