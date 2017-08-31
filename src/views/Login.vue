<template>
  <div class="login" id="login-page">
    <div class="login__container">
      <logo class="login__logo"></logo>
      <div class="login__inner cover">
        <h2 class="cover-heading">Your team's task tracker and project management tool.</h2>
        <p class="lead">Runby makes it easy to organize your tasks, projects and conversations in a shared space.</p>
      </div>

      <template v-if="isLoggedIn == false">
        <form class="login__form" @submit.prevent="onSubmit">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email"
                 id="inputEmail"
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
  import {mapGetters} from 'vuex';
  import Logo from '@/components/Logo';

  const WORKSPACE_NAME = 'Test Workspace';

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
        this.$store.dispatch('createWorkspace', {title: WORKSPACE_NAME}).then(() => {
          this.$store
            .dispatch('createTeamMate', {username: this.email})
            .then((mate) => {
              this.$store.commit('login', mate);
              this.$router.push(this.nextRoute);
            });
        })
      },

      logout() {
        this.$store.commit('logout');
      }
    },

    computed: {
      nextRoute() {
        return {name: 'dashboard'}; //'/dashboard';
        //return this.workspace ? (this.haveProjects ? '/dashboard' : '/create-project') : '/create-workspace';
      },

      ...mapGetters([
        'isLoggedIn',
        'user',
        'haveProjects',
        'workspace'
      ]),
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
      padding: 1rem;
    }

    &__inner {
      text-align: center;
    }

    &__logo.login__logo {
      margin: 1rem auto;
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
