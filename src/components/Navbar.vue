<template>

  <b-navbar toggleable type="inverse" variant="primary">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-collapse is-nav id="nav_collapse">

      <div class="navbar__workspace-title">
        <router-link class="navbar-brand navbar__workspace-link" to="/dashboard">
          {{ workspace.title }}
        </router-link>
      </div>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <form class="navbar__form form-inline">
          <input class="form-control mr-sm-2 navbar__input"
          type="text"
          :value="searchValue"
          @input="onSearch"
          placeholder="Search">
        </form>
      </div>

      <b-dropdown class="navbar__user" variant="transparent" :right="true">
        <author class="navbar__user-toggle" slot="button-content" :item="user" :haveLink="false"></author>

        <router-link class="dropdown-item" to="/settings">Settings</router-link>
        <span class="dropdown-item" v-on:click="logout">Sign out</span>
        <b-dropdown-divider></b-dropdown-divider>
        <span class="dropdown-item" v-on:click="clear">Clear sandbox</span>
      </b-dropdown>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import Author from '@/components/Author';

  export default {
    name: 'navbar',

    props: ['workspace', 'user'],

    components: {Author},

    methods: {
      onSearch(e) {
        const query = e.target.value;

        if (query.length > 0) {
          this.$router.replace({name: 'search', params: {query}})
        } else {
          this.$router.replace({name: 'dashboard'});
        }
      },

      logout() {
        this.$emit('logout')
      },
      clear() {
        this.$emit('clear')
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
  }
</style>
