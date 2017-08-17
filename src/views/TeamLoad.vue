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
  import {mapGetters} from 'vuex';
  import TeamLoad from '@/containers/TeamLoad';

  export default {
    name: 'team-load-view',

    components: {TeamLoad},

    computed: {
      ...mapGetters([
        'projects',
        'teammates',
        'haveProjects',
        'workspace'
      ]),

      tasks() {
        return this.$store.state.tasks;
      }
    }
  }
</script>
