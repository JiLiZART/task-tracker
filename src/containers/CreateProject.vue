<template>
  <div class="create-project" id="create-project-page">
    <div class="create-project__container">
      <div class="create-project__inner cover">
        <h1 class="cover-heading">Create your first Project.</h1>
        <p class="lead">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
          vitae dicta sunt explicabo.</p>
      </div>

      <form class="create-project__form" v-on:submit.prevent="onSubmit">
        <label for="projectName" class="sr-only">Create a Project</label>
        <input type="text"
               v-model="title"
               id="projectName" class="create-project__input form-control form-control-lg"
               placeholder="Project Name" required autofocus>
        <button class="btn btn-lg btn-success btn-block" type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
  import uuidv4 from 'uuid/v4';

  export default {
    name: 'create-project',
    data() {
      return {
        title: ''
      }
    },

    methods: {
      onSubmit() {
        const id = uuidv4();

        this.$store.commit('createProject', {_id: id, title: this.title});
        this.$router.push({name: 'project', params: {id}});
      }
    }
  }
</script>

<style lang="scss">
  .create-project {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 100%;
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);

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
