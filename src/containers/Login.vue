<template>
  <div class="login" id="login-page">
    <div class="login__container">
      <div class="login__inner cover">
        <h1 class="cover-heading">Your team's message board and task tracker.</h1>
        <p class="lead">Runby is a messaging platform that makes teams more connected and aware of what's going on,
          increases productivity, helps organize information and provides an environment for everyday work.</p>
      </div>

      <template v-if="isLoggedIn == false">
        <form class="login__form" v-on:submit.prevent="onSubmit">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail"
                 v-model="email"
                 class="login__input-email form-control form-control-lg"
                 placeholder="Email address" required autofocus>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        email: null
      }
    },

    created() {
      if (this.isLoggedIn) {
        if (!this.workspace) {
          this.$router.replace('/create-workspace');
        } else if (!this.isHaveProjects) {
          this.$router.replace('/create-project');
        }

        if (this.workspace && this.isHaveProjects) {
          this.$router.replace('/dashboard');
        }
      }
    },

    methods: {
      onSubmit() {
        this.$store.commit('start', this.email);
        this.$router.push('/create-workspace');
      },

      logout() {
        this.$store.commit('logout');
      }
    },

    computed: {
      isLoggedIn() {
        return Boolean(this.user.username);
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
    }

    &__inner {
      text-align: center;
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
