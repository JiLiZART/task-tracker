<template>
  <div class="card team-load">
    <div class="card-body">
      <h4 class="card-title">Team Work Load in {{ workspace.title }} </h4>
    </div>

    <template v-for="(item, index) in projects">
      <div class="card-body" v-if="projectHaveTasks(item)">
        <project
          :project="item"
          :tasks="projectTasks(item.tasks)"
          :teammates="teammates"
          :canCreate="false"
          :canEdit="false"
          :filterCompleted="true"
          :index="index"
          :key="item._id">
        </project>
      </div>
    </template>
  </div>
</template>

<script>
  import Project from '@/containers/Project';

  export default {
    name: 'team-load',
    props: {
      workspace: {
        type: Object
      },
      tasks: {type: Object},
      teammates: {
        type: Array
      },
      projects: {
        type: Array
      }
    },

    components: {Project},

    methods: {
      projectTasks(tasks) {
        return tasks.map((id) => this.tasks[id]);
      },

      projectHaveTasks(project) {
        return project.tasks.length;
      }
    }
  }
</script>
