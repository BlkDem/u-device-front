<template>
  <section class="container">
    <header>
      <nav class="navbar is-dark is-rounded" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://umolab.ru">
            <img src="https://iotman.blkdem.ru/apple-icon-60x60.png" height="60">
          </a>

          <a role="button" class="navbar-burger" aria-label="menu" data-target="navMenu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>

            <a class="navbar-item">
              Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <!-- <a class="button is-primary">
                  <strong>Sign up</strong>
                </a> -->
                <a class="button is-light" href="/config">
                  Config
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </section>

  <section class="container">
    <h1>
      Umolab Devices Controller - Standalone #1
    </h1>
  </section>

  <section class="container">
    <div class="columns is-desktop">
      <Zone
        :cardCaption = "zones.zone1.caption"
        :paramColor = "zones.zone1.param"
        :paramRange = "zones.count1.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />

      <Zone
        :cardCaption = "zones.zone2.caption"
        :paramColor = "zones.zone2.param"
        :paramRange = "zones.count2.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
    <!-- </div>
    <div class="columns is-desktop"> -->
      <Zone
        :cardCaption = "zones.zone3.caption"
        :paramColor = "zones.zone3.param"
        :paramRange = "zones.count3.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      <Zone
        :cardCaption = "zones.zone4.caption"
        :paramColor = "zones.zone4.param"
        :paramRange = "zones.count4.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
    </div>
  </section>

  <!-- <section class="container">
    <div class="columns is-desktop">
      <Zone
        :cardCaption = "'Preset 1'"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      <Zone
        :cardCaption = "'Preset 2'"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />

    </div>
  </section> -->

  <section class="container">
    <footer>

      <MyMqtt ref="mqttRef"
        :deviceID="deviceID"
        @on-connect="mqttConnected"
        @on-message="onMessage"
      />
    </footer>
  </section>
</template>

<script>
import MyMqtt from './components/MyMqtt.vue';
import Zone from './components/Zone.vue';
import Color from './components/Color.vue';
import Range from './components/Range.vue';

const deviceID = '/84:F3:EB:B7:3E:98/';

export default {
  components: {
    MyMqtt,
    Zone,
    Color,
    Range,
  },

  data() {
    return {

      zones: {

        LWT: {
          param: {
            param_fullname: deviceID + 'LWT',
            param_value: 'unitup',
          }
        },

        count1: {
          caption: 'Count 1',

          param: {
            param_fullname: deviceID + 'count1',
            param_value: 0,
            min: 0,
            max: 100,
          },

        },

        count2: {
          caption: 'Count 2',

          param: {
            param_fullname: deviceID + 'count2',
            param_value: 0,
            min: 0,
            max: 100,
          },

        },

        count3: {
          caption: 'Count 3',

          param: {
            param_fullname: deviceID + 'count3',
            param_value: 0,
            min: 0,
            max: 100,
          },

        },

        count4: {
          caption: 'Count 4',

          param: {
            param_fullname: deviceID + 'count4',
            param_value: 0,
            min: 0,
            max: 100,
          },

        },

        zone1: {
          caption: 'Zone 1',

          param: {
            param_fullname: deviceID + 'zone1',
            param_value: '#AA0077',
          },

        },
        zone2: {
          caption: 'Zone 2',
          param: {
            param_fullname: deviceID + 'zone2',
            param_value: '#AAFF77',
          },

        },
        zone3: {
          caption: 'Zone 3',
          param: {
            param_fullname: deviceID + 'zone3',
            param_value: '#003377',
          },

        },
        zone4: {
          caption: 'Zone 4',
          param: {
            param_fullname: deviceID + 'zone4',
            param_value: '#AA7700',
          },

        },
      }
    }
  },

  mounted() {
    this.collapseEventRegister();
  },

  methods: {


    onMessage(topic, message) {

      let param_name = topic.split('/');
      if (param_name.length < 2) {
        console.log('wrong param')
      }
      console.log(param_name[2], this.zones[param_name[2]])

      this.zones[param_name[2]].param.param_value = message.toString()


      // console.log(topic, message);
            // for (let item in this.dashEntities.params) {
            //     if (this.dashEntities.params[item].param_fullname === topic) {
            //         this.dashEntities.params[item].param_value = message;
            //     }
            // }
    },

    mqttConnected() {
            // console.log('mqtt connected')

    },



    onButtonClick(value, param_fullname, cmd) {
            this.$refs.mqttRef.doPublish(param_fullname, cmd);
        },

        onRangeChange(value, param_fullname) {
            this.$refs.mqttRef.doPublish(param_fullname, value);
        },

        onSwitchChange(value, param_fullname) {
            // console.log(value, param_fullname)
            this.$refs.mqttRef.doPublish(param_fullname, value);
        },

        onColorChange(value, param_fullname) {
            console.log('on color change: ', value, param_fullname)
            if (value === null) return;
            let a = '';
            if (value[0] === '#') {
                a = value.replace('#','');
            }
            const newValue = parseInt(a, 16);
            this.$refs.mqttRef.doPublish(param_fullname, newValue.toString());
        },


        setRangeValue(value) {
            if (value == null) return 0;

            const a = Number.parseInt(value);
            if (isNaN(a)) return 0;
            return a;
        },


    collapseEventRegister() {
      document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });

      });
    }
  }
}

</script>

<style lang="scss">

@import './sass/App.scss';

body {
  background-color: black;
  padding: 16px 16px;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 24px 20px;
  // color: whitesmoke;
  color: $white-bis;
}

.w-100 {
  width: 100%;
}


</style>
