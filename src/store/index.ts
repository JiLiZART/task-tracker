import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
// @ts-ignore
import store from 'store';

Vue.use(Vuex);

const STATE_KEY = 'storage';

const localStoragePlugin = (store: any) => {
  const state = getItem(STATE_KEY);

  state && store.replaceState(state);

  // вызывается после инициализации хранилища
  store.subscribe((mutation: any, state: any) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
    setItem(STATE_KEY, state);
  })
};

function setItem(key: any, value: any) {
  return store.set(key, value)
}

function getItem(key: any) {
  return store.get(key);
}

function removeItem(key: any) {
  return store.remove(key)
}

export function clearStorage() {
  return removeItem(STATE_KEY);
}

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      user: null,
      workspace: null,
      workspaces: {},
      projects: {},
      tasks: {},
      docs: {},
      comments: {},
      teammates: {},

      log: []
    },
    plugins: [localStoragePlugin],
    actions,
    mutations,
    getters
  })
}
