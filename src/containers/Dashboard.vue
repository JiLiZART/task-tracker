<template>
  <div class="container">
    <div class="dashboard">
      <widget-tasks
        class="dashboard__widget"
        :tasks="myTasks"
      ></widget-tasks>

      <widget-updates
        class="dashboard__widget"
        :items="log"></widget-updates>

      <widget-projects
        class="dashboard__widget"
        :items="projects"
      ></widget-projects>

      <widget-team
        class="dashboard__widget"
        :members="teammates"
      ></widget-team>
    </div>
  </div>
</template>

<script>
  import WidgetTasks from '@/components/WidgetTasks'
  import WidgetProjects from '@/components/WidgetProjects'
  import WidgetTeam from '@/components/WidgetTeam'
  import WidgetUpdates from '@/components/WidgetUpdates'

  export default {
    name: 'dashboard',
    components: {WidgetTasks, WidgetProjects, WidgetTeam, WidgetUpdates},

    computed: {
      myTasks() {
        const tasks = this.$store.state.tasks;
        const user = this.$store.state.user;
        const myTasks = [];

        Object.keys(tasks).forEach((id) => {
          const task = tasks[id];

          if (task.performer && task.performer._id === user._id) {
            myTasks.push(task);
          }
        })

        return myTasks;
      },

      projects() {
        return this.$store.getters.projects;
      },

      teammates() {
        return this.$store.getters.teammates;
      },

      log() {
        return this.$store.state.log;
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
