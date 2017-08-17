<template>
  <div id="app">
    <navbar v-if="isLoggedIn && isHaveProjects"
            :workspace="workspace" :user="user" @logout="logout" @clear="clear"
    ></navbar>
    <transition name="slide-x-transition" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import Navbar from './components/Navbar';
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

  .slide-x-transition-enter-active, .slide-x-transition-leave-active {
    transition: 150ms cubic-bezier(.25, .8, .25, 1)
  }

  .slide-x-transition-enter,
  .slide-x-transition-leave-to {
    opacity: 0;
    transform: translateX(-15px)
  }

  .slide-x-reverse-transition-enter-active,
  .slide-x-reverse-transition-leave-active {
    transition: 150ms cubic-bezier(.25, .8, .25, 1)
  }

  .slide-x-reverse-transition-enter,
  .slide-x-reverse-transition-leave-to {
    opacity: 0;
    transform: translateX(15px)
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 200ms ease-in-out
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }

  .btn-transparent {
    color: white;
    border: none;
    background: transparent;
  }

  .form-control {
    &_transparent {
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

    &::-webkit-input-placeholder,
    &:-ms-input-placeholder,
    &::placeholder {
      color: #a5a5a5;
      opacity: 1
    }
  }
</style>
