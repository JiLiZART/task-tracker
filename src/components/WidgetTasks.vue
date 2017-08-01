<template>
  <div class="card widget-tasks">
    <div class="card-header">
      My Tasks
    </div>
    <div class="card-block" v-if="tasks && tasks.length">
      <template v-for="(item, index) in tasks">
        <div class="widget-tasks__task">
          <task
            :key="item._id"
            :index="index"
            :id="item._id"
            :task.sync="item"
            :project="project"
            :teammates="teammates"
          ></task>
        </div>
      </template>
    </div>
    <div class="card-block" v-else>
      <div class="card card-outline-secondary">
        <div class="card-block">
          <h4 class="card-title">There are no tasks assigned to you</h4>
          <p class="card-text">Ask someone for a task .</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from '@/components/Task';

  export default {
    name: 'widget-tasks',
    props: {
      tasks: {
        type: Array
      },
      project: {
        type: Object
      },
      teammates: {
        type: Array
      }
    },

    components: {Task}
  }
</script>

<style lang="scss">
  .widget-tasks {
    &__task {
      margin-bottom: .5rem;
    }
  }
</style>
