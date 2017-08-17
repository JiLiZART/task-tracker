<template>
  <div class="invite-teammates">
    <div class="invite-teammates__container">
      <div class="invite-teammates__inner cover">
        <h1 class="cover-heading">Invite Your Teammates.</h1>
      </div>

      <form class="invite-teammates__form" @submit.prevent="onSubmit">
        <label for="mate1" class="sr-only">Mate 1</label>
        <input type="email" id="mate1" class="invite-teammates__input form-control form-control-lg"
               v-model="mate1"
               v-focus="focused"
               @focus="focused = true" @blur="focused = false"
               placeholder="Mate 1 Email" required autofocus>

        <label for="mate2" class="sr-only">Mate 2</label>
        <input type="email" id="mate2" class="invite-teammates__input form-control form-control-lg"
               v-model="mate2"
               placeholder="Mate 2 Email">

        <label for="mate3" class="sr-only">Mate 3</label>
        <input type="email" id="mate3" class="invite-teammates__input form-control form-control-lg"
               v-model="mate3"
               placeholder="Mate 3 Email">

        <button class="btn btn-lg btn-success btn-block" type="submit">Invite</button>
        <router-link class="btn btn-lg btn-link btn-block" to="create-project">Skip this step</router-link>
      </form>
    </div>
  </div>
</template>

<script>
  import {mixin as focusMixin}  from 'vue-focus';

  export default {
    name: 'invite-teammates-view',
    mixins: [focusMixin],

    data() {
      return {
        mate1: null,
        mate2: null,
        mate3: null,
        focused: true
      }
    },

    methods: {
      onSubmit() {

        for (let email of [this.mate1, this.mate2, this.mate3]) {
          if (email) {
            this.$store.commit('inviteTeamMate', email);
          }
        }

        this.$router.push('create-project');
      }
    }
  }
</script>

<style lang="scss">
  .invite-teammates {
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

    &__input {
      margin-bottom: 10px;
    }
  }
</style>
