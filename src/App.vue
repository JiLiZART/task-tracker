<template>
  <v-app id="app">
    <Navbar
      v-if="isLoggedIn && haveWorkspaces"
      :workspace="workspace"
      :workspaces="workspaces"
      :user="user"
      @logout="logout"
      @clear="clear"
      @changeWorkspace="changeWorkspace"
    />
    <v-main>
      <transition name="slide-x-transition" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { clearStorage } from "@/store/index";
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },

  created() {
    /**
     *
     */
    const $auth = Vue.$ioc;

    console.log("$auth", $auth);

    if (!this.isLoggedIn) {
      this.$router.replace("/");
    }
  },

  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    },

    clear() {
      clearStorage();
      location.reload(); //@TODO find workaround
    },

    changeWorkspace(item) {
      this.$store.commit("changeWorkspace", item._id);
      this.$router.push("/dashboard");
    }
  },

  computed: {
    ...mapGetters([
      "isLoggedIn",
      "user",
      "haveWorkspaces",
      "haveProjects",
      "workspace",
      "workspaces"
    ])
  }
};
</script>

<style lang="scss">
/*! @import */
/*@tailwind base;*/
/*@tailwind components;*/
/*@tailwind utilities;*/

/*@import "~bootstrap/scss/bootstrap.scss";*/
/*@import "~bootstrap-vue/dist/bootstrap-vue.css";*/

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Noto Sans", Roboto,
    "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f7f2f0;
}

#app {
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*min-width: 100%;*/
  /*min-height: 100%;*/
  color: #2c3e50;
  background: #f7f2f0;
}

.slide-x-transition-enter-active,
.slide-x-transition-leave-active {
  transition: 150ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-x-transition-enter,
.slide-x-transition-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.slide-x-reverse-transition-enter-active,
.slide-x-reverse-transition-leave-active {
  transition: 150ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-x-reverse-transition-enter,
.slide-x-reverse-transition-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.btn-transparent {
  color: white;
  border: none;
  background: transparent;
}

.card {
  border-radius: 6px;
  background-color: transparent;
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
    opacity: 1;
  }
}
</style>
