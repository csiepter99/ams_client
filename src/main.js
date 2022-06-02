import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'
import {Html5QrcodeScanner} from 'html5-qrcode'

Vue.config.productionTip = false

Vue.component('qrcode-scanner', {
  props: {
    qrbox: {
      type: Number,
      default: 250
    },
    fps: {
      type: Number,
      default: 10
    },
    scan: {
      type: Boolean,
      default: false
    },
  },
  template: `<div id="qr-code-full-region"></div>`,
  data: () => ({
    html5QrcodeScanner: undefined,
  }),
  mounted () {
    const config = {
      fps: this.fps,
      qrbox: this.qrbox,
    };
    this.html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config);
    this.html5QrcodeScanner.render(this.onScanSuccess);
  },
  watch: {
    scan () {
      if (this.html5QrcodeScanner.getState() !== 1) {
        this.html5QrcodeScanner.resume();
      }
    }
  },
  methods: {
    onScanSuccess (decodedText, decodedResult) {
      this.$emit('result', decodedText, decodedResult);
      if (this.html5QrcodeScanner.getState() !== 1) {
        this.html5QrcodeScanner.pause();
      }
    }
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
