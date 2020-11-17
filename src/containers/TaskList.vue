<template>
  <div class="task-list">
    <template v-for="(item, index) in items">
      <task
        class="task-list__item"
        :key="item._id"
        :index="index"
        :id="item._id"
        :task.sync="item"
        :expandable="expandable"
        :editable="editable"
        :canMoveToProject="canMoveToProject"
        :showProjectTitle="showProjectTitle"
      ></task>
    </template>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "TaskList",
  props: {
    items: { type: Array },
    expandable: { type: Boolean, default: true },
    editable: { type: Boolean, default: true },
    canMoveToProject: { type: Boolean, default: true },
    showProjectTitle: { type: Boolean, default: false }
  },
  components: { Task }
};
</script>

<style lang="scss">
.task-list {
  &__item {
    margin-bottom: 0.25rem;

    &.task_expanded {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
  }
}
</style>
