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
  import Project from '@/containers/Project';

  export default {
    name: 'project-view',
    components: {Project},

    computed: {
      project() {
        return this.$store.getters.projects.find((prj) => prj._id === this.$route.params.id)
      },

      docs() {
        return this.project.docs.map((id) => {
          return this.$store.state.docs[id];
        });
      },

      tasks() {
        return this.project.tasks.map((id) => {
          return this.$store.state.tasks[id];
        });
      }
    }
  }
</script>
