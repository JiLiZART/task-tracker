<template>
  <div class="container">
    <div class="project-view" v-if="project">
      <project
        :project="project"
        :docs="docs"
        :tasks="tasks"
      ></project>
    </div>
    <div class="card card-outline-secondary" v-else>
      <div class="card-block">
        <h4 class="card-title">Project not found</h4>
        <p class="card-text">Try to add one.</p>
        <router-link class="btn btn-primary" to="/">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Project from '@/components/Project';

  export default {
    name: 'project-view',
    components: {Project},

    computed: {
      project() {
        return this.$store.state.projects[this.$route.params.id]
      },

      docs() {
        return this.$store.getters.docs;
      },

      tasks() {
        return this.$store.getters.tasks;
      }
    }
  }
</script>
