import Vue from 'vue'
import Vuex from 'vuex'
import PouchDB from 'pouchdb'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const db = new PouchDB('runby');
const store = {};

const STATE_KEY = 'state';

const localStoragePlugin = (store) => {
  const state = getItem(STATE_KEY);

  state && store.replaceState(state);
  // вызывается после инициализации хранилища
  store.subscribe((mutation, state) => {
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
    setItem(STATE_KEY, state);
  })
};

function setItem(key, value) {
  const data = JSON.stringify(value);

  return localStorage.setItem(key, data);
}

function getItem(key) {
  const value = localStorage.getItem(key);

  return value && JSON.parse(value);
}

function removeItem(key) {
  return localStorage.removeItem(key);
}

export function clearStorage() {
  removeItem(STATE_KEY);
}

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      user: {},
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
