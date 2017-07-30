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
        this.$store.commit('clear');
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

  .avatar {
    display: inline-flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &_placeholded {
      border: 1px dashed #ccc;
      border-radius: 50%;
    }

    &__image {
      width: 40px;
      height: 40px;
    }

    &_size_small {
      width: 22px;
      height: 22px;
    }

    &_size_small &__image {
      width: 22px;
      height: 22px;
    }
  }

</style>
