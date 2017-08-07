<template>
  <div class="create-project" id="create-project-page">
    <div class="create-project__container">
      <div class="cover create-project__inner">
        <h1 class="cover-heading">Create your first Project.</h1>
      </div>

      <form class="create-project__form" v-on:submit.prevent="onSubmit">
        <label for="projectName" class="sr-only">Create a Project</label>
        <input type="text"
               v-focus="focused"
               v-model="title"
               id="projectName" class="form-control form-control-lg create-project__input-title"
               placeholder="Project Name" required autofocus>

        <label for="projectText" class="sr-only">Describe Project</label>
        <textarea
               v-model="text"
               id="projectText" class="form-control form-control-lg create-project__input-text"
               placeholder="What is about? What goal do you want to achieve?"></textarea>

        <button class="btn btn-lg btn-success btn-block create-project__submit-button" type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
  import uuidv4 from 'uuid/v4';
  import {mixin as focusMixin}  from 'vue-focus';

  export default {
    name: 'create-project',
    mixins: [focusMixin],

    data() {
      return {
        title: '',
        text: '',
        focused: true,
      }
    },

    methods: {
      onSubmit() {
        const id = uuidv4();

        this.$store.commit('createProject', {_id: id, title: this.title, text: this.text});
        this.$router.push({name: 'dashboard'});
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

    &__container {
      max-width: 42rem;
      width: 100%;
      margin: 0 auto;
    }

    &__inner {
      text-align: center;
    }

    &__form {
      width: 100%;
      margin: 0 auto;
    }

    &__input-title,
    &__submit-button {
      margin: 0 auto;
      max-width: 330px;
    }

    &__input-title,
    &__input-text {
      margin-bottom: 10px;
    }
  }
</style>
