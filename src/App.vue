<template>
  <div id="app">
    <navbar v-if="isLoggedIn && isHaveProjects"
      :workspace="workspace" :user="user" v-on:logout="logout" v-on:clear="clear"
    ></navbar>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import Navbar from './components/Navbar';
  import avatarUrl from '@/utils/avatarUrl';
  import {clearStorage} from '@/store/index';

  export default {
    name: 'app',
    components: {Navbar},

    created() {
      console.log('r', this.$router);
      console.log('s', this.$store);

      if (!this.isLoggedIn) {
        this.$router.replace('/');
      }
    },

    methods: {
      logout() {
        this.$store.commit('logout');
        this.$router.push('/');
      },

      clear() {
        clearStorage();
        location.reload(); //@TODO find workaround
      }
    },

    computed: {
      isLoggedIn() {
        return Boolean(this.user && this.user.username);
      },

      user() {
        return this.$store.state.user;
      },

      isHaveProjects() {
        return Boolean(Object.keys(this.$store.state.projects).length > 0);
      },

      workspace() {
        return this.$store.getters.workspace;
      }
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~font-awesome/css/font-awesome.css";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';


  body {
    margin: 0;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .btn-transparent {
    color: white;
    border: none;
    background: transparent;
  }

  .form-control_transparent {
    border-color: transparent;

    &:hover {
      border-color: rgba(0, 0, 0, 0.05);
    }

    &:focus {
      border-color: rgba(0, 0, 0, 0.15);
    }

    &:disabled,
    &[readonly] {
      background: transparent;
      border-color: transparent;

      &:focus,
      &:hover {
        background: transparent;
        border-color: transparent;
      }
    }
  }
</style>
