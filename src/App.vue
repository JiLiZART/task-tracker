<template>
  <div id="app">
    <navbar v-if="isLoggedIn && haveWorkspaces && haveProjects"
            :workspace="workspace"
            :workspaces="workspaces"
            :user="user"
            @logout="logout"
            @clear="clear"
            @changeWorkspace="changeWorkspace"
    ></navbar>
    <transition name="slide-x-transition" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
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
      },

      changeWorkspace(item) {
        this.$store.commit('changeWorkspace', item._id);
        this.$router.push('/dashboard');
      }
    },

    computed: {
      ...mapGetters([
        'isLoggedIn',
        'user',
        'haveWorkspaces',
        'haveProjects',
        'workspace',
        'workspaces'
      ])
    }
  }
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~font-awesome/css/font-awesome.css";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans', Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #f7f2f0;
  }

  #app {
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
  }

  .slide-x-transition-enter-active,
  .slide-x-transition-leave-active {
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

  .mdl-shadow--2dp {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)
  }

  .mdl-shadow--3dp {
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .2), 0 1px 8px 0 rgba(0, 0, 0, .12)
  }

  .mdl-shadow--4dp {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2)
  }

  .mdl-shadow--6dp {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .2)
  }

  .mdl-shadow--8dp {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2)
  }

  .mdl-shadow--16dp {
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2)
  }

  .mdl-shadow--24dp {
    box-shadow: 0 9px 46px 8px rgba(0, 0, 0, .14), 0 11px 15px -7px rgba(0, 0, 0, .12), 0 24px 38px 3px rgba(0, 0, 0, .2)
  }

  .btn-transparent {
    color: white;
    border: none;
    background: transparent;
  }

  .card {
    border-radius: 6px
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
