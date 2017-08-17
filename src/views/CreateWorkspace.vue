<template>
  <div class="create-workspace">
    <div class="create-workspace__container">
      <div class="create-workspace__inner cover">
        <h1 class="cover-heading">Create a workspace.</h1>
        <p class="lead">A workspace is where you can work with tasks and documents personally or with a team.</p>
      </div>

      <form class="create-workspace__form" @submit.prevent="onSubmit">
        <label for="workspaceName" class="sr-only">Create Workspace</label>
        <input v-model="title"
               v-focus="focused"
               id="workspaceName" class="create-workspace__input form-control form-control-lg"
               placeholder="Workspace Name" required autofocus>
        <button class="btn btn-lg btn-success btn-block" type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
  import {mixin as focusMixin} from 'vue-focus';

  export default {
    name: 'create-workspace-view',
    mixins: [focusMixin],

    data() {
      return {title: '', focused: true}
    },

    methods: {
      onSubmit: function () {
        this.$store.commit('createWorkspace', {title: this.title});
        this.$router.push('invite-teammates');
      }
    }
  }
</script>

<style lang="scss">
  .create-workspace {
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
