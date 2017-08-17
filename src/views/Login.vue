<template>
  <div class="login" id="login-page">
    <div class="login__container">
      <logo class="login__logo"></logo>
      <div class="login__inner cover">
        <h1 class="cover-heading">Your team's task tracker and project management tool.</h1>
        <p class="lead">Runby makes it easy to organize your tasks, projects and conversations in a shared space.</p>
      </div>

      <template v-if="isLoggedIn == false">
        <form class="login__form" v-on:submit.prevent="onSubmit">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail"
                 v-model="email"
                 class="form-control form-control-lg login__input-email"
                 placeholder="Email address" required autofocus>
          <button class="btn btn-lg btn-primary btn-block">Sign Up</button>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo';

  export default {
    name: 'login-view',

    components: {Logo},

    data() {
      return {
        email: null
      }
    },

    created() {
      if (this.isLoggedIn) {
        this.$router.replace(this.nextRoute);
      }
    },

    methods: {
      onSubmit() {
        this.$store.commit('start', this.email);
        this.$router.push(this.nextRoute);
      },

      logout() {
        this.$store.commit('logout');
      }
    },

    computed: {
      nextRoute() {
        return this.workspace ? (this.haveProjects ? '/dashboard' : '/create-project') : '/create-workspace';
      },

      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },

      user() {
        return this.$store.getters.user;
      },

      haveProjects() {
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

    &__logo.login__logo {
      margin: 30px auto;
      max-width: 120px;
      max-height: 120px;
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
