// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueTimeago from 'vue-timeago';
import {DatePicker} from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import {createApp} from './app';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

const RAVEN_URL = 'https://f8d92de3c927430781089b68eac53c16@sentry.io/200742';

// configure language
locale.use(lang);
Vue.component(DatePicker.name, DatePicker);
Vue.use(BootstrapVue);
Vue.use(VueTimeago, {
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
});
Vue.use(VueQuillEditor);

if (process.env.NODE_ENV === 'production') {
  Raven
    .config(RAVEN_URL)
    .addPlugin(RavenVue, Vue)
    .install();
}

Vue.config.productionTip = false;

const {app, router, store} = createApp();

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  console.log('router ready');
});

app.$mount('#app');
