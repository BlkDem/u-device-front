
<script>
// import * as mqtt from "mqtt/dist/mqtt";
// import * as mqtt from 'mqtt';
import MakeID from './helpers/makeid';
// import APIConstants from '../api/rest_api';
// import ParsingErrors from '../helpers/ParsingErrors';

export default {

    name: 'MQTT',

    emits: ['onConnect', 'onMessage', 'onError' ],

    props: {

      topicSubscribe: {
        type: Object,
      },

      deviceID: {
        type: String,
        default: '/84:F3:EB:B7:3E:98/',
      },

        paramItems: {
            type: Array,
        }
    },

    data() {
        return {

            connection: {
                host: 'ice9.umolab.ru',
                port: 9883,
                endpoint: '/',
                clean: true,

                connectTimeout: 4000,
                reconnectPeriod: 4000,
                protocol: 'wss',
                clientId: '',
                username: 'umolab',
                password: '',
            },

            subscription: {
                topic: '',
                qos: 0,
            },

            publish: {
                topic: '',
                qos: 0,
                payload: '',
                retain: true
            },

            client: {
                connected: false,
            },

            subscribeSuccess: false,
        }
    },

    created() {

        this.connection.clientId = MakeID.makeId(8, 'mqtt_umolab_')

    },

    mounted() {
        console.log(Array.from(this.topicSubscribe));

        this.createConnection();
    },

    beforeUnmount() {

        this.destroyConnection()
        console.log(this.client.connected)
    },

    methods: {

        processParams() {

          const paramArray = Array.from(this.topicSubscribe);
          if (paramArray.length <= 0) {
            console.log('Nothing to process');
            return;
          }

          for (let item in paramArray) {
            // console.log(this.deviceID + paramArray[item])
            this.doSubscribe(this.deviceID + paramArray[item])
          }

        },

        createConnection() {

            // Connect string, and specify the connection method used through protodiv
            // ws unencrypted WebSocket connection
            // wss encrypted WebSocket connection
            // mqtt unencrypted TCP connection
            // mqtts encrypted TCP connection
            // wxs WeChat mini app connection
            // alis Alipay mini app connection

            const {
                host,
                port,
                endpoint,
                ...options
            } = this.connection


            const connectUrl = this.connection.protocol + '://' + this.connection.host + ':' + this.connection.port
            // const connectUrl = 'wss://ice9.umolab.ru:9883';
                // 'wss://ice9.umolab.ru:9883'

            try {
                console.log(options)
                this.client = mqtt.connect(connectUrl, options)
            } catch (error) {
                console.log('MQTT: connect error', error)
            }

            this.client.on('connect', () => {
                console.log('MQTT: Connection succeeded!')
                this.$emit('onConnect', true)
                this.processParams()
            })

            this.client.on('error', error => {
                console.log('MQTT: Connection failed', error)
                this.$emit('onError', error)
            })

            this.client.on('message', (topic, message) => {
                // console.log(topic, message.toString());
                this.$emit('onMessage', topic, message.toString())
            })
        },

        // subscribtions
        doSubscribe(topic) {
            //   const { topic, qos } = this.subscription
            const qos = 0

            this.client.subscribe(topic, {
                qos
            }, (error, res) => {
                if (error) {
                    console.log('MQTT: Subscribe to topics error', error)
                    return
                }
                this.subscribeSuccess = true
                // console.log('MQTT: Subscribe to topics res', res)
            })
        },
        // unsubsribtions
        doUnSubscribe() {
            const {
                topic
            } = this.subscription
            this.client.unsubscribe(topic, error => {
                if (error) {
                    console.log('MQTT: Unsubscribe error', error)
                }
            })
        },

        // publish
        doPublish(topic, payload) {
          console.log(topic, payload)
            const {
                // topic,
                qos,
                // payload,
                retain
            } = this.publish
            this.client.publish(topic, payload, {
                'qos': qos,
                'retain': retain
            }, error => {
                if (error) {
                    console.log('MQTT: Publish error', error)
                }
            })
        },

        // disconnect
        destroyConnection() {
            if (this.client.connected) {
                try {
                    this.client.end()
                    this.client = {
                        connected: false,
                    }
                    console.log('MQTT: Successfully disconnected!')
                } catch (error) {
                    console.log('MQTT: Disconnect failed', error.toString())
                }
            }
        },
    },
}
</script>

<template>
  <div>
    <!-- as -->
  </div>
</template>

<style></style>
