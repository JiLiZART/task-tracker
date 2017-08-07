<template>
  <div class="card card-outline-secondary widget-tasks">
    <div class="card-header">
      <h5 class="card-title widget-tasks__title">My Tasks</h5>
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
      <div class="card">
        <div class="card-block">
          <p class="card-text">There are no tasks assigned to you. Ask someone for a task.</p>
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
    &__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    &__task {
      margin-bottom: .5rem;
    }
  }
</style>
