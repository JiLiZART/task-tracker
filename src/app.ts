/* eslint-disable @typescript-eslint/no-var-requires */
import Vue from 'vue'
import Vuec from 'vue-container';
import {sync} from 'vuex-router-sync'
import {createStore} from './store'
import {createRouter} from './router'
import App from './App.vue'

// configure language
import locale from 'element-ui/lib/locale';
import langEn from 'element-ui/lib/locale/lang/en';
import BootstrapVue from 'bootstrap-vue';
import {DatePicker, Autocomplete, Popover, Tooltip, Input, Button} from 'element-ui';

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

locale.use(langEn);

function registerPlugins(Vue: any) {
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
        }
    });
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

    // expose the app, the router and the store.
    // note we are not mounting the app here, since bootstrapping will be
    // different depending on whether we are in a browser or on the server.
    return {
        app: new Vue({
            router,
            store,
            render: h => h(App)
        })
        , router, store
    }
}
