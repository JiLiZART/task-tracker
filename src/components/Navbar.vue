<template>
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
            data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <b-dropdown class="navbar__workspace" variant="transparent">
      <div class="navbar__workspace-title" slot="button-content">{{ workspace.title }}</div>
      <router-link class="dropdown-item" to="/dashboard">
        <i class="fa fa-tachometer" aria-hidden="true"></i>
        My Dashboard
      </router-link>
      <b-dropdown-divider></b-dropdown-divider>
      <router-link class="dropdown-item" to="/create-project">
          <i class="fa fa-plus"></i>
          Create new Project
        </router-link>
    </b-dropdown>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <form class="navbar__form form-inline">
        <input class="form-control mr-sm-2 navbar__input" type="text" placeholder="Search">
      </form>
    </div>

    <b-dropdown class="navbar__user" variant="transparent" :right="true">
      <div class="navbar__user-toggle" slot="button-content">
        <span class="avatar">
             <img :src="user.avatar" :alt="user.username" class="avatar__image rounded-circle">
         </span>
        <span class="navbar__username">{{ user.username }}</span>
      </div>

      <router-link class="dropdown-item" to="profile">Profile</router-link>
      <span class="dropdown-item" v-on:click="logout">Sign out</span>
      <b-dropdown-divider></b-dropdown-divider>
      <span class="dropdown-item" v-on:click="clear">Clear sandbox</span>
    </b-dropdown>
  </nav>
</template>

<script>
  export default {
    name: 'navbar',

    props: ['workspace', 'user'],

    methods: {
      logout() {
        this.$emit('logout')
      },
      clear() {
        this.$emit('clear')
      }
    }
  }
</script>

<style lang="scss">
  .navbar {
    margin-bottom: 30px;

    &__form {
      width: 100%;
    }

    &__input.navbar__input {
      width: 100%;
    }

    &__workspace {
      padding: 0 .5rem;
    }

    &__user {
      height: 40px;
      color: white;
    }

    .dropdown-toggle,
    &__user-toggle {
      display: inline-flex;
      align-items: center;
      padding: 0;
    }

    &__username {
      display: inline-block;
      white-space: nowrap;
      padding: 0 5px;
    }
  }
</style>
