import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
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
  methods: {
    onScanSuccess (decodedText, decodedResult) {
      this.$emit('result', decodedText, decodedResult);
      this.html5QrcodeScanner.render(this.onScanSuccess);
    }
  }
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
