<template>

  <TopTabs
    @onPageChange="onPageChange"
  >
  </TopTabs>

  <PageTop
    :isConnected="isConnected"
    :deviceAddress="deviceAddress"
  >
  </PageTop>

  <router-view></router-view>

  <LedConfig
    :zones="zones"
    :presets="presets"
    @onColorChange="onColorChange"
    @applyFromPreset="applyFromPreset"
    @presetFromCurrent="presetFromCurrent"
    @onRangeChange="onRangeChange"
  >

  </LedConfig>

  <PageFooter />

  <MyMqtt ref="mqttRef"
    :deviceID="deviceID"
    :topicSubscribe="topics"
    @on-connect="mqttConnected"
    @on-message="onMessage"
  />


</template>

<script>
import TopTabs from './components/TopTabs.vue';
import PageFooter from './components/PageFooter.vue';
import PageTop from './components/PageTop.vue';
import MyMqtt from './components/MyMqtt.vue';
import LedConfig from './LedConfig.vue';

var deviceID = '/84:F3:EB:B7:3E:98/';

export default {
  components: {
    TopTabs,
    PageFooter,
    PageTop,
    MyMqtt,
    LedConfig
  },

  data() {
    return {

      currentPage: 0,

      isConnected: false,

      deviceAddress: '',

      devHost: 'http://192.168.1.101',

      // deviceAddress: deviceID,

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

        systime: {
          param: {
            param_fullname: deviceID + 'systime',
            param_value: '',
          }
        },

        uptime: {
          param: {
            param_fullname: deviceID + 'uptime',
            param_value: '',
          }
        },

        ssid: {
          param: {
            param_fullname: deviceID + 'ssid',
            param_value: '',
          }
        },

        ip: {
          param: {
            param_fullname: deviceID + 'ip',
            param_value: '',
          }
        },

        brightness: {
          param: {
            param_fullname: deviceID + 'brightness',
            param_value: '',
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

  methods: {
    setAddress(address) {
      this.deviceAddress = address;
    },

    setConnected(value) {
      this.isConnected = value;
    }
  },

  created() {

    this.topics = new Set([
      'LWT',
      'cmd',
      'systime',
      'uptime',
      'brightness',
      'ip',
      'ssid',
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
    ])

    this.getConfigJson();

  },

  mounted() {
  },

  computed: {
    deviceAddress() {
      if (deviceID.length < 2) return 'undefined';
      return deviceID.substring(1, deviceID.length - 1);
    }
  },

  methods: {

    onPageChange(page) {
      console.log(page);
      this.currentPage = page;
    },

    async setBrightness(value) {
      let newValue;
      newValue = (value < 0) ? 0 : (value > 6) ? 6 : value;

      try {
        const response = await fetch(this.devHost + '/control?cmd=7db,' + newValue);
        const json = await response.json();
        console.log(json);
      } catch (e) {
        console.error('Error set brightness', e);
      }

      this.$refs.mqttRef.doPublish(deviceID + 'brightness', newValue.toString());
    },

    async getConfigJson() {

      try {
        const response = await fetch(this.devHost + '/json');

        const json = await response.json();
        deviceID = (json['WiFi']['STA MAC']) ? '/' + json['WiFi']['STA MAC'] + '/' : '/84:F3:EB:B7:3E:98/'
        console.log('mac: ', json['WiFi']['STA MAC'], json)
      } catch (e) {
        console.error('Error read config', e);
      }
    },


    presetFromCurrent(presetNum) {
      this.$refs.mqttRef.doPublish(deviceID + presetNum + '/zone1', this.zones.zone1.param.param_value);
      this.$refs.mqttRef.doPublish(deviceID + presetNum + '/zone2', this.zones.zone2.param.param_value);
      this.$refs.mqttRef.doPublish(deviceID + presetNum + '/zone3', this.zones.zone3.param.param_value);
      this.$refs.mqttRef.doPublish(deviceID + presetNum + '/zone4', this.zones.zone4.param.param_value);
    },

    applyFromPreset(presetNum) {
      // console.log('applyFromPreset', this.presets[presetNum]);
      this.$refs.mqttRef.doPublish(deviceID + 'zone1', this.presets[presetNum].zone1.param_value);
      this.$refs.mqttRef.doPublish(deviceID + 'zone2', this.presets[presetNum].zone2.param_value);
      this.$refs.mqttRef.doPublish(deviceID + 'zone3', this.presets[presetNum].zone3.param_value);
      this.$refs.mqttRef.doPublish(deviceID + 'zone4', this.presets[presetNum].zone4.param_value);
    },

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
      // console.log('on color change: ', value, param_fullname)
      if (value === null) return;
      let a = '';
      if (value[0] === '#') {
        a = value.replace('#', '');
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

  }
}

</script>

<style lang="scss">

@import './sass/App.scss';

</style>

