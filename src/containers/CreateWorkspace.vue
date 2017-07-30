<template>
  <div class="create-workspace">
    <div class="create-workspace__container">
      <div class="create-workspace__inner cover">
        <h1 class="cover-heading">Create your first Workspace.</h1>
        <p class="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
          vitae dicta sunt explicabo.</p>
      </div>

      <form class="create-workspace__form" v-on:submit.prevent="onSubmit">
        <label for="workspaceName" class="sr-only">Create Workspace</label>
        <input type="text"
               v-model="title"
               id="workspaceName" class="create-workspace__input form-control form-control-lg"
               placeholder="Workspace Name" required autofocus>
        <button class="btn btn-lg btn-success btn-block" type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create-workspace',

    data() {
      return {title: ''}
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
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
    color: white;
    background: #333;

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
