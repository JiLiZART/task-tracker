<template>
  <div class="task-list">
    <template v-for="(item, index) in items">
      <task
          class="task-list__item"
          :key="item._id"
          :index="index"
          :id="item._id"
          :task.sync="item"
          :teammates="teammates"
      ></task>
    </template>
  </div>
</template>

<script>
  import Task from './Task';

  export default {
    name: 'task-list',
    props: ['items', 'teammates'],
    components: {Task}
  }
</script>

<style lang="scss">
  .task-list {
    &__item {
      margin-bottom: .25rem;

      &.task_expanded {
        margin-bottom: 1rem;
        margin-top: 1rem;
      }
    }
  }
</style>
