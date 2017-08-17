<template>
  <div class="create-project" id="create-project-page">
    <div class="create-project__container">
      <div class="cover create-project__inner">
        <h1 class="cover-heading">Create your first Project.</h1>
      </div>

      <form class="create-project__form" @submit.prevent="onSubmit">
        <label for="projectName" class="sr-only">Create a Project</label>
        <input v-focus="focused"
               @focus="focused = true" @blur="focused = false"
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
  import {mixin as focusMixin}  from 'vue-focus';

  export default {
    name: 'create-project-view',
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
        this.$store.commit('createProject', {title: this.title, text: this.text});
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
      padding: 0 1rem;
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
