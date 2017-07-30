<template>
  <div class="card team-load">
    <div class="card-block">
      <h4 class="card-title">Team load in {{ workspace.title }} </h4>
    </div>

    <template v-for="(item, index) in projects">
      <div class="card-block">
        <project
          :project="item"
          :tasks="projectTasks(item.tasks)"
          :teammates="teammates"
          :canCreate="false"
          :canEdit="false"
          :index="index"
          :key="item._id">
        </project>
      </div>
    </template>
  </div>
</template>

<script>
  import Project from '@/components/Project';

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
      }
    }
  }
</script>
