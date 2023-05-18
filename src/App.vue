<template>
  <section class="container is-max-widescreen mt-4">
    <header>
      <nav class="navbar is-dark br-8" role="navigation" aria-label="main navigation">
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
                <a class="button is-success" href="/config">
                  Config
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </section>

  <section class="container is-max-widescreen">
    <h1>
      <button class="button is-rounded w-40px mr-2"
        :class="{'is-loading is-danger': !isConnected, 'is-success': isConnected}"
      ></button>
      Umolab Devices Controller - Standalone #1
    </h1>
  </section>

  <section class="container py-4 is-max-widescreen">
    <div class="columns is-desktop">
      <div class="column">
      <Zone
        :cardCaption = "zones.zone1.caption"
        :paramColor = "zones.zone1.param"
        :paramRange = "zones.count1.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
      <div class="column">
      <Zone
        :cardCaption = "zones.zone2.caption"
        :paramColor = "zones.zone2.param"
        :paramRange = "zones.count2.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
      <div class="column">
      <Zone
        :cardCaption = "zones.zone3.caption"
        :paramColor = "zones.zone3.param"
        :paramRange = "zones.count3.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
      <div class="column">
      <Zone
        :cardCaption = "zones.zone4.caption"
        :paramColor = "zones.zone4.param"
        :paramRange = "zones.count4.param"
        @onColorChange="onColorChange"
        @onRangeChange="onRangeChange"
      />
      </div>
    </div>
  </section>

  <section class="container is-max-widescreen">
    <div class="columns is-desktop">
    <div class="column">

    <Preset
      :cardCaption="'Preset 1'"
      :colors="presets.preset1"
      @onColorChange="onColorChange"
    />
    </div>
    <div class="column">
    <Preset
      :cardCaption="'Preset 2'"
      :colors="presets.preset2"
      @onColorChange="onColorChange"
    />
    </div>
    </div>
  </section>

  <section class="container is-max-widescreen my-4">
    <hr class="mx-4"/>
    <div class="content has-text-centered">
      <p class="has-text-white">
        <a href="https://umolab.ru"><strong>Umolab Devices</strong></a> Controller. &copy; 2023
      </p>
    </div>
  </section>

  <MyMqtt ref="mqttRef"
    :deviceID="deviceID"
    :topic-subscribe="topics"
    @on-connect="mqttConnected"
    @on-message="onMessage"
  />

</template>

<script>
import MyMqtt from './components/MyMqtt.vue';
import Zone from './components/Zone.vue';
import Color from './components/Color.vue';
import Range from './components/Range.vue';
import Preset from './components/Preset.vue';

const deviceID = '/84:F3:EB:B7:3E:98/';

export default {
  components: {
    MyMqtt,
    Zone,
    Color,
    Range,
    Preset,
  },

  data() {
    return {

      isConnected: false,

      topics: '',

      presets: {

        preset1: {
          zone1: {
            param_fullname: deviceID + 'preset1/zone1',
            param_value: 0,
          },
          zone2: {
            param_fullname: deviceID + 'preset1/zone2',
            param_value: 0,
          },
          zone3: {
            param_fullname: deviceID + 'preset1/zone3',
            param_value: 0,
          },
          zone4: {
            param_fullname: deviceID + 'preset1/zone4',
            param_value: 0,
          },
        },

        preset2: {
          zone1: {
            param_fullname: deviceID + 'preset2/zone1',
            param_value: 0,
          },
          zone2: {
            param_fullname: deviceID + 'preset2/zone2',
            param_value: 0,
          },
          zone3: {
            param_fullname: deviceID + 'preset2/zone3',
            param_value: 0,
          },
          zone4: {
            param_fullname: deviceID + 'preset2/zone4',
            param_value: 0,
          },
        }

      },

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

  created() {

    this.topics = new Set([
      'LWT',
      'cmd',
      'systime',
      'uptime',
      'ip',
      'zone1',
      'zone2',
      'zone3',
      'zone4',
      'count1',
      'count2',
      'count3',
      'count4',
      'preset1/zone1',
      'preset1/zone2',
      'preset1/zone3',
      'preset1/zone4',
      'preset2/zone1',
      'preset2/zone2',
      'preset2/zone3',
      'preset2/zone4'
    ]
  )

  },

  mounted() {
    this.collapseEventRegister();
  },

  methods: {


    onMessage(topic, message) {

      let param_name = topic.split('/');
      if (param_name.length < 2) {
        console.log('wrong param', topic, message);
        return;
      }

      if ((param_name[2] === 'preset1') || (param_name[2] === 'preset2')) {
        // console.log('preset', param_name[2] + '/' + param_name[3])
        this.presets[param_name[2]][param_name[3]].param_value = message.toString()
      } else {
        // console.log('param: ', param_name[2], this.zones[param_name[2]])
        this.zones[param_name[2]].param.param_value = message.toString()

      }

    },

    mqttConnected(value) {
      // console.log('mqtt connected', value)
      this.isConnected = value
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

body, html {
  background-color: black;
  // padding: 16px 16px;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 24px 20px;
  // color: whitesmoke;
  color: $white-bis;
}

.w-40px {
  width: 40px;
}

.w-40 {
  width: 40%;
}

.w-50 {
  width: 50%;
}

.w-100 {
  width: 100%;
}

.br-8 {
  border-radius: 8px;
}

.flex-space {
    display: flex;
    align-items: center;
    justify-content: space-around;
}




</style>
