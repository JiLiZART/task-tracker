<template>
  <div class="container">
    <div class="dashboard">
      <widget-tasks class="dashboard__widget"
                    :tasks="myTasks"
                    :projects="projects"
                    :teammates="teammates"
      ></widget-tasks>

      <widget-projects class="dashboard__widget"
                       :items="projects"
      ></widget-projects>

      <widget-updates class="dashboard__widget"
                      :items="lastUpdates"></widget-updates>

      <widget-team class="dashboard__widget"
                   :members="teammates"
      ></widget-team>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import WidgetTasks from '@/containers/WidgetTasks'
  import WidgetProjects from '@/containers/WidgetProjects'
  import WidgetTeam from '@/containers/WidgetTeam'
  import WidgetUpdates from '@/containers/WidgetUpdates'

  export default {
    name: 'dashboard-view',
    components: {WidgetTasks, WidgetProjects, WidgetTeam, WidgetUpdates},

    computed: {
      myTasks() {
        const findPerformer = (users, id) => users.find((u) => u._id === id);

        return this.tasks.filter((task) => findPerformer(task.performers, this.user._id));
      },

      ...mapGetters([
        'user',
        'projects',
        'tasks',
        'teammates',
        'lastUpdates'
      ]),
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
