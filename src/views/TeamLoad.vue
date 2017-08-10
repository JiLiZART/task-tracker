<template>
  <div class="container">
    <team-load
      :workspace="workspace"
      :teammates="teammates"
      :tasks="tasks"
      :projects="projects"
    ></team-load>
  </div>
</template>

<script>
  import TeamLoad from '@/containers/TeamLoad';

  export default {
    name: 'team-load-view',

    components: {TeamLoad},

    computed: {
      projects() {
        return this.$store.getters.projects;
      },

      teammates() {
        return this.$store.getters.teammates;
      },

      tasks() {
        return this.$store.state.tasks;
      },

      isHaveProjects() {
        return Boolean(Object.keys(this.$store.state.projects).length > 0);
      },

      workspace() {
        return this.$store.getters.workspace;
      }
    }
  }
</script>
