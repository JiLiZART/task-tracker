<template>
  <v-app-bar class="appbar" :color="barColor" app>
    <v-app-bar-nav-icon class="hidden-sm-and-down"></v-app-bar-nav-icon>

    <v-toolbar-title
      class="title mr-6 hidden-sm-and-down navbar__workspace-title"
    >
      <v-btn text class="navbar__workspace-link" to="/dashboard">
        {{ workspace.title }}
      </v-btn>
    </v-toolbar-title>

    <div class="navbar__workspaces" v-if="false">
      <b-dropdown class="navbar__workspaces-dropdown" variant="transparent">
        <icon name="desktop" slot="button-content"></icon>
        <template v-for="item in workspaces">
          <b-dropdown-item
            :disabled="isWorkspaceActive(item)"
            :key="item._id"
            @click="changeWorkspace(item)"
            >{{ item.title }}
          </b-dropdown-item>
        </template>
        <b-dropdown-divider></b-dropdown-divider>
        <router-link class="dropdown-item" to="/create-workspace"
          >Create Workspace</router-link
        >
      </b-dropdown>
    </div>

    <v-text-field
      class="mr-sm-2 navbar__input"
      :value="searchValue"
      @input="onSearch"
      @focus="searchFocused = true"
      @blur="searchFocused = false"
      placeholder="Search"
      clearable
      hide-details
      hide-selected
      solo
    />

    <NavUserDropdown :user="user" @logout="logout" @clear="clear" />
  </v-app-bar>
</template>

<script>
import NavUserDropdown from "@/containers/NavUserDropdown";

export default {
  name: "Navbar",
  props: ["workspace", "workspaces", "user"],
  components: { NavUserDropdown },

  data() {
    return {
      searchFocused: false
    };
  },

  methods: {
    onSearch(query) {
      const route =
        query.length > 0
          ? { name: "search", params: { query } }
          : { name: "dashboard" };

      this.$router.replace(route);
    },

    logout() {
      this.$emit("logout");
    },

    clear() {
      this.$emit("clear");
    },

    changeWorkspace(item) {
      this.$emit("changeWorkspace", item);
    },

    isWorkspaceActive(item) {
      return item._id === this.workspace._id;
    }
  },

  computed: {
    searchValue() {
      if (this.$route.name === "search") {
        return this.$route.params.query;
      }

      return "";
    },

    barColor() {
      if (!this.searchFocused) {
        return "orange accent-1";
      }

      return "white";
    }
  }
};
</script>

<style lang="scss">
.appbar {
  transition: background-color 3s ease;
}

.navbar {
  margin-bottom: 30px;

  &__form {
    flex: 1 1 0;
  }

  &__input.form-control.navbar__input {
    width: 100%;
  }

  &__workspace {
    padding: 0 0.5rem;
  }

  &__workspace-title {
    display: inline-flex;
    flex: 0 0 auto;
  }

  &__workspaces-dropdown {
    height: 40px;
    padding: 0 0.5rem;
  }

  &__user {
    height: 40px;
    color: white;
    margin-left: 10px;
  }

  &__user-toggle .author__name {
    display: none;

    @media (min-width: 992px) {
      display: inline-block;
    }
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
