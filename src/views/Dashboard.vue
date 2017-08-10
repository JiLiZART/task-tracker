<template>
  <div class="container">
    <div class="dashboard">
      <widget-tasks
        class="dashboard__widget"
        :tasks="myTasks"
        :teammates="teammates"
      ></widget-tasks>

      <widget-projects
        class="dashboard__widget"
        :items="projects"
      ></widget-projects>

      <widget-updates
        class="dashboard__widget"
        :items="log"></widget-updates>

      <widget-team
        class="dashboard__widget"
        :members="teammates"
      ></widget-team>
    </div>
  </div>
</template>

<script>
  import WidgetTasks from '@/containers/WidgetTasks'
  import WidgetProjects from '@/containers/WidgetProjects'
  import WidgetTeam from '@/containers/WidgetTeam'
  import WidgetUpdates from '@/containers/WidgetUpdates'

  export default {
    name: 'dashboard',
    components: {WidgetTasks, WidgetProjects, WidgetTeam, WidgetUpdates},

    computed: {
      myTasks() {
        const findPerformer = (users, id) => users.find((u) => u._id === id);

        return this.tasks
          .filter((task) => findPerformer(task.performers, this.user._id));
      },

      user() {
        return this.$store.state.user;
      },

      projects() {
        return this.$store.getters.projects;
      },

      tasks() {
        return this.$store.getters.tasks;
      },

      teammates() {
        return this.$store.getters.teammates;
      },

      log() {
        return this.$store.getters.lastUpdates;
      }
    }
  }
</script>

<style lang="scss">

  .dashboard {
    &__widget {
      margin-bottom: 1rem;
    }
  }

</style>
