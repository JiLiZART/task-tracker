<template>
  <div class="login" id="login-page">
    <div class="login__container">
      <logo class="login__logo" :big="true"></logo>
      <div class="login__inner">
        <h2 class="text-h4">
          Your team's task tracker and project management tool.
        </h2>
        <p class="text-h6 font-weight-regular">
          Runby makes it easy to organize your tasks, projects and conversations
          in a shared space.
        </p>
      </div>

      <template v-if="isLoggedIn === false">
        <v-form class="login__form" @submit.prevent="onSubmit">
          <v-text-field
            class="mb-4 login__input-email"
            type="email"
            id="inputEmail"
            v-model="email"
            placeholder="Your email"
            hide-details="auto"
            required
            autofocus
            filled
            x-large
            full-width
            light
          />
          <v-btn type="submit" color="primary" x-large raised block
            >Sign Up</v-btn
          >
        </v-form>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "@/components/Logo";

const WORKSPACE_NAME = "My Workspace";

export default {
  name: "login-view",

  components: { Logo },

  data() {
    return {
      email: null
    };
  },

  created() {
    if (this.isLoggedIn) {
      this.$router.replace(this.nextRoute);
    }
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch("createWorkspace", { title: WORKSPACE_NAME })
        .then(() => {
          this.$store
            .dispatch("createTeamMate", { username: this.email })
            .then(mate => {
              this.$store.commit("login", mate);
              this.$router.push(this.nextRoute);
            });
        });
    },

    logout() {
      this.$store.commit("logout");
    }
  },

  computed: {
    nextRoute() {
      return { name: "dashboard" }; //'/dashboard';
      //return this.workspace ? (this.haveProjects ? '/dashboard' : '/create-project') : '/create-workspace';
    },

    ...mapGetters(["isLoggedIn", "user", "haveProjects", "workspace"])
  }
};
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100%;

  &__container {
    max-width: 42rem;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
  }

  &__inner {
    text-align: center;
  }

  &__logo {
    margin: 1rem auto;
  }

  &__form {
    max-width: 330px;
    width: 100%;
    margin: 0 auto;
  }

  &__input-email {
    margin-bottom: 10px;
  }
}
</style>
