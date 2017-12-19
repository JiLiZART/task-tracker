import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import {createStore} from './store'
import {createRouter} from './router'
import Vuec from 'vue-container';
import App from './App.vue'

// configure language
import locale from 'element-ui/lib/locale';
import langEn from 'element-ui/lib/locale/lang/en';

import BootstrapVue from 'bootstrap-vue';
import {DatePicker, Autocomplete, Popover, Tooltip, Input, Button} from 'element-ui';

locale.use(langEn);

function registerPlugins(Vue) {
  Vue.use(BootstrapVue);
  Vue.use(require('vue-timeago'), {
    locale: 'en-US',
    locales: {'en-US': require('vue-timeago/locales/en-US.json')}
  });
  Vue.use(require('vue-quill-editor'));
  Vue.use(require('v-hotkey'));
  Vue.use(require('vue-drag-drop'));

  Vue.use(DatePicker);
  Vue.use(Autocomplete);
  Vue.use(Popover);
  Vue.use(Tooltip);
  Vue.use(Input);
  Vue.use(Button);

  Vue.use(Vuec, {
    register: {
      auth: require('./services/AuthService').auth
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const RAVEN_URL = 'https://f8d92de3c927430781089b68eac53c16@sentry.io/200742';

    require('raven-js')
      .config(RAVEN_URL)
      .addPlugin(require('raven-js/plugins/vue'), Vue)
      .install();
  }
}

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  registerPlugins(Vue);

  Vue.config.productionTip = false;

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {app, router, store}
}
