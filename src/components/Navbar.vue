<template>

  <b-navbar toggleable type="inverse" variant="primary">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-collapse is-nav id="nav_collapse">

      <div class="navbar__workspace-title">
        <router-link class="navbar-brand navbar__workspace-link" to="/dashboard">
          {{ workspace.title }}
        </router-link>
      </div>

      <div class="navbar__workspaces">
        <b-dropdown class="navbar__workspaces-dropdown" variant="transparent">
          <i class="fa fa-desktop" slot="button-content"></i>
          <template v-for="(item, index) in workspaces">
            <b-dropdown-item
            :disabled="isWorkspaceActive(item)" :key="item._id"
            @click="changeWorkspace(item)">{{ item.title }}</b-dropdown-item>
          </template>
          <b-dropdown-divider></b-dropdown-divider>
          <router-link class="dropdown-item" to="/create-workspace">Create Workspace</router-link>
        </b-dropdown>
      </div>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <form class="form-inline navbar__form">
          <input class="form-control mr-sm-2 navbar__input"
                 :value="searchValue"
                 @input="onSearch"
                 placeholder="Search">
        </form>
      </div>

      <b-dropdown class="navbar__user" variant="transparent" :right="true">
        <author class="navbar__user-toggle" slot="button-content" :item="user" :haveLink="false"></author>

        <router-link class="dropdown-item" to="/settings">Settings</router-link>
        <span class="dropdown-item" @click="logout">Sign out</span>
        <b-dropdown-divider></b-dropdown-divider>
        <span class="dropdown-item" @click="clear">Clear sandbox</span>
      </b-dropdown>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import Author from '@/components/Author';

  export default {
    name: 'navbar',

    props: ['workspace', 'workspaces', 'user'],

    components: {Author},

    methods: {
      onSearch(e) {
        const query = e.target.value;
        const route = query.length > 0 ? {name: 'search', params: {query}} : {name: 'dashboard'};

        this.$router.replace(route);
      },

      logout() {
        this.$emit('logout')
      },

      clear() {
        this.$emit('clear')
      },

      changeWorkspace(item) {
        this.$emit('changeWorkspace', item)
      },

      isWorkspaceActive(item) {
        return item._id === this.workspace._id;
      }
    },

    computed: {
      searchValue() {
        if (this.$route.name === 'search') {
          return this.$route.params.query;
        }

        return '';
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

    &__workspaces-dropdown {
      height: 40px;
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

    .dropdown-toggle:focus {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.25);
    }
  }
</style>
